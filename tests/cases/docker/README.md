Integrations
============

This repository contains `Dockerfile`s that describe how to build open source projects (usually those with complex build tasks) with a specific version of typescript. These are used for extended validations of a given typescript build.

Contibuting
-----------

To add a new test:
* Create a new folder with the name of the project
* Create a `Dockerfile` within that folder
* The `Dockerfile` will be built with `docker build . -t tstest/folder` and then run with `docker run tstest/folder`
* Write the dockerfile such that it can build the target project and injects the typescript package from the `typescript/typescript` image (which should have a tar file at `/typescript/typescript-*.tgz`)
