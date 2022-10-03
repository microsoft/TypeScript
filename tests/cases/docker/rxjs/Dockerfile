FROM node:10
RUN git clone --depth 1 https://github.com/ReactiveX/rxjs /rxjs
WORKDIR /rxjs
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN rm ./package-lock.json
RUN npm i -D typescript@/typescript/package
RUN npm install
# Set entrypoint back to bash (`node` base image made it `node`)
ENTRYPOINT [ "/bin/bash", "-c" , "exec \"${@:0}\";"]
# Build
CMD npm run build_all