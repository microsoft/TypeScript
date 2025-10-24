//// [tests/cases/compiler/jsFileAlternativeUseOfOverloadTag.ts] ////

//// [jsFileAlternativeUseOfOverloadTag.js]
// These are a few examples of existing alternative uses of @overload tag.
// They will not work as expected with our implementation, but we are
// trying to make sure that our changes do not result in any crashes here.

const example1 = {
  /**
   * @overload Example1(value)
   *   Creates Example1
   *   @param value [String]
   */
  constructor: function Example1(value, options) {},
};

const example2 = {
  /**
   * Example 2
   *
   * @overload Example2(value)
   *   Creates Example2
   *   @param value [String]
   *   @param secretAccessKey [String]
   *   @param sessionToken [String]
   *   @example Creates with string value
   *     const example = new Example('');
   * @overload Example2(options)
   *   Creates Example2
   *   @option options value [String]
   *   @example Creates with options object
   *     const example = new Example2({
   *       value: '',
   *     });
   */
  constructor: function Example2() {},
};

const example3 = {
  /**
   * @overload evaluate(options = {}, [callback])
   *   Evaluate something
   *   @note Something interesting
   *   @param options [map]
   *   @return [string] returns evaluation result
   *   @return [null] returns nothing if callback provided
   *   @callback callback function (error, result)
   *     If callback is provided it will be called with evaluation result
   *     @param error [Error]
   *     @param result [String]
   *   @see callback
   */
  evaluate: function evaluate(options, callback) {},
};


//// [jsFileAlternativeUseOfOverloadTag.js]
"use strict";
// These are a few examples of existing alternative uses of @overload tag.
// They will not work as expected with our implementation, but we are
// trying to make sure that our changes do not result in any crashes here.
Object.defineProperty(exports, "__esModule", { value: true });
const example1 = {
    /**
     * @overload Example1(value)
     *   Creates Example1
     *   @param value [String]
     */
    constructor: function Example1(value, options) { },
};
const example2 = {
    /**
     * Example 2
     *
     * @overload Example2(value)
     *   Creates Example2
     *   @param value [String]
     *   @param secretAccessKey [String]
     *   @param sessionToken [String]
     *   @example Creates with string value
     *     const example = new Example('');
     * @overload Example2(options)
     *   Creates Example2
     *   @option options value [String]
     *   @example Creates with options object
     *     const example = new Example2({
     *       value: '',
     *     });
     */
    constructor: function Example2() { },
};
const example3 = {
    /**
     * @overload evaluate(options = {}, [callback])
     *   Evaluate something
     *   @note Something interesting
     *   @param options [map]
     *   @return [string] returns evaluation result
     *   @return [null] returns nothing if callback provided
     *   @callback callback function (error, result)
     *     If callback is provided it will be called with evaluation result
     *     @param error [Error]
     *     @param result [String]
     *   @see callback
     */
    evaluate: function evaluate(options, callback) { },
};


//// [jsFileAlternativeUseOfOverloadTag.d.ts]
export type callback = (error: any, result: any) ;


//// [DtsFileErrors]


dist/jsFileAlternativeUseOfOverloadTag.d.ts(1,50): error TS1005: '=>' expected.


==== dist/jsFileAlternativeUseOfOverloadTag.d.ts (1 errors) ====
    export type callback = (error: any, result: any) ;
                                                     ~
!!! error TS1005: '=>' expected.
    