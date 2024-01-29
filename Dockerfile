# build environment
FROM node:alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/dist/ /var/www/
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]