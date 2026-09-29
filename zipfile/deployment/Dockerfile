FROM node:22 AS build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json* ./
RUN npm ci

COPY . .
RUN npm run build
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/deployment/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx","-g", "daemon off;"]