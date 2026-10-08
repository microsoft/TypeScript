//// [tests/cases/compiler/malformedDestructuringAssignmentTransformVariants.ts] ////

//// [malformedDestructuringAssignmentTransformVariants.ts]
declare function dec(...args: any[]): any;
declare const value: any;

class Base {
    static x: any;
}

@dec
class C extends Base {
    static #x: any;

    static {
        // Invalid array targets must still visit private and super accesses.
        [super.x, 0, this.#x] = value;
        [super.x, 1 + 2, this.#x] = value;
        [super.x, (() => {}), this.#x] = value;
        [super.x, value(), this.#x] = value;
        [super.x, , ...this.#x] = value;

        // Object methods/accessors are not destructuring assignment elements.
        ({ x: super.x, m() {}, private: this.#x } = value);
        ({ x: super.x, get g() { return 1; }, private: this.#x } = value);
        ({ x: super.x, set s(v) {}, private: this.#x } = value);
        ({ x: [super.x, 0, this.#x], m() {} } = value);
    }
}


//// [malformedDestructuringAssignmentTransformVariants.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Base {
    static x;
}
let C = class C extends Base {
    static #x;
    static {
        // Invalid array targets must still visit private and super accesses.
        [super.x, 0, this.#x] = value;
        [super.x, 1 + 2, this.#x] = value;
        [super.x, (() => { }), this.#x] = value;
        [super.x, value(), this.#x] = value;
        [super.x, , ...this.#x] = value;
        // Object methods/accessors are not destructuring assignment elements.
        ({ x: super.x, m() { }, private: this.#x } = value);
        ({ x: super.x, get g() { return 1; }, private: this.#x } = value);
        ({ x: super.x, set s(v) { }, private: this.#x } = value);
        ({ x: [super.x, 0, this.#x], m() { } } = value);
    }
};
C = __decorate([
    dec
], C);
