//// [tests/cases/compiler/moduleResolutionWithExtensions_jsonOverwrite2.ts] ////

//// [hello.locstring.json]
{ "hello": "Hello World" }

//// [hello.locstring.json.d.ts]
declare const _default: {
    hello: number;
};
export default _default;

//// [types.d.ts]
type ResourceId = string & { __ResourceId: void };
declare module "*.locstring.json" {
    const value: { [key: string]: ResourceId };
    export default value;
}

//// [a.ts]
import strings from './hello.locstring.json';

strings.hello;


//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var hello_locstring_json_1 = __importDefault(require("./hello.locstring.json"));
hello_locstring_json_1["default"].hello;
