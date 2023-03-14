FROM node:16-alpine

# RUN apt-get update

# RUN apt-get install -y python3

RUN apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app 

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]