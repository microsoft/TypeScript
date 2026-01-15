//@module: commonjs
// @Filename: exportEqualErrorType_0.ts
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
 
// @Filename: exportEqualErrorType_1.ts
///<reference path='exportEqualErrorType_0.ts'/>
import connect = require('./exportEqualErrorType_0');
connect().use(connect.static('foo')); // Error  1      The property 'static' does not exist on value of type ''.
