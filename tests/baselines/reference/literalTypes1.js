//// [literalTypes1.ts]
let zero: 0 = 0;
let one: 1 = 1;
let two: 2 = 2;
let oneOrTwo: 1 | 2 = <1 | 2>1;

function f1(x: 0 | 1 | 2) {
    switch (x) {
        case zero:
            x;
            break;
        case one:
            x;
            break;
        case two:
            x;
            break;
        default:
            x;
    }
}

function f2(x: 0 | 1 | 2) {
    switch (x) {
        case zero:
            x;
            break;
        case oneOrTwo:
            x;
            break;
        default:
            x;
    }
}

type Falsy = false | 0 | "" | null | undefined;

function f3(x: Falsy) {
    if (x) {
        x;
    }
    else {
        x;
    }
}

function f4(x: 0 | 1 | true | string) {
    switch (x) {
        case 0:
            x;
            break;
        case 1:
            x;
            break;
        case "abc":
        case "def":
            x;
            break;
        case null:
            x;
            break;
        case undefined:
            x;
            break;
        default:
            x;
    }
}

function f5(x: string | number | boolean) {
    switch (x) {
        case "abc":
            x;
            break;
        case 0:
        case 1:
            x;
            break;
        case true:
            x;
            break;
        case "hello":
        case 123:
            x;
            break;
        default:
            x;
    }
}

//// [literalTypes1.js]
var zero = 0;
var one = 1;
var two = 2;
var oneOrTwo = 1;
function f1(x) {
    switch (x) {
        case zero:
            x;
            break;
        case one:
            x;
            break;
        case two:
            x;
            break;
        default:
            x;
    }
}
function f2(x) {
    switch (x) {
        case zero:
            x;
            break;
        case oneOrTwo:
            x;
            break;
        default:
            x;
    }
}
function f3(x) {
    if (x) {
        x;
    }
    else {
        x;
    }
}
function f4(x) {
    switch (x) {
        case 0:
            x;
            break;
        case 1:
            x;
            break;
        case "abc":
        case "def":
            x;
            break;
        case null:
            x;
            break;
        case undefined:
            x;
            break;
        default:
            x;
    }
}
function f5(x) {
    switch (x) {
        case "abc":
            x;
            break;
        case 0:
        case 1:
            x;
            break;
        case true:
            x;
            break;
        case "hello":
        case 123:
            x;
            break;
        default:
            x;
    }
}
