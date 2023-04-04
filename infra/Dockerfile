FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/shar/nginx/html*

COPY --from=builder /app/build usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
