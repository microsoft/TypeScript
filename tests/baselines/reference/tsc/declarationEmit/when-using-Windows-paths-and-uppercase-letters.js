currentDirectory:: D:\Work\pkg1 useCaseSensitiveFileNames:: false
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


//// [D:/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


D:\home\src\tslibs\TS\Lib\tsc.js -p D:\Work\pkg1 --explainFiles
Output::
[96mtsconfig.json[0m:[93m14[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m14[0m     "baseUrl": "./",
[7m  [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m21[0m:[93m25[0m - [91merror[0m[90m TS5107: [0mOption 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m21[0m     "moduleResolution": "node",
[7m  [0m [91m                        ~~~~~~[0m

../../home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
  Default library for target 'es2017'
src/utils/type-helpers.ts
  Imported via './type-helpers' from file 'src/utils/index.ts'
  Matched by include pattern 'src' in 'tsconfig.json'
src/utils/index.ts
  Imported via './utils' from file 'src/main.ts'
  Matched by include pattern 'src' in 'tsconfig.json'
src/main.ts
  Matched by include pattern 'src' in 'tsconfig.json'

Found 2 errors in the same file, starting at: tsconfig.json[90m:14[0m



//// [D:/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts] *Lib*

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



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
