Integrations
============

This repository contains `Dockerfile`s that describe how to build open source projects (usually those with complex build tasks) with a specific version of typescript. These are used for extended validations of a given typescript build.

Contributing
-----------

To add a new test:
* Create a new folder with the name of the project
* Create a `Dockerfile` within that folder
* The `Dockerfile` will be built with `docker build . -t tstest/folder` and then run with `docker run tstest/folder`
* Write the dockerfile such that it can build the target project and injects the typescript package from the `typescript/typescript` image (which should have a tar file at `/typescript/typescript-*.tgz`)

Debugging
---------

You can open a test's container with an interactive shell to debug with `docker run -it --entrypoint "/bin/sh" tstest/folder`.
If you want to remote debug a typescript process within a container, you'll need to forward the port you instruct the
compiler or language server to listen on by passing `--expose PORT` where `PORT` is the port number you'd like forwarded to the
host.
