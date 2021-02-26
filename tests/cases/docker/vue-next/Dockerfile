FROM node:current
RUN npm install -g yarn lerna --force
RUN git clone --depth 1 https://github.com/vuejs/vue-next.git /vue-next
WORKDIR /vue-next
COPY --from=typescript/typescript /typescript/typescript-*.tgz typescript.tgz
# Sync up all TS versions used internally to the new one
RUN yarn add typescript@./typescript.tgz --exact --dev --ignore-scripts -W
RUN yarn
ENTRYPOINT [ "npm" ]
CMD [ "run", "build", "--production", "--", "--types" ]