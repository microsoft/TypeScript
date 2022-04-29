// @module: commonjs
// @Filename: localAliasExportAssignment_0.ts
var server: {
    (): any;
};

export = server;

// @Filename: localAliasExportAssignment_1.ts
///<reference path='localAliasExportAssignment_0.ts'/>
import connect = require('./localAliasExportAssignment_0');

connect();


