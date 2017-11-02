//// [tests/cases/compiler/mergedDeclarations7.ts] ////

//// [passport.d.ts]
declare module 'passport' {
    namespace passport {
        interface Passport {
            use(): this;
        }

        interface PassportStatic extends Passport {
            Passport: {new(): Passport};
        }
    }

    const passport: passport.PassportStatic;
    export = passport;
}

//// [test.ts]
import * as passport from "passport";
import { Passport } from "passport";

let p: Passport = passport.use();

//// [test.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var passport = __importStar(require("passport"));
var p = passport.use();
