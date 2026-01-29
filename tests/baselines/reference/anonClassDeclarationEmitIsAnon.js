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
export function wrapClass(param) {
    return class Wrapped {
        foo() {
            return param;
        }
    };
}
export function Timestamped(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.timestamp = Date.now();
        }
    };
}
//// [index.js]
import { wrapClass, Timestamped } from "./wrapClass";
export default wrapClass(0);
// Simple class
export class User {
    constructor() {
        this.name = '';
    }
}
// User that is Timestamped
export class TimestampedUser extends Timestamped(User) {
    constructor() {
        super();
    }
}


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
