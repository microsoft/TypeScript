# Lock to node 12 because the codebase throws hundreds of `Warning: Accessing non-existent property` warnings in node 14
FROM node:12
ENV CI=true
ENV TF_BUILD=true
# Download repo version, sets up better layer caching for the following clone
ADD https://api.github.com/repos/OfficeDev/office-ui-fabric-react/git/ref/heads/master version.json
RUN git clone https://github.com/OfficeDev/office-ui-fabric-react.git /office-ui-fabric-react
WORKDIR /office-ui-fabric-react
RUN git pull
WORKDIR /
COPY --from=typescript/typescript /typescript/typescript-*.tgz typescript.tgz
WORKDIR /office-ui-fabric-react
# Sync up all TS versions used internally to the new one (we use `npm` because `yarn` chokes on tarballs installed
# into multiple places in a workspace in a short timeframe (some kind of data race))
RUN npx lerna exec --stream --concurrency 1 -- npm install /typescript.tgz --exact --ignore-scripts
RUN npx yarn
# Perform scss task to generate scss code if present
RUN npx lerna exec --stream --concurrency 1 --bail=false -- yarn run just scss
ENTRYPOINT [ "npx" ]
CMD [ "lerna", "exec", "--stream", "--concurrency", "1", "--loglevel", "error", "--bail=false", "--", "yarn", "run", "just", "ts"]