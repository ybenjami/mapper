  
FROM node:14.17.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .


CMD ["mkdir", "temp"]
CMD ["sh", "-c",  "node ./src/index.js --id=${AWS_ACCESS_KEY_ID} --secret=${AWS_SECRET_ACCESS_KEY}"]
