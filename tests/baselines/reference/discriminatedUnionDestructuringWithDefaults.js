//// [tests/cases/compiler/discriminatedUnionDestructuringWithDefaults.ts] ////

//// [discriminatedUnionDestructuringWithDefaults.ts]
// Case 1: the issue #50139 repro — must compile clean after the fix
function repro({ isText = false, children = 0 }:
    { isText: true; children?: string }
  | { isText: false; children?: number }
) {
    if (isText === true) {
        let data: string = children;
    } else if (isText === false) {
        let data: number = children;
    }
}

// Case 2: control — no defaults, already worked, must not regress
function control({ isText, children }:
    { isText: true; children: string }
  | { isText: false; children: number }
) {
    if (isText === true) {
        let data: string = children;
    } else if (isText === false) {
        let data: number = children;
    }
}

// Case 3: whzx5byb's soundness check — default foreign to one arm must still error
function soundnessCheck({ isText = false, children = true }: // expect error on `children = true`
    { isText: true; children?: string }
  | { isText: false; children?: number }
) {
    if (isText === true) {
        let data: string = children;
    }
}


//// [discriminatedUnionDestructuringWithDefaults.js]
"use strict";
// Case 1: the issue #50139 repro — must compile clean after the fix
function repro({ isText = false, children = 0 }) {
    if (isText === true) {
        let data = children;
    }
    else if (isText === false) {
        let data = children;
    }
}
// Case 2: control — no defaults, already worked, must not regress
function control({ isText, children }) {
    if (isText === true) {
        let data = children;
    }
    else if (isText === false) {
        let data = children;
    }
}
// Case 3: whzx5byb's soundness check — default foreign to one arm must still error
function soundnessCheck({ isText = false, children = true }) {
    if (isText === true) {
        let data = children;
    }
}
