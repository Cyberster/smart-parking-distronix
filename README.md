# Smart Parking Application - Distronix

A smart parking application that shows the status of spots in a parking lot.

## Used Technologies

- Node.js
- Express.js
- MySQL Database

## Database Schema

### Link to the Schema Design

> [https://dbdesigner.page.link/tDqa6aHVUv2veaBw7](https://dbdesigner.page.link/tDqa6aHVUv2veaBw7)


### Schema Simplified

**`lot`** table
- `id` int unique AI PK
- `name` (P1, P2, ...) unique secondary string
- `latitude` double
- `longitude` double
- `gateway_id` int (foreign key, refers to gateway.id)

**`bay`** table
- `id` int unique AI PK
- `name` (B1, B2, ...) string
- `x_coordinate` double
- `y_coordinate` double
- `sensor_id` int (foreign key, refers to sensor.id)
- `lot_id` int (foreign key, refers to lots.id)

(`name + lot_id` is unique, secondary)

**`sensor`** table
- `id` int unique AI PK
- `uuid` unique secondary string 50
- `is_occupied` boolean (refers to the current status)

**`gateway`** table
- `id` int unique AI PK
- `uuid` unique secondary string 50

**`status`** table
- `id` int unique AI PK
- `sensor_id` int (foreign key, refers to sensor.id)
- `timestamp` timestamp
- `is_occupied` boolean (refers to status at certain timestamp)

#### Entity Relationships

Entities | Relationship
--- | ---
bay : lot | n : 1
lot : gateway | 1 : 1
bay : sensor | 1 : 1
sensor : status | 1 : n

#### Note

- `occupancy_status` can be present in **sensor** table as well as in **status** table.
- If we store `occupancy_status` in the **status** table, it refers to status at certain timestamp.
- If we store `occupancy_status` in the **sensor** table, it refers to the current status.
- If not present in **status** table, we don't get status history. But it's ok as
we're only dealing with the live occupancy staus.
- `sensor.is_occupied` refers to the current/live status of a sensor.
- `status.is_occupied` refers to status of a particular sensor at certain timestamp.
- In the table **bay**, `name + lot_id` is UNIQUE.
- In the table **lot**, `gateway_id` is UNIQUE.

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

```sh
npm install
```

## Starting the Server

Start the server using the following command

```sh
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

##### *Request Syntax:*

```
GET /lot
```

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

##### *Request Syntax:*

```
GET /lot/:lot_name
```

##### *Example Request:*

```
GET /lot/L1
```

##### *Example Response:*

###### Success

```json
{
	"data":{
		"lot":{
			"id": 1,
			"name": "L1",
			"latitude": 15.121212,
			"longitude": 12.454242,
			"gateway_id": 1
		},
		"bays":[
			{
				"name": "B1",
				"x_coordinate": 12,
				"y_coordinate": 10,
				"sensor_id": 1
			},
			{
				"name": "B2",
				"x_coordinate": 13,
				"y_coordinate": 11,
				"sensor_id": 2
			},
			{
				"name": "B3",
				"x_coordinate": 13,
				"y_coordinate": 11,
				"sensor_id": 3
			},
			{
				"name": "B4",
				"x_coordinate": 15,
				"y_coordinate": 13,
				"sensor_id": 4
			},
			{
				"name": "B5",
				"x_coordinate": 16,
				"y_coordinate": 14,
				"sensor_id": 5
			},
			{
				"name": "B6",
				"x_coordinate": 17,
				"y_coordinate": 15,
				"sensor_id": 6
			},
			{
				"name": "B7",
				"x_coordinate": 18,
				"y_coordinate": 16,
				"sensor_id": 7
			},
			{
				"name": "B8",
				"x_coordinate": 19,
				"y_coordinate": 17,
				"sensor_id": 8
			}
		]
	},
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

##### *Request Syntax:*

```
GET /bay/:lot_name/:bay_name
```

##### *Example Request:*

```
GET /bay/L1/B1
```

##### *Example Response:*

###### Success

```json
{
    "data":{
        "lot_id": 1,
        "lot_name": "L1",
        "latitude": 15.121212,
        "longitude": 12.454242,
        "gateway_id": 1,
        "bay_id": 2,
        "bay_name": "B1",
        "x_coordinate": 12,
        "y_coordinate": 10,
        "sensor_id": 1
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

##### *Request Syntax:*

```
POST /data

Parammeters: sensor_id, timestamp, is_occupied
```

##### *Example Request:*

```
POST /data

sensor_id=5&timestamp=2020-07-20T04:41:44+00:00&is_occupied=0
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

##### *Request Syntax:*

```
POST /bay/add

Parammeters: name, x_coordinate, y_coordinate, lot_id, sensor_id
```

##### *Example Request:*

```
POST /bay/add

name=B5&x_coordinate=10.0&y_coordinate=12.0&lot_id=1&sensor_id=5
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

##### *Request Syntax:*

```
POST /lot/add

Parammeters: name, latitude, longitude, gateway_id
```

##### *Example Request:*

```
POST /lot/add

name=L5&latitude=15.321321&longitude=12.9191555&gateway_id=2
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

##### *Request Syntax:*

```
POST /sensor/add

Parammeters: uuid, is_occupied
```

##### *Example Request:*

```
POST /sensor/add

uuid=0fca8705-af70-4e45-b917-5917623f4f77&is_occupied=1
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

##### *Request Syntax:*

```
GET /bay/:name
```

##### *Example Request:*

```
GET /bay/B1
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

#### Get sensor by id

##### *Request Syntax:*

```
GET /sensor/:id
```

##### *Example Request:*

```
GET /sensor/1
```

##### *Example Response:*

###### Success

```json
{
	"is_occupied": 1,
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

##### *Request Syntax:*

```
PUT /sensor/update

Parammeters: id, is_occupied
```

##### *Example Request:*

```
PUT /sensor/update

id=0&is_occupied=1
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
