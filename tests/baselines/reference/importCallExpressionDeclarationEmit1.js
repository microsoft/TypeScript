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
var _a, _b, _c, _d;
_a = getSpecifier(), Promise.resolve().then(() => require(_a));
var p0 = (_b = `${directory}\\${moduleFile}`, Promise.resolve().then(() => require(_b)));
var p1 = (_c = getSpecifier(), Promise.resolve().then(() => require(_c)));
const p2 = (_d = whatToLoad ? getSpecifier() : "defaulPath", Promise.resolve().then(() => require(_d)));
function returnDynamicLoad(path) {
    var _a;
    return _a = path, Promise.resolve().then(() => require(_a));
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
