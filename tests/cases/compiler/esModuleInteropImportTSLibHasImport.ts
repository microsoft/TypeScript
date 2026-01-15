// @esModuleInterop: true
// @importHelpers: true
// @noEmitHelpers: true
// @target: es2017
// @module: commonjs
// @filename: types.d.ts
declare module "tslib" { export const __exportStar: any; export const __importDefault: any; export const __importStar: any; }
// @filename: utils/username.ts
export const username = () => 'username';
// @filename: utils/index.ts
export * from './username';
// @filename: hello.ts
const sayHello = (name?: string) => void (`Hello, ${name}!`);

export default sayHello;
// @filename: index.ts
import sayHello from "./hello";
import { username } from './utils';

sayHello(username());