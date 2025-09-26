//// [tests/cases/compiler/anonClassDeclarationEmitIsAnon.ts] ////

//// [wrapClass.ts]
export function wrapClass(param: any) {
    return class Wrapped {
        foo() {
            return param;
        }
    }
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}

//// [index.ts]
import { wrapClass, Timestamped } from "./wrapClass";

export default wrapClass(0);

// Simple class
export class User {
    name = '';
}

// User that is Timestamped
export class TimestampedUser extends Timestamped(User) {
    constructor() {
        super();
    }
}

//// [wrapClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapClass = wrapClass;
exports.Timestamped = Timestamped;
function wrapClass(param) {
    return class Wrapped {
        foo() {
            return param;
        }
    };
}
function Timestamped(Base) {
    return class extends Base {
        timestamp = Date.now();
    };
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedUser = exports.User = void 0;
const wrapClass_1 = require("./wrapClass");
exports.default = (0, wrapClass_1.wrapClass)(0);
// Simple class
class User {
    name = '';
}
exports.User = User;
// User that is Timestamped
class TimestampedUser extends (0, wrapClass_1.Timestamped)(User) {
    constructor() {
        super();
    }
}
exports.TimestampedUser = TimestampedUser;


//// [wrapClass.d.ts]
export declare function wrapClass(param: any): {
    new (): {
        foo(): any;
    };
};
export type Constructor<T = {}> = new (...args: any[]) => T;
export declare function Timestamped<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        timestamp: number;
    };
} & TBase;
//// [index.d.ts]
declare const _default: {
    new (): {
        foo(): any;
    };
};
export default _default;
export declare class User {
    name: string;
}
declare const TimestampedUser_base: {
    new (...args: any[]): {
        timestamp: number;
    };
} & typeof User;
export declare class TimestampedUser extends TimestampedUser_base {
    constructor();
}
