FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD 12345678
ENV MYSQL_DATABASE smart_parking_distronix
ENV MYSQL_USER arp14
ENV MYSQL_PASSWORD 1234
#ENV MYSQL_ROOT_HOST %
ADD ./smart_parking_distronix.sql /docker-entrypoint-initdb.d
EXPOSE 3306
#COPY docker-entrypoint.sh /usr/local/bin/
#RUN ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
#RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
#    && ln -s /usr/local/bin/docker-entrypoint.sh /
#ENTRYPOINT ["docker-entrypoint.sh"]

