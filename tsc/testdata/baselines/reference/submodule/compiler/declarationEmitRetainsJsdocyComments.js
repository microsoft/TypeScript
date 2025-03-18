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
exports.someMethod = exports.Foo = exports.foo = void 0;
const foo = (p) => {
    return {
        bar: (s) => { },
        bar2(s) { },
    };
};
exports.foo = foo;
class Foo {
    bar(s) {
    }
}
exports.Foo = Foo;
({ someMethod: exports.someMethod } = null);
