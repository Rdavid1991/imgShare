FROM alpine

RUN apk add --update nodejs npm

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME C://volumes//app /home/app/src/public/upload

CMD ["npm","start"]