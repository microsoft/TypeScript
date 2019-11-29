// @declaration: true
// @filename: wrapClass.ts
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

// @filename: index.ts
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