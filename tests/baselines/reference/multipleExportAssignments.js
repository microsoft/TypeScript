//// [multipleExportAssignments.ts]
interface connectModule {
    (res, req, next): void;
}
interface connectExport {
    use: (mod: connectModule) => connectExport;
    listen: (port: number) => void;
}
var server: {
    (): connectExport;
    test1: connectModule;
    test2(): connectModule;
};
export = server;
export = connectExport;
 


//// [multipleExportAssignments.js]
"use strict";
var server;
module.exports = server;
