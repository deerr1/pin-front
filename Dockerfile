FROM node:12

WORKDIR /app/front

COPY package.json .

RUN npm install
RUN npm install @vue/cli -g
# RUN npm install -g typescript

COPY . .

EXPOSE 5001

ENTRYPOINT [ "npm", "run", "serve", "--port 5001"]