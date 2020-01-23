FROM node
COPY . .
# install a local copy of an older version of v8 to run the suite on
RUN wget https://nodejs.org/download/release/v0.10.48/node-v0.10.48-linux-x64.tar.xz
RUN mkdir /.node
RUN tar -x --xz -f node-v0.10.48-linux-x64.tar.xz -C /.node
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN npm install typescript@/typescript.tgz
RUN git clone https://github.com/tc39/test262.git ./test262 --depth 1
WORKDIR ./test262
RUN npm install -g test262-harness
ENTRYPOINT [ "test262-harness" ]
# to run a specific failed test outside the context of the docker harness, run
# docker run -it tstest/test262 test/test/name/here.js --threads 1 --hostType node --hostPath /.node/node-v0.10.48-linux-x64/bin/node --transformer ../typescript.js
# You can also pass --saveOnlyFailed to cause `test262-harness` to save off the transpiled output of a failed test input (it is output alongside the input)
# In such cases, it's probably better to run the container interactively, with `docker run -it --entrypoint "/bin/sh" tstest/test262`
# and then execute the `test262-harness` commands interactively.
# Run tests
CMD [ "test/**/*.js", "--threads", "1", "--hostType", "node", "--hostPath", "/.node/node-v0.10.48-linux-x64/bin/node", "--transformer", "../typescript.js" ]