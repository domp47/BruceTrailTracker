# Use official node image as the base image
FROM node:latest as build

COPY ./ /usr/local/app/
WORKDIR /usr/local/app

RUN npm install
RUN npm run buildprod

FROM nginx:latest

COPY --from=build /usr/local/app/dist/ui /usr/share/nginx/html

EXPOSE 80