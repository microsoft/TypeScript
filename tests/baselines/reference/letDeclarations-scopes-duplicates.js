//// [letDeclarations-scopes-duplicates.ts]
// Errors: redeclaration
let var1 = 0;
let var1 = 0; // error

let var2 = 0;
const var2 = 0;

const var3 = 0;
let var3 = 0;

const var4 = 0;
const var4 = 0;

var var5 = 0;
let var5 = 0;

let var6 = 0;
var var6 = 0;

{
    let var7 = 0;
    let var7 = 0;
    {
        let var8 = 0;
        const var8 = 0;
    }
}

switch (0) {
    default:
        let var9 = 0;
        let var9 = 0;
}

try {
    const var10 = 0;
    const var10 = 0;
}
catch (e) {
    let var11 = 0;
    let var11 = 0;
}

function F1() {
    let var12;
    let var12;
}

// OK
var var20 = 0;

var var20 = 0
{
    let var20 = 0;
    {
        let var20 = 0;
    }
}

switch (0) {
    default:
        let var20 = 0;
}

try {
    let var20 = 0;
}
catch (e) {
    let var20 = 0;
}

function F() {
    let var20;
}



//// [letDeclarations-scopes-duplicates.js]
// Errors: redeclaration
let var1 = 0;
let var1 = 0; // error
let var2 = 0;
const var2 = 0;
const var3 = 0;
let var3 = 0;
const var4 = 0;
const var4 = 0;
var var5 = 0;
let var5 = 0;
let var6 = 0;
var var6 = 0;
{
    let var7 = 0;
    let var7 = 0;
    {
        let var8 = 0;
        const var8 = 0;
    }
}
switch (0) {
    default:
        let var9 = 0;
        let var9 = 0;
}
try {
    const var10 = 0;
    const var10 = 0;
}
catch (e) {
    let var11 = 0;
    let var11 = 0;
}
function F1() {
    let var12;
    let var12;
}
// OK
var var20 = 0;
var var20 = 0;
{
    let var20 = 0;
    {
        let var20 = 0;
    }
}
switch (0) {
    default:
        let var20 = 0;
}
try {
    let var20 = 0;
}
catch (e) {
    let var20 = 0;
}
function F() {
    let var20;
}
