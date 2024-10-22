FROM node:18-alpine
 
# Create app directory
WORKDIR /usr/src/app
 
COPY package*.json ./
 
# Bundle app source
COPY . .
 
# Install app dependencies
RUN npm install
 
RUN npm run build
 
# Start the server
CMD ["npm","run","start:dev"]