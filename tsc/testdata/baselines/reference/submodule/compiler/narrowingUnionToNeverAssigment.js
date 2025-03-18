//// [tests/cases/compiler/narrowingUnionToNeverAssigment.ts] ////

//// [narrowingUnionToNeverAssigment.ts]
type Variants = "a" | "b" | "c" | "d";


function fx1(x: Variants) {
    if (x === "a" || x === "b") {        
    }
    else {
        const y: never = x;
    }
}


//// [narrowingUnionToNeverAssigment.js]
function fx1(x) {
    if (x === "a" || x === "b") {
    }
    else {
        const y = x;
    }
}
