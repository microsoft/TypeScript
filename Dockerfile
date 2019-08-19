# We use this dockerfile to build a packed tarfile which we import in our `docker` tests
FROM node:current
COPY . /typescript
WORKDIR /typescript
RUN npm install
RUN npm i -g gulp-cli
RUN gulp configure-insiders && gulp LKG && gulp clean && npm pack .