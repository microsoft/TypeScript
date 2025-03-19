//// [tests/cases/compiler/declarationEmitRetainsJsdocyComments.ts] ////

//// [declarationEmitRetainsJsdocyComments.ts]
/**
 * comment1
 * @param p 
 */
export const foo = (p: string) => {
    return {
        /**
         * comment2
         * @param s 
         */
        bar: (s: number) => {},
        /**
         * comment3
         * @param s 
         */
        bar2(s: number) {},
    }
}

export class Foo {
    /**
     * comment4
     * @param s  
     */
    bar(s: number) {
    }
}

export let {
    /**
    * comment5
    */
    someMethod
} = null as any;

declare global {
    interface ExtFunc {
        /**
        * comment6
        */
        someMethod(collection: any[]): boolean;
    }
}


//// [declarationEmitRetainsJsdocyComments.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.
/**
* comment5
*/
someMethod = exports.Foo = exports.foo = void 0;
/**
 * comment1
 * @param p
 */
const foo = (p) => {
    return {
        /**
         * comment2
         * @param s
         */
        bar: (s) => { },
        /**
         * comment3
         * @param s
         */
        bar2(s) { },
    };
};
exports.foo = foo;
class Foo {
    /**
     * comment4
     * @param s
     */
    bar(s) {
    }
}
exports.Foo = Foo;
({ 
    /**
    * comment5
    */
    someMethod: exports.someMethod } = null);
