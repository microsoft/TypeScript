// @target: es5
// @module: commonjs
// @experimentaldecorators: true

// @Filename: 0.ts
export class base { }
export function foo(target: Object, propertyKey: string | symbol, parameterIndex: number) { }

// @Filename: 2.ts
import {base} from "./0"
import {foo} from "./0"

/* Comment on the Class Declaration */
export class C  extends base{
    constructor(@foo prop: any) {
        super();
    }
}