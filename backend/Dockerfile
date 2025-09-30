## Use Node.js 18 Alpine as the base image (lightweight)
FROM node:18-alpine

## Set working directory inside the container
WORKDIR /app

## Copy only package.json and package-lock.json first for better caching
COPY package*.json ./

## Install production dependencies
RUN npm install --production

## Copy the rest of the application code
COPY . .

## Create volumes for uploads and logs (optional, for persistence)
VOLUME ["/app/uploads"]

## Expose port 4000 for the backend server
EXPOSE 4000
## Start the backend server
CMD ["node", "index.js"]
