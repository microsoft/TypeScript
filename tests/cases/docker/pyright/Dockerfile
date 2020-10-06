FROM node:current
RUN git clone https://github.com/microsoft/pyright.git /pyright
WORKDIR /pyright
RUN git pull
RUN npm i
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN npm install /typescript.tgz --exact --ignore-scripts --save-dev
RUN npx lerna exec --stream --concurrency 1 -- npm install /typescript.tgz --exact --ignore-scripts --save-dev
ENTRYPOINT [ "npx" ]
CMD [ "lerna", "exec", "--stream",  "--concurrency", "1", "--no-bail", "--", "tsc", "--noEmit" ]