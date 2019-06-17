FROM node:current
RUN npm install -g @microsoft/rush
RUN git clone https://github.com/OfficeDev/office-ui-fabric-react.git /office-ui-fabric-react
WORKDIR /office-ui-fabric-react
RUN git pull
RUN rush update
WORKDIR /office-ui-fabric-react/scripts
# Sync up all TS versions used internally so they're all linked from a known location
RUN rush add -p "typescript@3.5.1" --exact --dev -m
# Relink installed TSes to built TS
WORKDIR /office-ui-fabric-react/common/temp/node_modules/.registry.npmjs.org/typescript/3.5.1/node_modules
RUN rm -rf typescript
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN ln -s /typescript/package ./typescript
RUN npm i -g /typescript.tgz
WORKDIR /office-ui-fabric-react
ENTRYPOINT [ "rush" ]
CMD [ "rebuild", "--parallelism", "1" ]