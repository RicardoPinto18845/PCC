FROM node:lts-alpine
ENV NODE_ENV=production
ENV ACCESS_TOKEN_SECRET=e573eef32ee554ad4e05682c8acc62117670780e6d21545dd137ce1b43da9e897c92c5eecb0d766cb52e530e1d176a0ec99767b33ba98d393313e2228ce1d92b
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 7040
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
