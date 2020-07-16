FROM node:current
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /depot_tools
ENV PATH=/depot_tools:$PATH
WORKDIR /
RUN mkdir devtools
WORKDIR devtools
RUN fetch devtools-frontend
WORKDIR devtools-frontend
RUN gn gen out/Default
COPY --from=typescript/typescript /typescript/typescript-*.tgz typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN ln -s /typescript/package ./node_modules/typescript
RUN autoninja -C out/Default front_end