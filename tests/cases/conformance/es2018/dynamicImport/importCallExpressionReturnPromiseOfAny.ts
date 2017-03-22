// @module: commonjs
// @target: es6
// @noImplicitAny: false

declare function getSpecifier(): string;
declare var whatToLoad: boolean;
declare const directory: string;
declare const moduleFile: number;

import(`${directory}\${moduleFile}`);
import(getSpecifier());
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});

let j: string;
var p3 = import(j=getSpecifier());

function * loadModule(directories: string[]) {
    for (const directory of directories) {
        const path = `${directory}\moduleFile`;
        import(yield path);
    }
}
