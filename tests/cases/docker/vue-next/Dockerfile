FROM node:current
RUN npm install -g pnpm
RUN git clone --depth 1 https://github.com/vuejs/core.git /vue-next
WORKDIR /vue-next
COPY --from=typescript/typescript /typescript/typescript-*.tgz typescript.tgz
# Sync up all TS versions used internally to the new one
RUN pnpm add typescript@./typescript.tgz --save-exact --save-dev --ignore-scripts -W
RUN pnpm i
ENTRYPOINT [ "npm" ]
CMD [ "run", "build", "--production", "--", "--types" ]