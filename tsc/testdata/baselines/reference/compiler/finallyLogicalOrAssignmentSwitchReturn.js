//// [tests/cases/compiler/finallyLogicalOrAssignmentSwitchReturn.ts] ////

//// [finallyLogicalOrAssignmentSwitchReturn.ts]
let y = false
function test1(x: boolean): number {
    try {
        switch (x) {
            case true: return 1
            case false: return 0
        }
    } finally { y ||= true }
}

let z = false
function test2(x: boolean): number {
    try {
        switch (x) {
            case true: return 1
            case false: return 0
        }
        return 0
    } finally { z ||= true }
}


//// [finallyLogicalOrAssignmentSwitchReturn.js]
"use strict";
let y = false;
function test1(x) {
    try {
        switch (x) {
            case true: return 1;
            case false: return 0;
        }
    }
    finally {
        y ||= true;
    }
}
let z = false;
function test2(x) {
    try {
        switch (x) {
            case true: return 1;
            case false: return 0;
        }
        return 0;
    }
    finally {
        z ||= true;
    }
}
