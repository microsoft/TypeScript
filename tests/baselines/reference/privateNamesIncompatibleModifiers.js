//// [privateNamesIncompatibleModifiers.ts]
class A {
    public #foo = 3;         // Error
    private #bar = 3;        // Error
    protected #baz = 3;      // Error
    readonly #qux = 3;       // OK
    declare #what: number;   // Error

    public #fooMethod() { return  3; }         // Error
    private #barMethod() { return  3; }        // Error
    protected #bazMethod() { return  3; }      // Error
    readonly #quxMethod() { return  3; }       // Error
    declare #whatMethod()                      // Error
    async #asyncMethod() { return 1; }         //OK
    *#genMethod() { return 1; }                //OK
    async *#asyncGenMethod() { return 1; }     //OK

    public get #fooProp() { return  3; }         // Error
    public set #fooProp(value: number) {  }      // Error
    private get #barProp() { return  3; }        // Error
    private set #barProp(value: number) {  }     // Error
    protected get #bazProp() { return  3; }      // Error
    protected set #bazProp(value: number) {  }   // Error
    readonly get #quxProp() { return  3; }       // Error
    readonly set #quxProp(value: number) {  }    // Error
    declare get #whatProp()                      // Error
    declare set #whatProp(value: number)         // Error
    async get #asyncProp() { return 1; }         // Error
    async set #asyncProp(value: number) { }      // Error
}

abstract class B {
    abstract #quux = 3;      // Error
}


//// [privateNamesIncompatibleModifiers.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var _A_foo, _A_bar, _A_baz, _A_qux, _A_fooMethod, _A_barMethod, _A_bazMethod, _A_quxMethod, _A_asyncMethod, _A_genMethod, _A_asyncGenMethod, _A_fooProp, _A_fooProp_1, _A_barProp, _A_barProp_1, _A_bazProp, _A_bazProp_1, _A_quxProp, _A_quxProp_1, _A_whatProp, _A_whatProp_1, _A_asyncProp, _A_asyncProp_1, _A_instances;
class A {
    constructor() {
        _A_instances.add(this);
        _A_foo.set(this, 3); // Error
        _A_bar.set(this, 3); // Error
        _A_baz.set(this, 3); // Error
        _A_qux.set(this, 3); // OK
    }
    get () { return 3; } // Error
    set (value) { } // Error
    get () { return 3; } // Error
    set (value) { } // Error
    get () { return 3; } // Error
    set (value) { } // Error
    get () { return 3; } // Error
    set (value) { } // Error
    get () { } // Error
    set (value) { } // Error
    get () { return 1; } // Error
    set (value) { } // Error
}
_A_foo = new WeakMap(), _A_bar = new WeakMap(), _A_baz = new WeakMap(), _A_qux = new WeakMap(), _A_instances = new WeakSet(), _A_fooMethod = function _A_fooMethod() { return 3; }, _A_barMethod = function _A_barMethod() { return 3; }, _A_bazMethod = function _A_bazMethod() { return 3; }, _A_quxMethod = function _A_quxMethod() { return 3; }, _A_asyncMethod = function _A_asyncMethod() {
    return __awaiter(this, void 0, void 0, function* () { return 1; });
}, _A_genMethod = function* _A_genMethod() { return 1; }, _A_asyncGenMethod = function _A_asyncGenMethod() { return __asyncGenerator(this, arguments, function* _A_asyncGenMethod_1() { return yield __await(1); }); };
class B {
}
