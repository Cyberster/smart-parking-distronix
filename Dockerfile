## Pull the mysql:5.7 image
FROM mysql:5.7

## The maintainer name and email
MAINTAINER Arpan Das <arp14@yahoo.com>

# database = test and password for root = password
ENV MYSQL_DATABASE=smart_parking_distronix \
    MYSQL_ROOT_PASSWORD=12345678

# when container will be started, we'll have `test` database created with this schema
COPY ./smart_parking_distronix_mysql_create.sql /docker-entrypoint-initdb.d/