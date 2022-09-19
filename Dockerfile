# We use this DockerFile to build a packaged tar file that we import in our `docker` tests.
FROM node:current
COPY . /typescript
WORKDIR /typescript
RUN npm ci
RUN npm i -g gulp-cli
RUN gulp configure-insiders && gulp LKG && gulp clean && npm pack .
