# We use this dockerfile to build a packed tarfile which we import in our `docker` tests
FROM node:current
COPY . /typescript
WORKDIR /typescript
RUN npm ci
RUN npx hereby configure-insiders && npx hereby LKG && npx hereby clean && npm pack .
