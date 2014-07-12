//// [tests/cases/compiler/exportEqualMemberMissing.ts] ////

//// [exportEqualMemberMissing_0.ts]
module server {
    export interface connectModule {
        (res, req, next): void;
    }
    export interface connectExport {
        use: (mod: connectModule) => connectExport;
    }
}
var server: {
    (): server.connectExport;
    foo: Date;
};
export = server;

//// [exportEqualMemberMissing_1.ts]
///<reference path='exportEqualMemberMissing_0.ts'/>
import connect = require('exportEqualMemberMissing_0');
connect().use(connect.static('foo')); // Error	1	The property 'static' does not exist on value of type ''.


//// [exportEqualMemberMissing_0.js]
var server;
module.exports = server;
//// [exportEqualMemberMissing_1.js]
var connect = require('exportEqualMemberMissing_0');
connect().use(connect.static('foo'));
