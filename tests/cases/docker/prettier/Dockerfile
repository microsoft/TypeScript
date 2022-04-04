FROM node:current
RUN npm i -g yarn --force
RUN git clone --depth 1 https://github.com/prettier/prettier.git /prettier
WORKDIR /prettier
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN yarn add typescript@/typescript.tgz
RUN yarn
ENTRYPOINT [ "yarn" ]
# Build
CMD [ "build" ]