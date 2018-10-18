//// [controlFlowArrayErrors.ts]
declare function cond(): boolean;

function f1() {
    let x = [];  // Implicit any[] error in some locations
    let y = x;   // Implicit any[] error
    x.push(5);
    let z = x;
}

function f2() {
    let x;       // Implicit any[] error in some locations
    x = [];
    let y = x;   // Implicit any[] error
    x.push(5);
    let z = x;
}

function f3() {
    let x = [];  // Implicit any[] error in some locations
    x.push(5);
    function g() {
        x;       // Implicit any[] error
    }
}

function f4() {
    let x;
    x = [5, "hello"];  // Non-evolving array
    x.push(true);      // Error
}

function f5() {
    let x = [5, "hello"];  // Non-evolving array
    x.push(true);          // Error
}

function f6() {
    let x;
    if (cond()) {
        x = [];
        x.push(5);
        x.push("hello");
    }
    else {
        x = [true];  // Non-evolving array
    }
    x;           // boolean[] | (string | number)[]
    x.push(99);  // Error
}

function f7() {
    let x = [];       // x has evolving array value
    x.push(5);
    let y = x;        // y has non-evolving array value
    x.push("hello");  // Ok
    y.push("hello");  // Error
}

function f8() {
    const x = [];  // Implicit any[] error in some locations
    x.push(5);
    function g() {
        x;  // Implicit any[] error
    }
}

//// [controlFlowArrayErrors.js]
function f1() {
    var x = []; // Implicit any[] error in some locations
    var y = x; // Implicit any[] error
    x.push(5);
    var z = x;
}
function f2() {
    var x; // Implicit any[] error in some locations
    x = [];
    var y = x; // Implicit any[] error
    x.push(5);
    var z = x;
}
function f3() {
    var x = []; // Implicit any[] error in some locations
    x.push(5);
    function g() {
        x; // Implicit any[] error
    }
}
function f4() {
    var x;
    x = [5, "hello"]; // Non-evolving array
    x.push(true); // Error
}
function f5() {
    var x = [5, "hello"]; // Non-evolving array
    x.push(true); // Error
}
function f6() {
    var x;
    if (cond()) {
        x = [];
        x.push(5);
        x.push("hello");
    }
    else {
        x = [true]; // Non-evolving array
    }
    x; // boolean[] | (string | number)[]
    x.push(99); // Error
}
function f7() {
    var x = []; // x has evolving array value
    x.push(5);
    var y = x; // y has non-evolving array value
    x.push("hello"); // Ok
    y.push("hello"); // Error
}
function f8() {
    var x = []; // Implicit any[] error in some locations
    x.push(5);
    function g() {
        x; // Implicit any[] error
    }
}
