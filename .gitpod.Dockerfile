# Base image
FROM gitpod/workspace-full

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Expose ports
EXPOSE 27017 5432 6379 9092

# Start services
CMD ["bash"]
