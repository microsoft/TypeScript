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
Promise.resolve().then(() => require(getSpecifier()));
var p0 = Promise.resolve().then(() => require(`${directory}\\${moduleFile}`));
var p1 = Promise.resolve().then(() => require(getSpecifier()));
const p2 = Promise.resolve().then(() => require(whatToLoad ? getSpecifier() : "defaulPath"));
function returnDynamicLoad(path) {
    return Promise.resolve().then(() => require(path));
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
