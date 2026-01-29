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
/**
 * comment1
 * @param p
 */
export const foo = (p) => {
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
export class Foo {
    /**
     * comment4
     * @param s
     */
    bar(s) {
    }
}
export let { 
/**
* comment5
*/
someMethod } = null;


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
