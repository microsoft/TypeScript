// @target: es6
// @module: commonjs
// @importHelpers: true
// @noTypesAndSymbols: true

// @filename: /privateIdentifierPropertyAccessDestructuringAssignmentES6.ts

class Example {
    #state = { value: 0 };

    update(source: { value: { value: number } }) {
        ({ value: this.#state } = source);
    }
}

new Example().update({ value: { value: 1 } });

export {};

// @filename: /node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

// @filename: /node_modules/tslib/tslib.d.ts
export declare function __classPrivateFieldGet(a: any, b: any, c: any, d: any): any;

// @filename: /node_modules/tslib/tslib.js
module.exports.__classPrivateFieldGet = function (receiver, state, kind, f) {
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};