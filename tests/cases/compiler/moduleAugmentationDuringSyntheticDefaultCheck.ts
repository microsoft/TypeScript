// @noImplicitReferences: true
// @esModuleInterop: true
// @filename: node_modules/moment/index.d.ts
declare function moment(): moment.Moment;
declare namespace moment {
  interface Moment extends Object {
    valueOf(): number;
  }
}
export = moment;
// @filename: node_modules/moment-timezone/index.d.ts
import * as moment from 'moment';
export = moment;
declare module "moment" {
    interface Moment {
        tz(): string;
    }
}
// @filename: idx.ts
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
// @filename: idx.test.ts
/// <reference path="./idx" />

import moment = require("moment-timezone");
