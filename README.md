# Imphnen Community Project - Docker Deployment

This document explains how to deploy the Imphnen Community Next.js application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

## Docker Deployment Instructions

### Building and Running with Docker Compose

The easiest way to deploy the application is using Docker Compose:

```bash
# Build and start the containers in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down
```

### Building and Running with Docker Only

If you prefer to use Docker commands directly:

```bash
# Build the Docker image
docker build -t imphnen-community .

# Run the container
docker run -p 3000:3000 imphnen-community
```

## Docker Configuration Files

This project includes the following Docker configuration files:

1. `Dockerfile` - Defines the container image build process
2. `.dockerignore` - Specifies files to exclude from the Docker build
3. `docker-compose.yml` - Defines the services, networks, and volumes

## Environment Variables

To add environment variables to your application:

1. Create a `.env` file in the project root (it's already in `.dockerignore` for security)
2. Add your environment variables to the `docker-compose.yml` file under the `environment` section

## Neo Brutalism UI Style

This project features a Neo Brutalism UI style with thin borders that are visually appealing, as specified in the project requirements.

## Accessing the Application

Once deployed, you can access the application at:

- http://localhost:3000

## Troubleshooting

If you encounter issues:

1. Check the Docker logs: `docker-compose logs -f`
2. Ensure all ports are available
3. Verify Docker is running properly on your system

## Production Deployment

For production deployment:

1. Update environment variables as needed
2. Consider using a reverse proxy like Nginx for SSL termination
3. Set up proper monitoring and logging solutions
