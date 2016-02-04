// @Filename: b.ts
declare module "ITest" {
    interface Name {
        name: string;
    }
    export = Name;
}

// @Filename: a.ts
//@module: amd
/// <reference path="b.ts" />
import ITest = require('ITest');
var testData: ITest[];
var p = testData[0].name;
 