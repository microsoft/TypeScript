//// [tests/cases/compiler/moduleAugmentationDuringSyntheticDefaultCheck.ts] ////

//// [index.d.ts]
declare function moment(): moment.Moment;
declare namespace moment {
  interface Moment extends Object {
    valueOf(): number;
  }
}
export = moment;
//// [index.d.ts]
import * as moment from 'moment';
export = moment;
declare module "moment" {
    interface Moment {
        tz(): string;
    }
}
//// [idx.ts]
import * as _moment from "moment";
declare module "moment" {
    interface Moment {
        strftime(pattern: string): string;
    }
}
declare module "moment-timezone" {
    interface Moment {
        strftime(pattern: string): string;
    }
}
//// [idx.test.ts]
/// <reference path="./idx" />

import moment = require("moment-timezone");


//// [idx.js]
"use strict";
exports.__esModule = true;
//// [idx.test.js]
"use strict";
/// <reference path="./idx" />
exports.__esModule = true;
