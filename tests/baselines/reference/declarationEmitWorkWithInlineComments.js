//// [declarationEmitWorkWithInlineComments.ts]
export class Foo {
  constructor(
    /** @internal */
    public isInternal1: string,
    /** @internal */ public isInternal2: string, /** @internal */
    public isInternal3: string,
    // @internal
    public isInternal4: string,
    // @internal
    /** @internal */
    public isInternal5: string,
    /* @internal */ public isInternal6: string, /** @internal */
    // next line
    public notInternal1: string,
    // @internal
    /* next line */
    public notInternal2: string
  ) { }
}


//// [declarationEmitWorkWithInlineComments.js]
"use strict";
exports.__esModule = true;
var Foo = /** @class */ (function () {
    function Foo(
    /** @internal */
    isInternal1, 
    /** @internal */ isInternal2, /** @internal */ isInternal3, 
    // @internal
    isInternal4, 
    // @internal
    /** @internal */
    isInternal5, 
    /* @internal */ isInternal6, /** @internal */ 
    // next line
    notInternal1, 
    // @internal
    /* next line */
    notInternal2) {
        this.isInternal1 = isInternal1;
        this.isInternal2 = isInternal2;
        this.isInternal3 = isInternal3;
        this.isInternal4 = isInternal4;
        this.isInternal5 = isInternal5;
        this.isInternal6 = isInternal6;
        this.notInternal1 = notInternal1;
        this.notInternal2 = notInternal2;
    }
    return Foo;
}());
exports.Foo = Foo;


//// [declarationEmitWorkWithInlineComments.d.ts]
export declare class Foo {
    notInternal1: string;
    notInternal2: string;
    constructor(
    /** @internal */
    isInternal1: string, 
    /** @internal */ isInternal2: string, /** @internal */ isInternal3: string, isInternal4: string, 
    /** @internal */
    isInternal5: string, isInternal6: string, /** @internal */ notInternal1: string, notInternal2: string);
}
