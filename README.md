# Smart Parking Application - Distronix

## Database Schema

### Schema Simplified

lot table
- id int unique AI PK
- name (P1, P2, ...) unique secondary string
- latitude double
- longitude double
- gateway_id int (foreign key, refers to gateway.id)

bay table
- id int unique AI PK
- name (B1, B2, ...) unique secondary string
- x_coordinate double
- y_coordinate double
- sensor_id int (foreign key, refers to sensor.id)
- lot_id int (foreign key, refers to lots.id)

sensor table
- id int unique AI PK
- uuid unique secondary string 50
- is_occupied boolean (refers to the current status)

gateway table
- id int unique AI PK
- uuid unique secondary string 50

status table
- id int unique AI PK
- sensor_id int (foreign key, refers to sensor.id)
- timestamp timestamp
- is_occupied boolean (refers to status @ certain timestamp)

#### Entity Relationships
* bay : lot => n : 1
* lot : gateway => 1 : 1
* bay : sensor => 1 : 1
* sensor : status => 1 : n

#### Note

- occupancy_status can be present in sensor table as well as in status table.
- If we store occupancy_status in the status table, it refers to status @ certain timestamp
- If we store occupancy_status in the sensor table, it refers to the current status
- If not present in status table, we don't get status history. But it's ok as
we're only dealing with the live occupancy staus.
- sensor.is_occupied refers to the current status of the sensor
- status.is_occupied refers to status of the sensor at certain timestamp
- In the table 'bay', name + lot_id is unique

### Relation Between Tables

![Smart Parking Schema](/schema/schema.png)

## Installation

Use the following command to install foobar all required dependencies required for this project.

```bash
npm install
```

## Configuring Variables

Variables like listening port, mysql database credentials can be configured in config.env

## Starting the Server

```
node index
```

## API Usage

* Fetch list of all parking lots: 

	*GET /lot*

* Fetch lot details along with list of all bays within that lot:

	*GET /lot/:lot_name*

* Fetch bay details by global name: 

	*GET /bay/:lot_name/:bay_name*

* Insert a new data point corresponding to a sensor: 

	*POST /data*

	*Params: sensor_id, timestamp, and is_occupied*



