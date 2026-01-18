//// [tests/cases/compiler/exportEqualErrorType.ts] ////

//// [exportEqualErrorType_0.ts]
namespace server {
    export interface connectModule {
        (res, req, next): void;
    }
    export interface connectExport {
        use: (mod: connectModule) => connectExport;
    }
}
declare var server: {
    (): server.connectExport;
    foo: Date;
};
export = server;
 
//// [exportEqualErrorType_1.ts]
///<reference path='exportEqualErrorType_0.ts'/>
import connect = require('./exportEqualErrorType_0');
connect().use(connect.static('foo')); // Error  1      The property 'static' does not exist on value of type ''.


//// [exportEqualErrorType_0.js]
"use strict";
module.exports = server;
//// [exportEqualErrorType_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='exportEqualErrorType_0.ts'/>
var connect = require("./exportEqualErrorType_0");
connect().use(connect.static('foo')); // Error  1      The property 'static' does not exist on value of type ''.
