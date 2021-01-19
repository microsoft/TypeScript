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
var _foo, _bar, _baz, _qux, _fooMethod, _barMethod, _bazMethod, _quxMethod, _asyncMethod, _genMethod, _asyncGenMethod, _fooProp, _fooProp_1, _barProp, _barProp_1, _bazProp, _bazProp_1, _quxProp, _quxProp_1, _whatProp, _whatProp_1, _asyncProp, _asyncProp_1;
class A {
    constructor() {
        _foo.set(this, 3); // Error
        _bar.set(this, 3); // Error
        _baz.set(this, 3); // Error
        _qux.set(this, 3); // OK
    }
    () { return 3; } // Error
    () { return 3; } // Error
    () { return 3; } // Error
    () { return 3; } // Error
    () {
        return __awaiter(this, void 0, void 0, function* () { return 1; });
    } //OK
    *() { return 1; } //OK
    () { return __asyncGenerator(this, arguments, function* _a() { return yield __await(1); }); } //OK
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
_foo = new WeakMap(), _bar = new WeakMap(), _baz = new WeakMap(), _qux = new WeakMap(), _fooMethod = new WeakMap(), _barMethod = new WeakMap(), _bazMethod = new WeakMap(), _quxMethod = new WeakMap(), _asyncMethod = new WeakMap(), _genMethod = new WeakMap(), _asyncGenMethod = new WeakMap(), _fooProp = new WeakMap(), _fooProp_1 = new WeakMap(), _barProp = new WeakMap(), _barProp_1 = new WeakMap(), _bazProp = new WeakMap(), _bazProp_1 = new WeakMap(), _quxProp = new WeakMap(), _quxProp_1 = new WeakMap(), _whatProp = new WeakMap(), _whatProp_1 = new WeakMap(), _asyncProp = new WeakMap(), _asyncProp_1 = new WeakMap();
class B {
}
