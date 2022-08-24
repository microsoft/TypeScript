//// [tests/cases/conformance/pragma/noFallthroughCasesInSwitch/noFallthroughCasesInSwitchPragma1.ts] ////

//// [file1.ts]
// @ts-noFallthroughCasesInSwitch
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

//// [file2.ts]
// @ts-noFallthroughCasesInSwitch true
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

//// [file3.ts]
// @ts-noFallthroughCasesInSwitch false
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

//// [file4.ts]
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noFallthroughCasesInSwitch
function f1(thing) {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}
exports.f1 = f1;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noFallthroughCasesInSwitch true
function f1(thing) {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}
exports.f1 = f1;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noFallthroughCasesInSwitch false
function f1(thing) {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}
exports.f1 = f1;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
function f1(thing) {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}
exports.f1 = f1;
