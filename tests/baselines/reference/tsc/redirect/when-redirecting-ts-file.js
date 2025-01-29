currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "out"
  },
  "include": [
    "copy1/node_modules/target/*",
    "copy2/node_modules/target/*"
  ]
}

//// [/home/src/workspaces/project/copy1/node_modules/target/index.ts]
export const a = 1;

//// [/home/src/workspaces/project/copy1/node_modules/target/import.ts]
import {} from "./";

//// [/home/src/workspaces/project/copy1/node_modules/target/package.json]
{
  "name": "target",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/home/src/workspaces/project/copy2/node_modules/target/index.ts]
export const a = 1;

//// [/home/src/workspaces/project/copy2/node_modules/target/import.ts]
import {} from "./";

//// [/home/src/workspaces/project/copy2/node_modules/target/package.json]
{
  "name": "target",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/out/copy1/node_modules/target/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


//// [/home/src/workspaces/project/out/copy1/node_modules/target/import.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/out/copy2/node_modules/target/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


//// [/home/src/workspaces/project/out/copy2/node_modules/target/import.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



exitCode:: ExitStatus.Success
