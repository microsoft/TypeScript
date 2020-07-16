FROM node:current
RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /depot_tools
ENV PATH=/depot_tools:$PATH
WORKDIR /
RUN mkdir devtools
WORKDIR devtools
RUN fetch devtools-frontend
WORKDIR devtools-frontend
RUN gn gen out/Default
COPY --from=typescript/typescript /typescript/typescript-*.tgz /typescript.tgz
RUN mkdir /typescript
RUN tar -xzvf /typescript.tgz -C /typescript
RUN ln -s /typescript/package ./node_modules/typescript
# We don't want to show the ordering of which tasks ran in Ninja, as that is non-deterministic.
# Instead, only show the errors in the log, from the first occurrence of a FAILED task.
# If the task passes, then there is no log written.
CMD ["autoninja", "-C", "out/Default", ">", "error.log", "||", "tail", "-n", "+$(sed", "-n", "'/FAILED/='", "error.log)", "error.log"]