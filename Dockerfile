FROM seleniarm/standalone-chromium:latest

USER root

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /usr/src/app/allure-results && chmod -R 777 /usr/src/app/allure-results

USER seluser

CMD ["npx", "wdio", "run", "wdio.docker.conf.js"]