// @module: amd

// @filename: a.d.ts

declare module "http" {
}

declare module 'intern/dojo/node!http' {
    import http = require('http');
    export = http;
}

// @filename: a.ts

/// <reference path="a.d.ts"/>

import * as http from 'intern/dojo/node!http';