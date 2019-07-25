FROM node:current
ARG TS_SHA
ENV TS_SHA=$TS_SHA
RUN git clone https://github.com/tildeio/broccoli-typescript-compiler.git /bts
WORKDIR /bts
RUN git pull
RUN git submodule update --init
WORKDIR vendor/typescript
# While it'd be nice to pull this from the build context, then we'd have to pipe a _huge_ volume of
# stuff into the build context, which for every other test we don't need, and that takes real overhead
# on _every_ container build - the git fetch result may not have the built output or LKG,
# but this project only uses the git vendoring for the project tests, so it should be fine
RUN git fetch origin $TS_SHA
RUN git checkout $TS_SHA
WORKDIR /bts
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN yarn add typescript@/typescript.tgz --ignore-scripts
# TODO: remove the forced upgrade of the node 10 types version once the project updates their version themselves
RUN yarn add @types/node@10 --ignore-scripts
RUN yarn --ignore-scripts
# Set entrypoint back to bash (`node` base image made it `node`)
ENTRYPOINT [ "/bin/bash", "-c" , "exec \"${@:0}\";"]
# Build
CMD yarn build && npx qunit dist/tests/*-test.js