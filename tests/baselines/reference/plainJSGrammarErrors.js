//// [tests/cases/conformance/salsa/plainJSGrammarErrors.ts] ////

//// [plainJSGrammarErrors.js]
class C {
    // #private mistakes
    q = #unbound
    m() {
        #p
        if (#po in this) {
        }
    }
    #m() {
         this.#m = () => {}
    }
    // await in static block
    static {
        for await (const x of [1,2,3]) {
            console.log(x)
        }
        return null
    }
    // modifier mistakes
    static constructor() { }
    async constructor() { }
    const x = 1
    const y() {
        return 12
    }
    async async extremelyAsync() {
    }
    async static oorder(){ }
    export cantExportProperty = 1
    export cantExportMethod() {
    }

    // accessor mistakes
    get incorporeal();
    get parametric(n) { return 1 }
    set invariant() { }
    set binary(fst, snd) { }
    set variable(...n) { }

    // other
    "constructor" = 16
}
class {
    missingName = true
}
class Doubler extends C extends C { }
class Trebler extends C,C,C { }
// #private mistakes
#unrelated
junk.#m
new C().#m

// modifier mistakes
export export var extremelyExported = 10
export static var staticExport = 1
function staticParam(static x = 1) { return x }
async export function oorder(x = 1) { return x }
function cantExportParam(export x = 1) { return x }
function cantAsyncParam(async x = 1) { return x }
async async function extremelyAsync() {}
async class CantAsyncClass {
    async cantAsyncPropert = 1
}
async const cantAsyncConst = 2
async import 'assert'
async export { CantAsyncClass }
export import 'fs'
export export { C }
function nestedExports() {
    export { staticParam }
    import 'fs'
    export default 12
}
function outerStaticFunction() { 
    static function staticFunction() { }
}
const noStaticLiteralMethods = {
    static m() {
    }
}

// rest parameters
function restMustBeLast(...x, y) {
}
function restCantHaveInitialiser(...x = [1,2,3]) {
}
function restCantHaveTrailingComma (...x,) {
}
;({ ...{} } = {})
const doom = { e: 1, m: 1, name: "knee-deep" }
const { ...rest, e: episode, m: mission } = doom
const { e: eep, m: em, ...rest: noRestAllowed } = doom
const { e: erp, m: erm, ...noInitialiser = true } = doom

// left-over parsing
var;
var x = 1 || 2 ?? 3
var x = 2 ?? 3 || 4
const arr = x
  => x + 1
var a = [1,2]
a?.`length`;
const o = {
    [console.log('oh no'),2]: 'hi',
    #noPrivate: 3,
    export cantExportProperties: 4,
    // TODO: See what the existing JS error is like for these
    cantHaveQuestionMark?: 1,
    m?() { return 12 },
    definitely!,
    definiteMethod!() { return 13 },
}
const noAssignment = {
    assignment = 1,
}
var noTrailingComma = 1,;
class MissingExtends extends { }

// let/const mistakes
const { e: ee };
const noInit;
let let = 15;
if (true)
    let onlyBlockLet = 17;
if (true)
    const onlyBlockConst = 18;

// loop mistakes
let async
export const l = [1,2,3]
for (async of l) {
    console.log(x)
}
for (const cantHaveInit = 1 of [1,2,3]) {
    console.log(cantHaveInit)
}
for (const cantHaveInit = 1 in [1,2,3]) {
    console.log(cantHaveInit)
}
for (let y, x of [1,2,3]) {
    console.log(x)
}
for (let y, x in [1,2,3]) {
    console.log(x)
}

// duplication mistakes
var b
switch (b) {
    case false:
        console.log('no')
    default:
        console.log('yes')
    default:
        console.log('wat')
}
try {
    throw 2
}
catch (e) {
    const e = 1
    console.log(e)
}
try {
    throw 20
}
catch (e = 0) {
}
label: for (const x in [1,2,3]) {
    label: for (const y in [1,2,3]) {
        break label;
    }
}

// labels
function crossFunctionBoundary() {
    outer: for(;;) {
        function test() {
            break outer
        }
        test()
    }
}
function continueIterationOnly(x) {
    outer: switch (x) {
        case 1:
            continue outer
    }
}
function jumpToLabelOnly(x) {
    break jumpToLabelOnly
}
for (;;) {
    break toplevel
    continue toplevel
}
break
continue

// other weirdness
export let noMeta = import.metal
function foo() { new.targe }
const nullaryDynamicImport = import()
const trinaryDynamicImport = import('1', '2', '3')
const spreadDynamicImport = import(...[])

