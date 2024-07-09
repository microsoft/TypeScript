// @declaration: true
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
