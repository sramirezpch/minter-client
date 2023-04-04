FROM nginx:alpine AS builder

RUN rm -rf /usr/shar/nginx/html*

COPY /build usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
