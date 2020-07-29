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
exports.__esModule = true;
exports.someMethod = exports.Foo = exports.foo = void 0;
/**
 * comment1
 * @param p
 */
var foo = function (p) {
    return {
        /**
         * comment2
         * @param s
         */
        bar: function (s) { },
        /**
         * comment3
         * @param s
         */
        bar2: function (s) { }
    };
};
exports.foo = foo;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    /**
     * comment4
     * @param s
     */
    Foo.prototype.bar = function (s) {
    };
    return Foo;
}());
exports.Foo = Foo;
/**
* comment5
*/
exports.someMethod = null.someMethod;


//// [declarationEmitRetainsJsdocyComments.d.ts]
/**
 * comment1
 * @param p
 */
export declare const foo: (p: string) => {
    /**
     * comment2
     * @param s
     */
    bar: (s: number) => void;
    /**
     * comment3
     * @param s
     */
    bar2(s: number): void;
};
export declare class Foo {
    /**
     * comment4
     * @param s
     */
    bar(s: number): void;
}
export declare let 
/**
* comment5
*/
someMethod: any;
declare global {
    interface ExtFunc {
        /**
        * comment6
        */
        someMethod(collection: any[]): boolean;
    }
}
