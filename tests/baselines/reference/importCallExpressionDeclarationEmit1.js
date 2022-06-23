//// [importCallExpressionDeclarationEmit1.ts]
declare function getSpecifier(): string;
declare var whatToLoad: boolean;
declare const directory: string;
declare const moduleFile: number;

import(getSpecifier());

var p0 = import(`${directory}\\${moduleFile}`);
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")

function returnDynamicLoad(path: string) {
    return import(path);
}

//// [importCallExpressionDeclarationEmit1.js]
Promise.resolve(getSpecifier()).then(c => require(c));
var p0 = Promise.resolve(`${directory}\\${moduleFile}`).then(c => require(c));
var p1 = Promise.resolve(getSpecifier()).then(c => require(c));
const p2 = Promise.resolve(whatToLoad ? getSpecifier() : "defaulPath").then(c => require(c));
function returnDynamicLoad(path) {
    return Promise.resolve(path).then(c => require(c));
}


//// [importCallExpressionDeclarationEmit1.d.ts]
declare function getSpecifier(): string;
declare var whatToLoad: boolean;
declare const directory: string;
declare const moduleFile: number;
declare var p0: Promise<any>;
declare var p1: Promise<any>;
declare const p2: Promise<any>;
declare function returnDynamicLoad(path: string): Promise<any>;
