// @target: es2015
// @module: commonjs
// @noresolve: true
import b = require("externalModule");
declare module "m1" {
    import im2 = require("externalModule");
}
