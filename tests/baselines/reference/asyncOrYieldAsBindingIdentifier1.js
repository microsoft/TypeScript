//// [tests/cases/conformance/async/es6/functionDeclarations/asyncOrYieldAsBindingIdentifier1.ts] ////

//// [asyncOrYieldAsBindingIdentifier1.ts]
function f_let () {
    let await = 1
}

function f1_var () {
    var await = 1
}

function f1_const () {
    const await = 1
}

async function f2_let () {
    let await = 1
}

async function f2_var () {
    var await = 1
}

async function f2_const () {
    const await = 1
}

function f3_let () {
    let yield = 2
}

function f3_var () {
    var yield = 2
}

function f3_const () {
    const yield = 2
}

function * f4_let () {
    let yield = 2;
}

function * f4_var () {
    var yield = 2;
}

function * f4_const () {
    const yield = 2;
}

//// [asyncOrYieldAsBindingIdentifier1.js]
function f_let() {
    let await = 1;
}
function f1_var() {
    var await = 1;
}
function f1_const() {
    const await = 1;
}
async function f2_let() {
    let await = 1;
}
async function f2_var() {
    var await = 1;
}
async function f2_const() {
    const await = 1;
}
function f3_let() {
    let yield = 2;
}
function f3_var() {
    var yield = 2;
}
function f3_const() {
    const yield = 2;
}
function* f4_let() {
    let yield = 2;
}
function* f4_var() {
    var yield = 2;
}
function* f4_const() {
    const yield = 2;
}
