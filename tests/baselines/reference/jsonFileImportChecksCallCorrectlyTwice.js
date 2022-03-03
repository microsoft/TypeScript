//// [tests/cases/compiler/jsonFileImportChecksCallCorrectlyTwice.ts] ////

//// [index.ts]
import data from "./data.json";

interface Foo {
  str: string;
}

fn(data.foo);
fn(data.foo); // <-- shouldn't error!

function fn(arg: Foo[]) { }
//// [data.json]
{
    "foo": [
      {
        "bool": true,
        "str": "123"
      }
    ]
}

//// [data.json]
{
    "foo": [
        {
            "bool": true,
            "str": "123"
        }
    ]
}
//// [index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var data_json_1 = __importDefault(require("./data.json"));
fn(data_json_1["default"].foo);
fn(data_json_1["default"].foo); // <-- shouldn't error!
function fn(arg) { }
