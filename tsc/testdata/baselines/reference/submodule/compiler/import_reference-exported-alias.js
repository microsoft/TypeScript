//// [tests/cases/compiler/import_reference-exported-alias.ts] ////

//// [file1.ts]
module App {
    export module Services {
        export class UserServices {
            public getUserName(): string {
                return "Bill Gates";
            }
        }
    }
}

import Mod = App;
export = Mod;

//// [file2.ts]
import appJs = require("file1");
import Services = appJs.Services;
import UserServices = Services.UserServices;
var x = new UserServices().getUserName();


//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appJs = require("file1");
var x = new UserServices().getUserName();
