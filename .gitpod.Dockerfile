# Base image
FROM gitpod/workspace-full

# Install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
    && apt-get update \
    && apt-get install -y mongodb-org

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Install Kafka
RUN apt-get update && apt-get install -y default-jdk \
    && wget https://downloads.apache.org/kafka/2.7.0/kafka_2.13-2.7.0.tgz \
    && tar -xzf kafka_2.13-2.7.0.tgz \
    && mv kafka_2.13-2.7.0 /usr/local/kafka \
    && rm kafka_2.13-2.7.0.tgz

# Set environment variables for Kafka
ENV KAFKA_HOME=/usr/local/kafka
ENV PATH=$PATH:$KAFKA_HOME/bin

# Copy Kafka config files (assuming you have them in your repository)
COPY kafka/server.properties /usr/local/kafka/config/server.properties

# Expose ports
EXPOSE 27017 5432 6379 9092

# Start services
CMD ["bash"]
