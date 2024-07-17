// @filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "target": "ES2016",
        "importHelpers": true,
        "module": "commonjs",
    }
}

// @filename: /package1/index.ts
export {};
async function foo(): Promise<void> {}
async function bar(): Promise<void> {}

// @filename: /package1/node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

// @filename: /package1/node_modules/tslib/tslib.d.ts
/**
 * Converts a generator function into a pseudo-async function, by treating each `yield` as an `await`.
 *
 * @param thisArg The reference to use as the `this` value in the generator function
 * @param _arguments The optional arguments array
 * @param P The optional promise constructor argument, defaults to the `Promise` property of the global object.
 * @param generator The generator function
 */
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;

// @filename: /package1/node_modules/tslib/tslib.js
module.exports.__awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// @filename: /package2/index.ts
export {};
async function foo(): Promise<void> {}