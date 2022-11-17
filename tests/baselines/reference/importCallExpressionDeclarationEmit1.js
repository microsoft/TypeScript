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
(_a => Promise.resolve().then(() => require(_a)))(getSpecifier());
var p0 = (_b => Promise.resolve().then(() => require(_b)))(`${directory}\\${moduleFile}`);
var p1 = (_c => Promise.resolve().then(() => require(_c)))(getSpecifier());
const p2 = (_d => Promise.resolve().then(() => require(_d)))(whatToLoad ? getSpecifier() : "defaulPath");
function returnDynamicLoad(path) {
    return (_a => Promise.resolve().then(() => require(_a)))(path);
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
