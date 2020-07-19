const dotenv = require('dotenv');
const mysql = require('mysql')

// Initialize environment variables
dotenv.config({ path: './config.env' });

const connPool = mysql.createPool({
	connectionLimit: process.env.MYSQL_CONN_LIMIT,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB,
	port: process.env.MYSQL_PORT
})

let db = {}

db.all = () => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM sensor', (err, results) => {
			if (err) {
				return reject(err)
			}

			return resolve(results)
		})
	})
}

db.one = (id) => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM sensor WHERE id = ?', [id], (err, results) => {
			if (err) {
				return reject(err)
			}

			return resolve(results[0])
		})
	})
}



db.addSensor = (uuid, is_occupied) => {
	return new Promise((resolve, reject) => {
		connPool.query('INSERT INTO sensor (`uuid`, `is_occupied`) VALUES (?, ?) ', [uuid, is_occupied], (err, results) => {
			result = {
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.status = results.affectedRows == 1 ? 'success' : 'error';
			return resolve(result)
		})
	})
}

db.updateSensor = (uuid, is_occupied) => {
	return new Promise((resolve, reject) => {
		connPool.query('UPDATE sensor SET `is_occupied` = ? WHERE `uuid` = ?', [is_occupied, uuid], (err, results) => {
			result = {
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.status = results.affectedRows == 1 ? 'success' : 'error';
			return resolve(result)
		})
	})
}

db.getSensor = (uuid) => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT `is_occupied` FROM sensor WHERE `uuid` = ?', [uuid], (err, results) => {
			result = {
				is_occupied: 0,
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.is_occupied = results[0].is_occupied
			result.status = 'success'

			return resolve(result)
		})
	})
}



db.addStatus = (sensor_id, timestamp, is_occupied) => {
	return new Promise((resolve, reject) => {
		connPool.query('INSERT INTO status (`sensor_id`, `timestamp`, `is_occupied`) VALUES (?, ?, ?) ', 
													[sensor_id, timestamp, is_occupied], (err, results) => {
			result = {
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.status = results.affectedRows == 1 ? 'success' : 'error';
			return resolve(result)
		})
	})
}


db.addLot = (name, latitude, longitude, gateway_id) => {
	return new Promise((resolve, reject) => {
		connPool.query('INSERT INTO `lot` (`name`, `latitude`, `longitude`, `gateway_id`) \
						SELECT ?, ?, ?, ? FROM dual \
						WHERE NOT EXISTS (SELECT `gateway_id` FROM `lot` WHERE gateway_id = ?)', 
							[name, latitude, longitude, gateway_id, gateway_id], (err, results) => {
			result = {
				status: 'error'
			}

			if (err) {
				//return reject(err)
				console.log(err)
				return resolve(result)
			}

			result.status = results.affectedRows == 1 ? 'success' : 'error';
			return resolve(result)
		})
	})
}

db.getLots = () => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM lot', (err, results) => {
			result = {
				data: [],
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.data = results
			result.status = results.length > 0 ? 'success' : 'error';

			return resolve(result)
		})
	})
}

db.getLot = (name) => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM lot WHERE `name` = ?', name, (err, results) => {
			result = {
				data: [],
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.data = results[0]
			result.status = results.length > 0 ? 'success' : 'error';

			return resolve(result)
		})
	})
}

db.getBayByGlobalName = (lot_name, bay_name) => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM lot l, bay b \
						WHERE b.lot_id = l.id AND l.name = ? AND b.name = ? ', 
						[lot_name, bay_name], (err, results) => {
			result = {
				data: [],
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.data = results[0]
			result.status = results.length > 0 ? 'success' : 'error';

			return resolve(result)
		})
	})
}



db.addBay = (name, x_coordinate, y_coordinate, lot_id, sensor_id) => {
	return new Promise((resolve, reject) => {
		connPool.query('INSERT INTO `bay` (`name`, `x_coordinate`, `y_coordinate`, `lot_id`, `sensor_id`) \
						SELECT ?, ?, ?, ?, ? FROM dual \
						WHERE NOT EXISTS (SELECT `sensor_id` FROM `bay` WHERE sensor_id = ?)', 
						[name, x_coordinate, y_coordinate, lot_id, sensor_id, sensor_id], (err, results) => {
			result = {
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.status = results.affectedRows == 1 ? 'success' : 'error';
			return resolve(result)
		})
	})
}

db.getBay = (name) => {
	return new Promise((resolve, reject) => {
		connPool.query('SELECT * FROM bay WHERE `name` = ?', name, (err, results) => {
			result = {
				data: [],
				status: 'error'
			}

			if (err) {
				//return reject(err)
				return resolve(result)
			}

			result.data = results
			result.status = results.length > 0 ? 'success' : 'error';

			return resolve(result)
		})
	})
}




module.exports = db