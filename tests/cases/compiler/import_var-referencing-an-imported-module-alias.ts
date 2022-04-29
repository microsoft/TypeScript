// @Filename: host.ts
export class Host { }

// @Filename: consumer.ts
// @module: amd

import host = require("host");
var hostVar = host;
var v = new hostVar.Host();
 