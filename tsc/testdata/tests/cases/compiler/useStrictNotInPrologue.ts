function afterStatement() {
    console.log("not strict");
    "use strict";
}

function afterDirectiveAndStatement() {
    "use client";
    console.log("not strict");
    "use strict";
}

function validDirective() {
    "use client";
    "use strict";
    console.log("strict");
}

const arrow = () => {
    console.log("not strict");
    "use strict";
};

function* generator() {
    yield;
    "use strict";
}

class C {
    method() {
        console.log("not strict");
        "use strict";
    }
}

function nestedBlock() {
    if (true) {
        "use strict";
    }
}

function afterTypeOnlyStatement() {
    interface I {}
    "use strict";
}
