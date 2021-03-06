### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10 as builder

WORKDIR /ng-app

COPY package*.json ./
RUN npm install

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer


### STAGE 2: Setup ###
FROM nginx:alpine
LABEL maintainer="Trinh Phuoc Thai <tphuocthai@gmail.com>"

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
