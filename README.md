# Smart Parking Application - Distronix

A smart parking application that shows the status of spots in a parking lot.

## Database Schema

### Link to the Schema Design

> [https://dbdesigner.page.link/tDqa6aHVUv2veaBw7](https://dbdesigner.page.link/tDqa6aHVUv2veaBw7)


### Schema Simplified

**lot** table
- `id` int unique AI PK
- `name` (P1, P2, ...) unique secondary string
- `latitude` double
- `longitude` double
- `gateway_id` int (foreign key, refers to gateway.id)

**bay** table
- `id` int unique AI PK
- `name` (B1, B2, ...) string
- `x_coordinate` double
- `y_coordinate` double
- `sensor_id` int (foreign key, refers to sensor.id)
- `lot_id` int (foreign key, refers to lots.id)

(`name + lot_id` is unique, secondary)

**sensor** table
- `id` int unique AI PK
- `uuid` unique secondary string 50
- `is_occupied` boolean (refers to the current status)

**gateway** table
- `id` int unique AI PK
- `uuid` unique secondary string 50

**status** table
- `id` int unique AI PK
- `sensor_id` int (foreign key, refers to sensor.id)
- `timestamp` timestamp
- `is_occupied` boolean (refers to status @ certain timestamp)

#### Entity Relationships
* bay : lot => n : 1
* lot : gateway => 1 : 1
* bay : sensor => 1 : 1
* sensor : status => 1 : n

#### Note

- `occupancy_status` can be present in **sensor** table as well as in **status** table.
- If we store `occupancy_status` in the **status** table, it refers to status at certain timestamp.
- If we store `occupancy_status` in the **sensor** table, it refers to the current status.
- If not present in **status** table, we don't get status history. But it's ok as
we're only dealing with the live occupancy staus.
- `sensor.is_occupied` refers to the current status of the sensor.
- `status.is_occupied` refers to status of the sensor at certain timestamp.
- In the table **bay**, `name + lot_id` is unique.

### Relation Between Tables

![Smart Parking Schema](/schema/schema.png)

## Installation

### 1. Configure Variables

Variables like listening port, mysql database credentials can be configured in `config.env`

### 2. Import MySQL Database

```mysql
mysql -u root -p smart_parking_distronix < ./schema/smart_parking_distronix_mysql_create.sql
```

### 3. Import Dependencies

Use the following command to install all dependencies required for this project.

```bash
npm install
```

## Starting the Server

Start the server using the following command

```bash
node index
```

## Application Routes

There are four different routes available in this application as follows
- ./routes/bayRoutes.js - For APIs related to `bay`
- ./routes/lotRoutes.js - For APIs related to `lot`
- ./routes/sensorRoutes.js - For APIs related to `sensor`
- ./routes/statusRoutes.js - For APIs related to `status`

## API Usage

### Required APIs

#### Fetch list of all parking lots

##### *Example Request:*

```
GET /lot
```

##### *Example Response:*

###### Success

```json
{
	"data":[
		{
			"id": 1,
			"name": "L1",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1
		},
		{
			"id": 2,
			"name": "L2",
			"latitude": 15.321321,
			"longitude": 12.456565,
			"gateway_id": 2
		}
	],
	"status": "success"
}
```

###### Failure

```json
{
	"data":[],
	"status": "error"
}
```

#### Fetch lot details along with list of all bays within that lot

##### *Example Request:*

```
GET /lot/:lot_name
```

##### *Example Response:*

###### Success

```json
{
	"data":[
		{
			"id": 2,
			"name": "B1",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 12,
			"y_coordinate": 10,
			"sensor_id": 1,
			"lot_id": 1
		},
		{
			"id": 4,
			"name": "B2",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 13,
			"y_coordinate": 11,
			"sensor_id": 2,
			"lot_id": 1
		},
		{
			"id": 5,
			"name": "B3",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 13,
			"y_coordinate": 11,
			"sensor_id": 3,
			"lot_id": 1
		},
		{
			"id": 6,
			"name": "B4",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 15,
			"y_coordinate": 13,
			"sensor_id": 4,
			"lot_id": 1
		},
		{
			"id": 7,
			"name": "B5",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 16,
			"y_coordinate": 14,
			"sensor_id": 5,
			"lot_id": 1
		},
		{
			"id": 9,
			"name": "B6",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 17,
			"y_coordinate": 15,
			"sensor_id": 6,
			"lot_id": 1
		},
		{
			"id": 10,
			"name": "B7",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 18,
			"y_coordinate": 16,
			"sensor_id": 7,
			"lot_id": 1
		},
		{
			"id": 11,
			"name": "B8",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1,
			"x_coordinate": 19,
			"y_coordinate": 17,
			"sensor_id": 8,
			"lot_id": 1
		}
	],
	"status": "success"
}
```

###### Failure

```json
{
	"data":[],
	"status": "error"
}
```

#### Fetch bay details by global name

##### *Example Request:*

```
GET /bay/:lot_name/:bay_name
```

##### *Example Response:*

###### Success

```json
{
	"data":{
		"id": 15,
		"name": "B1",
		"latitude": 15.321321,
		"longitude": 12.456565,
		"gateway_id": 2,
		"x_coordinate": 3,
		"y_coordinate": 4,
		"sensor_id": 9,
		"lot_id": 2
	},
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```

#### Insert a new data point corresponding to a sensor

##### *Example Request:*

```
POST /data
Parammeters: sensor_id, timestamp, is_occupied
```

##### *Example Response:*

###### Success

```json
{
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```

### Extra APIs

#### Add new bay 

##### *Example Request:*

```
POST /bay/add
Parammeters: name, x_coordinate, y_coordinate, lot_id, sensor_id
```

##### *Example Response:*

###### Success

```json
{
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```

#### Add new lot 

##### *Example Request:*

```
POST /lot/add
Parammeters: name, latitude, longitude, gateway_id
```

##### *Example Response:*

###### Success

```json
{
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```

#### Add new sensor 

##### *Example Request:*

```
POST /sensor/add
Parammeters: uuid, is_occupied
```

##### *Example Response:*

###### Success

```json
{
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```

#### Get bay by name

##### *Example Request:*

```
GET /bay/:name
```

##### *Example Response:*

###### Success

```json
{
	"data":[
		{
			"id": 2,
			"name": "B1",
			"x_coordinate": 12,
			"y_coordinate": 10,
			"sensor_id": 1,
			"lot_id": 1
		},
		{
			"id": 15,
			"name": "B1",
			"x_coordinate": 3,
			"y_coordinate": 4,
			"sensor_id": 9,
			"lot_id": 2
		}
	],
	"status": "success"
}
```

###### Failure

```json
{
	"data":[],
	"status": "error"
}
```

#### Get sensor by name

##### *Example Request:*

```
GET /lot/:name
```

##### *Example Response:*

###### Success

```json
{
	"data":{
		"id": 4,
		"name": "L4",
		"latitude": 15.321321,
		"longitude": 12.456565,
		"gateway_id": 3
	},
	"status": "success"
}
```

###### Failure

```json
{
	"is_occupied": 0,
	"status": "error"
}
```

#### Update sensor

##### *Example Request:*

```
PUT /sensor/update
Parammeters: id, is_occupied
```
###### Success

##### *Example Response:*

```json
{
	"status": "success"
}
```

###### Failure

```json
{
	"status": "error"
}
```