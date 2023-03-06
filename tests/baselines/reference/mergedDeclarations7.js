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
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var p = passport.use();
