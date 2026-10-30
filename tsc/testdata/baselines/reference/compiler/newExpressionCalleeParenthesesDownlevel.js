//// [tests/cases/compiler/newExpressionCalleeParenthesesDownlevel.ts] ////

//// [newExpressionCalleeParenthesesDownlevel.ts]
class Plugins {
    static Linker = class {};
}

class A {
    #plugins = Plugins;
    static #staticPlugins = Plugins;

    m() {
        new this.#plugins.Linker();
        new this.#plugins["Linker"]();
        new A.#staticPlugins.Linker();
    }
}

class B {
    static Plugins = Plugins;
}

class C extends B {
    static async m(key: "Plugins") {
        new super[key].Linker();
    }
}


//// [newExpressionCalleeParenthesesDownlevel.js]
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_plugins, _A_staticPlugins;
class Plugins {
}
Plugins.Linker = class {
};
class A {
    constructor() {
        _A_plugins.set(this, Plugins);
    }
    m() {
        new (__classPrivateFieldGet(this, _A_plugins, "f").Linker)();
        new (__classPrivateFieldGet(this, _A_plugins, "f")["Linker"])();
        new (__classPrivateFieldGet(_a, _a, "f", _A_staticPlugins).Linker)();
    }
}
_a = A, _A_plugins = new WeakMap();
_A_staticPlugins = { value: Plugins };
class B {
}
B.Plugins = Plugins;
class C extends B {
    static m(key) {
        const _superIndex = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            new (_superIndex(key).Linker)();
        });
    }
}
