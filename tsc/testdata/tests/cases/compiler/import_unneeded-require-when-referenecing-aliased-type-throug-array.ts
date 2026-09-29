// @target: es2015
// @Filename: b.ts
declare module "ITest" {
    interface Name {
        name: string;
    }
    export = Name;
}

// @Filename: a.ts
//@module: commonjs
/// <reference path="b.ts" />
import ITest = require('ITest');
var testData: ITest[];
var p = testData[0].name;
 