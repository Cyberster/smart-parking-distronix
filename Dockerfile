#FROM node:9-slim
FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
#CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

