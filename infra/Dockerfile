FROM node:16-alpine

RUN apk add --update python3 make g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]