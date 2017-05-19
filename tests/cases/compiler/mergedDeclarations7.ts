// @filename: passport.d.ts
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

//@filename: test.ts
import * as passport from "passport";
import { Passport } from "passport";

let p: Passport = passport.use();