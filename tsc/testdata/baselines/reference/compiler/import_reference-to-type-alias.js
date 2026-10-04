//// [tests/cases/compiler/import_reference-to-type-alias.ts] ////

//// [file1.ts]
export namespace App {
    export namespace Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

//// [file2.ts]
import appJs = require("file1");
import Services = appJs.App.Services;
var x = new Services.UserServices().getUserName();


//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appJs = require("file1");
var Services = appJs.App.Services;
var x = new Services.UserServices().getUserName();
