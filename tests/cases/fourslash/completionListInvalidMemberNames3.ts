/// <reference path='fourslash.ts' />

// @allowjs: true

// @Filename: test.js
////interface Symbol {
////    /** Returns a string representation of an object. */
////    toString(): string;

////    /** Returns the primitive value of the specified object. */
////    valueOf(): Object;
////}

////interface SymbolConstructor {
////    /** 
////      * A reference to the prototype. 
////      */
////    readonly prototype: Symbol;

////    /**
////      * Returns a new unique Symbol value.
////      * @param  description Description of the new Symbol object.
////      */
////    (description?: string | number): symbol;

////    /**
////      * Returns a Symbol object from the global symbol registry matching the given key if found. 
////      * Otherwise, returns a new symbol with this key.
////      * @param key key to search for.
////      */
////    for(key: string): symbol;

////    /**
////      * Returns a key from the global symbol registry matching the given Symbol if found. 
////      * Otherwise, returns a undefined.
////      * @param sym Symbol to find the key for.
////      */
////    keyFor(sym: symbol): string | undefined;
////}

////declare var Symbol: SymbolConstructor;/// <reference path="lib.es2015.symbol.d.ts" />

////interface SymbolConstructor {
////    /** 
////      * A method that determines if a constructor object recognizes an object as one of the 
////      * constructor’s instances. Called by the semantics of the instanceof operator. 
////      */
////    readonly hasInstance: symbol;
////}

////interface Function {
////    /**
////     * Determines whether the given value inherits from this function if this function was used
////     * as a constructor function.
////     *
////     * A constructor function can control which objects are recognized as its instances by
////     * 'instanceof' by overriding this method.
////     */
////    [Symbol.hasInstance](value: any): boolean;
////}

////interface SomeInterface {
////    (value: number): any;
////}

////var _ : SomeInterface;
////_./**/

goTo.marker();

verify.not.completionListContains("[Symbol.hasInstance]");