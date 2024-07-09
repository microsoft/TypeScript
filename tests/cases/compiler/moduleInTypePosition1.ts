// @module: commonjs
// @Filename: moduleInTypePosition1_0.ts
export class Promise {
    foo: string;
}

// @Filename: moduleInTypePosition1_1.ts
///<reference path='moduleInTypePosition1_0.ts'/>
import WinJS = require('./moduleInTypePosition1_0');
var x = (w1: WinJS) => { };
