FROM node:12

WORKDIR /app/front

COPY package.json .

RUN npm install -g http-server

RUN npm install
RUN npm install @vue/cli -g

COPY . .

RUN npm run build

EXPOSE 5001

ENTRYPOINT [ "http-server","-p 5001", "dist"]