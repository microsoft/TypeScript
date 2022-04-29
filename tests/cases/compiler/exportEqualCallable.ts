//@module: amd

// @Filename: exportEqualCallable_0.ts
var server: {
    (): any;
};
export = server;

// @Filename: exportEqualCallable_1.ts
///<reference path='exportEqualCallable_0.ts'/>
import connect = require('exportEqualCallable_0');
connect();
