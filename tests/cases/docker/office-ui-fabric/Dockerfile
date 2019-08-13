FROM node:current
RUN npm install -g yarn lerna
RUN git clone https://github.com/OfficeDev/office-ui-fabric-react.git /office-ui-fabric-react
WORKDIR /office-ui-fabric-react
RUN git pull
COPY --from=typescript/typescript /typescript/typescript-*.tgz typescript.tgz
# Sync up all TS versions used internally to the new one
WORKDIR /office-ui-fabric-react/scripts
RUN yarn add typescript@../typescript.tgz --exact --dev --ignore-scripts
WORKDIR /office-ui-fabric-react/packages/tsx-editor
RUN yarn add typescript@../../typescript.tgz --exact --ignore-scripts
WORKDIR /office-ui-fabric-react/packages/migration
RUN yarn add typescript@../../typescript.tgz --exact --ignore-scripts
WORKDIR /office-ui-fabric-react/apps/vr-tests
RUN yarn add typescript@../../typescript.tgz --exact --ignore-scripts
WORKDIR /office-ui-fabric-react/apps/todo-app
RUN yarn add typescript@../../typescript.tgz --exact --ignore-scripts
WORKDIR /office-ui-fabric-react
RUN yarn
ENTRYPOINT [ "lerna" ]
CMD [ "run", "build", "--stream", "--concurrency", "1", "--", "--production", "--lint" ]