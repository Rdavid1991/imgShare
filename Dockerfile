FROM alpine

RUN apk add --update nodejs npm

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]