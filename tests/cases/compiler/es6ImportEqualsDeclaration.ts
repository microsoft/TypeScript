// @target: es6

// @filename: server.ts
var a = 10;
export = a;

// @filename: client.ts
import a = require("server");