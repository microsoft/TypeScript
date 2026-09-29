// @target: es2015
// @Filename: host.ts
export class Host { }

// @Filename: consumer.ts
// @module: commonjs

import host = require("host");
var hostVar = host;
var v = new hostVar.Host();
 