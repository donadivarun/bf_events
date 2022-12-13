
FROM node:18.11 as b
WORKDIR /usr/src/app
RUN npm i -g @angular/cli@14.2.8
COPY package.json package.json
RUN npm install
COPY . .
RUN ng build
FROM nginx
COPY --from=b /usr/src/app/dist/bf_events /usr/share/nginx/html

