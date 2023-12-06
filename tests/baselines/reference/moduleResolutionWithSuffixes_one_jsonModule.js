//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_jsonModule.ts] ////

//// [foo.ios.json]
{
	"ios": "platform ios"
}
//// [foo.json]
{
	"base": "platform base"
}

//// [index.ts]
import foo from "./foo.json";
console.log(foo.ios);

//// [/bin/foo.ios.json]
{
    "ios": "platform ios"
}
//// [/bin/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var foo_json_1 = __importDefault(require("./foo.json"));
console.log(foo_json_1.default.ios);
