//// [tests/cases/conformance/classes/members/privateNames/privateNamesIncompatibleModifiersJs.ts] ////

//// [privateNamesIncompatibleModifiersJs.js]
class A {
    /**
     * @public
     */
    #a = 1;

    /**
     * @private
     */
    #b = 1;

    /**
     * @protected
     */
    #c = 1;

    /**
     * @public
     */
    #aMethod() { return 1; }

    /**
     * @private
     */
    #bMethod() { return 1; }

    /**
     * @protected
     */
    #cMethod() { return 1; }

    /**
     * @public
     */
    get #aProp() { return 1; }
    /**
     * @public
     */
    set #aProp(value) { }

    /**
     * @private
     */
    get #bProp() { return 1; }
    /**
     * @private
     */
    set #bProp(value) { }

    /**
    * @protected
    */
    get #cProp() { return 1; }
    /**
     * @protected
     */
    set #cProp(value) { }
}


//// [privateNamesIncompatibleModifiersJs.js]
"use strict";
var _A_instances, _A_a, _A_b, _A_c, _A_aMethod, _A_bMethod, _A_cMethod, _A_aProp_get, _A_aProp_set, _A_bProp_get, _A_bProp_set, _A_cProp_get, _A_cProp_set;
class A {
    constructor() {
        _A_instances.add(this);
        /**
         * @public
         */
        _A_a.set(this, 1);
        /**
         * @private
         */
        _A_b.set(this, 1);
        /**
         * @protected
         */
        _A_c.set(this, 1);
    }
}
_A_a = new WeakMap(), _A_b = new WeakMap(), _A_c = new WeakMap(), _A_instances = new WeakSet(), _A_aMethod = function _A_aMethod() { return 1; }, _A_bMethod = function _A_bMethod() { return 1; }, _A_cMethod = function _A_cMethod() { return 1; }, _A_aProp_get = function _A_aProp_get() { return 1; }, _A_aProp_set = function _A_aProp_set(value) { }, _A_bProp_get = function _A_bProp_get() { return 1; }, _A_bProp_set = function _A_bProp_set(value) { }, _A_cProp_get = function _A_cProp_get() { return 1; }, _A_cProp_set = function _A_cProp_set(value) { };