return


//// [plainJSGrammarErrors.js]
class C {
    // #private mistakes
    q = #unbound;
    m() {
        #p;
        if (#po in this) {
        }
    }
    #m() {
        this.#m = () => { };
    }
    // await in static block
    static {
        for await (const x of [1, 2, 3]) {
            console.log(x);
        }
        return null;
    }
    // modifier mistakes
    constructor() { }
    constructor() { }
    x = 1;
    y() {
        return 12;
    }
    async async extremelyAsync() {
    }
    async static oorder() { }
    export cantExportProperty = 1;
    export cantExportMethod() {
    }
    // accessor mistakes
    get incorporeal() { }
    get parametric(n) { return 1; }
    set invariant() { }
    set binary(fst, snd) { }
    set variable(...n) { }
    // other
    "constructor" = 16;
}
class {
    missingName = true;
}
class Doubler extends C extends C {
}
class Trebler extends C, C, C {
}
// #private mistakes
#unrelated;
junk.#m;
new C().#m;
// modifier mistakes
export export var extremelyExported = 10;
export static var staticExport = 1;
function staticParam(static x = 1) { return x; }
async export function oorder(x = 1) { return x; }
function cantExportParam(export x = 1) { return x; }
function cantAsyncParam(async x = 1) { return x; }
async async function extremelyAsync() { }
async class CantAsyncClass {
    async cantAsyncPropert = 1;
}
async const cantAsyncConst = 2;
async import 'assert';
export { CantAsyncClass };
export import 'fs';
export { C };
function nestedExports() {
    export { staticParam };
    import 'fs';
    export default 12;
}
function outerStaticFunction() {
    static function staticFunction() { }
}
const noStaticLiteralMethods = {
    static m() {
    }
};
// rest parameters
function restMustBeLast(...x, y) {
}
function restCantHaveInitialiser(...x = [1, 2, 3]) {
}
function restCantHaveTrailingComma(...x) {
}
;
({ ...{} } = {});
const doom = { e: 1, m: 1, name: "knee-deep" };
const { ...rest, e: episode, m: mission } = doom;
const { e: eep, m: em, ...rest: noRestAllowed } = doom;
const { e: erp, m: erm, ...noInitialiser = true } = doom;
// left-over parsing
var ;
var x = 1 || 2 ?? 3;
var x = 2 ?? 3 || 4;
const arr = x => x + 1;
var a = [1, 2];
a `length`;
const o = {
    [console.log('oh no'), 2]: 'hi',
    #noPrivate: 3,
    cantExportProperties: 4,
    // TODO: See what the existing JS error is like for these
    cantHaveQuestionMark: 1,
    m() { return 12; },
    definitely,
    definiteMethod() { return 13; },
};
const noAssignment = {
    assignment = 1,
};
var noTrailingComma = 1;
class MissingExtends extends  {
}
// let/const mistakes
const { e: ee };
const noInit;
let let = 15;
if (true)
    let onlyBlockLet = 17;
if (true)
    const onlyBlockConst = 18;
// loop mistakes
let async;
export const l = [1, 2, 3];
for (async of l) {
    console.log(x);
}
for (const cantHaveInit = 1 of [1, 2, 3]) {
    console.log(cantHaveInit);
}
for (const cantHaveInit = 1 in [1, 2, 3]) {
    console.log(cantHaveInit);
}
for (let y, x of [1, 2, 3]) {
    console.log(x);
}
for (let y, x in [1, 2, 3]) {
    console.log(x);
}
// duplication mistakes
var b;
switch (b) {
    case false:
        console.log('no');
    default:
        console.log('yes');
    default:
        console.log('wat');
}
try {
    throw 2;
}
catch (e) {
    const e = 1;
    console.log(e);
}
try {
    throw 20;
}
catch (e = 0) {
}
label: for (const x in [1, 2, 3]) {
    label: for (const y in [1, 2, 3]) {
        break label;
    }
}
// labels
function crossFunctionBoundary() {
    outer: for (;;) {
        function test() {
            break outer;
        }
        test();
    }
}
function continueIterationOnly(x) {
    outer: switch (x) {
        case 1:
            continue outer;
    }
}
function jumpToLabelOnly(x) {
    break jumpToLabelOnly;
}
for (;;) {
    break toplevel;
    continue toplevel;
}
break;
continue;
// other weirdness
export let noMeta = import.metal;
function foo() { new.targe; }
const nullaryDynamicImport = import();
const trinaryDynamicImport = import('1', '2', '3');
const spreadDynamicImport = import(...[]);
return;
