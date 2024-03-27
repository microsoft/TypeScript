//// [tests/cases/compiler/stripInternal2.ts] ////

//// [stripInternal2.ts]
export class Foo {
  /**
   * Should be stripped
   * @internal
   */
  shouldBeStripped = 1;

  // TODO: maybe make this @internal?
  /**
   * Should *not* be stripped
   */
  shouldNotBeStripped = 2;
}

//// [stripInternal2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
        /**
         * Should be stripped
         * @internal
         */
        this.shouldBeStripped = 1;
        // TODO: maybe make this @internal?
        /**
         * Should *not* be stripped
         */
        this.shouldNotBeStripped = 2;
    }
    return Foo;
}());
exports.Foo = Foo;


//// [stripInternal2.d.ts]
export declare class Foo {
    /**
     * Should *not* be stripped
     */
    shouldNotBeStripped: number;
}
