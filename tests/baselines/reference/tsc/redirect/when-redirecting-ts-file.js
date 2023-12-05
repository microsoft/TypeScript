currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/copy1/node_modules/target/import.ts]
import {} from "./";

//// [/src/project/copy1/node_modules/target/index.ts]
export const a = 1;

//// [/src/project/copy1/node_modules/target/package.json]
{
  "name": "target",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/src/project/copy2/node_modules/target/import.ts]
import {} from "./";

//// [/src/project/copy2/node_modules/target/index.ts]
export const a = 1;

//// [/src/project/copy2/node_modules/target/package.json]
{
  "name": "target",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "out"
  },
  "include": [
    "copy1/node_modules/target/*",
    "copy2/node_modules/target/*"
  ]
}



Output::
/lib/tsc -p src/project
exitCode:: ExitStatus.Success


//// [/src/project/out/copy1/node_modules/target/import.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/out/copy1/node_modules/target/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


//// [/src/project/out/copy2/node_modules/target/import.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/out/copy2/node_modules/target/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;


