//// [tests/cases/compiler/esModuleInteropImportTSLibHasImport.ts] ////

//// [types.d.ts]
declare module "tslib" { export const __exportStar: any; export const __importDefault: any; export const __importStar: any; }
//// [username.ts]
export const username = () => 'username';
//// [index.ts]
export * from './username';
//// [hello.ts]
const sayHello = (name?: string) => void (`Hello, ${name}!`);

export default sayHello;
//// [index.ts]
import sayHello from "./hello";
import { username } from './utils';

sayHello(username());

//// [username.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.username = void 0;
const username = () => 'username';
exports.username = username;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./username"), exports);
//// [hello.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sayHello = (name) => void (`Hello, ${name}!`);
exports.default = sayHello;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hello_1 = (0, tslib_1.__importDefault)(require("./hello"));
const utils_1 = require("./utils");
(0, hello_1.default)((0, utils_1.username)());
