FROM node:current
RUN npm install -g @microsoft/rush
RUN git clone --depth 1 https://github.com/Azure/azure-sdk-for-js.git /azure-sdk
WORKDIR /azure-sdk
RUN rush update
WORKDIR /azure-sdk/sdk/core/core-http
# Sync up all TS versions used internally so they're all linked from a known location
RUN rush add -p "typescript@3.5.1" --dev -m
# Relink installed TSes to built TS
WORKDIR /azure-sdk/common/temp/node_modules/.pnpm/registry.npmjs.org/typescript/3.5.1/node_modules
RUN rm -rf typescript
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN ln -s /typescript/package ./typescript
WORKDIR /azure-sdk
ENTRYPOINT [ "rush" ]
CMD [ "rebuild", "--parallelism", "1" ]