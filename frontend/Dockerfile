FROM node:lts
COPY myfacilities/ /code
WORKDIR /code
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "5002"]
