# vscode only supports older node
FROM node:14
RUN apt-get update
RUN apt-get install libsecret-1-dev libx11-dev libxkbfile-dev -y
RUN npm i -g yarn --force
RUN git clone --depth 1 https://github.com/microsoft/vscode.git /vscode
WORKDIR /vscode
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
WORKDIR /vscode/build
RUN yarn add typescript@/typescript.tgz
WORKDIR /vscode/extensions
RUN yarn add rimraf
RUN yarn add typescript@/typescript.tgz
WORKDIR /vscode
RUN yarn add typescript@/typescript.tgz
RUN yarn
ENTRYPOINT [ "yarn" ]
# Build
CMD [ "compile" ]