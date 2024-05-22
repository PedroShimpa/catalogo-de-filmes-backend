FROM node:lts-alpine

WORKDIR .

COPY package*.json ./

RUN npm install 

COPY . .

ENV DATABASE_HOST=postgres \
	DATABASE_PORT=postgres \
	DATABASE_USERNAME=postgres \
	DATABASE_PASSWORD=postgres \
	DATABASE_NAME=desafio \
	REDIS_HOST=redis \
	JWT_SECRET=macacosmemordam

EXPOSE 3000

RUN npm run build
CMD ["node", "dist/main.js"]
