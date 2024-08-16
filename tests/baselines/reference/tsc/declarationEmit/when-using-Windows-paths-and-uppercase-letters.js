currentDirectory:: D:\Work\pkg1 useCaseSensitiveFileNames: false
Input::
//// [D:/Work/pkg1/package.json]
{
  "name": "ts-specifier-bug",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "5.4.0-dev.20231222"
  }
}

//// [D:/Work/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": [
    "src"
  ]
}

//// [D:/Work/pkg1/src/main.ts]
import { PartialType } from './utils';

class Common {}

export class Sub extends PartialType(Common) {
    id: string;
}


//// [D:/Work/pkg1/src/utils/index.ts]
import { MyType, MyReturnType } from './type-helpers';

export function PartialType<T>(classRef: MyType<T>) {
    abstract class PartialClassType {
        constructor() {}
    }

    return PartialClassType as MyReturnType;
}


//// [D:/Work/pkg1/src/utils/type-helpers.ts]
export type MyReturnType = {
    new (...args: any[]): any;
};

export interface MyType<T = any> extends Function {
    new (...args: any[]): T;
}


//// [D:/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


D:/a/lib/tsc.js -p D:\Work\pkg1 --explainFiles
Output::
[91merror[0m[90m TS2318: [0mCannot find global type 'Array'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Boolean'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Function'.

[91merror[0m[90m TS2318: [0mCannot find global type 'IArguments'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Number'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Object'.

[91merror[0m[90m TS2318: [0mCannot find global type 'RegExp'.

[91merror[0m[90m TS2318: [0mCannot find global type 'String'.

[91merror[0m[90m TS6053: [0mFile 'D:/a/lib/lib.es2017.full.d.ts' not found.
  The file is in the program because:
    Default library for target 'es2017'

  [96mtsconfig.json[0m:[93m10[0m:[93m15[0m
    [7m10[0m     "target": "es2017",
    [7m  [0m [96m              ~~~~~~~~[0m
    File is default library for target specified here.

src/utils/type-helpers.ts
  Imported via './type-helpers' from file 'src/utils/index.ts'
  Matched by include pattern 'src' in 'tsconfig.json'
src/utils/index.ts
  Imported via './utils' from file 'src/main.ts'
  Matched by include pattern 'src' in 'tsconfig.json'
src/main.ts
  Matched by include pattern 'src' in 'tsconfig.json'

Found 9 errors.



//// [D:/Work/pkg1/dist/utils/type-helpers.js.map]
{"version":3,"file":"type-helpers.js","sourceRoot":"","sources":["../../src/utils/type-helpers.ts"],"names":[],"mappings":""}

//// [D:/Work/pkg1/dist/utils/type-helpers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=type-helpers.js.map

//// [D:/Work/pkg1/dist/utils/type-helpers.d.ts]
export type MyReturnType = {
    new (...args: any[]): any;
};
export interface MyType<T = any> extends Function {
    new (...args: any[]): T;
}


//// [D:/Work/pkg1/dist/utils/index.js.map]
{"version":3,"file":"index.js","sourceRoot":"","sources":["../../src/utils/index.ts"],"names":[],"mappings":";;AAEA,kCAMC;AAND,SAAgB,WAAW,CAAI,QAAmB;IAC9C,MAAe,gBAAgB;QAC3B,gBAAe,CAAC;KACnB;IAED,OAAO,gBAAgC,CAAC;AAC5C,CAAC"}

//// [D:/Work/pkg1/dist/utils/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialType = PartialType;
function PartialType(classRef) {
    class PartialClassType {
        constructor() { }
    }
    return PartialClassType;
}
//# sourceMappingURL=index.js.map

//// [D:/Work/pkg1/dist/utils/index.d.ts]
import { MyType, MyReturnType } from './type-helpers';
export declare function PartialType<T>(classRef: MyType<T>): MyReturnType;


//// [D:/Work/pkg1/dist/main.js.map]
{"version":3,"file":"main.js","sourceRoot":"","sources":["../src/main.ts"],"names":[],"mappings":";;;AAAA,mCAAsC;AAEtC,MAAM,MAAM;CAAG;AAEf,MAAa,GAAI,SAAQ,IAAA,mBAAW,EAAC,MAAM,CAAC;CAE3C;AAFD,kBAEC"}

//// [D:/Work/pkg1/dist/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = void 0;
const utils_1 = require("./utils");
class Common {
}
class Sub extends (0, utils_1.PartialType)(Common) {
}
exports.Sub = Sub;
//# sourceMappingURL=main.js.map

//// [D:/Work/pkg1/dist/main.d.ts]
declare const Sub_base: import("./utils/type-helpers").MyReturnType;
export declare class Sub extends Sub_base {
    id: string;
}
export {};



Program root files: [
  "D:/Work/pkg1/src/main.ts",
  "D:/Work/pkg1/src/utils/index.ts",
  "D:/Work/pkg1/src/utils/type-helpers.ts"
]
Program options: {
  "module": 1,
  "declaration": true,
  "removeComments": true,
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "strictPropertyInitialization": false,
  "allowSyntheticDefaultImports": true,
  "target": 4,
  "sourceMap": true,
  "esModuleInterop": true,
  "outDir": "D:/Work/pkg1/dist",
  "baseUrl": "D:/Work/pkg1",
  "skipLibCheck": true,
  "strictNullChecks": false,
  "noImplicitAny": false,
  "strictBindCallApply": false,
  "forceConsistentCasingInFileNames": false,
  "noFallthroughCasesInSwitch": false,
  "moduleResolution": 2,
  "resolveJsonModule": true,
  "project": "D:/Work/pkg1",
  "explainFiles": true,
  "configFilePath": "D:/Work/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
D:/Work/pkg1/src/utils/type-helpers.ts
D:/Work/pkg1/src/utils/index.ts
D:/Work/pkg1/src/main.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
