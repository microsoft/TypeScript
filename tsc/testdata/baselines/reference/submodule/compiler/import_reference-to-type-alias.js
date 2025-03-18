//// [tests/cases/compiler/import_reference-to-type-alias.ts] ////

//// [file1.ts]
export module App {
    export module Services {
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
var x = new Services.UserServices().getUserName();
