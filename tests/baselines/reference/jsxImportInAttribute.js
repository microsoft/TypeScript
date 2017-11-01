//// [tests/cases/compiler/jsxImportInAttribute.tsx] ////

//// [component.d.ts]
declare module "Test" {
	export default class Text { }
}

//// [consumer.tsx]
/// <reference path="component.d.ts" />
import Test from 'Test';

let x = Test; // emit test_1.default
<anything attr={Test} />; // ?


//// [consumer.jsx]
"use strict";
function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
exports.__esModule = true;
/// <reference path="component.d.ts" />
var Test_1 = __importDefault(require("Test"));
var x = Test_1["default"]; // emit test_1.default
<anything attr={Test_1["default"]}/>; // ?
