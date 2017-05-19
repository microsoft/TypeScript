// @allowUnusedLabels: true
// @allowUnreachableCode: true

// @target: ES6


// Control flow statements with blocks
if (true) { 
    let l1 = 0;
}
else { 
    let l2 = 0;
}

while (true) { 
    let l3 = 0;
}

do { 
    let l4 = 0;
} while (true);

var obj;
with (obj) {
    let l5 = 0;
}

for (var i = 0; i < 10; i++) {
    let l6 = 0;
}

for (var i2 in {}) {
    let l7 = 0;
}

if (true) {
    label: let l8 = 0;
}

while (false) {
    label2: label3: label4: let l9 = 0;
}

// Try/catch/finally
try {
    let l10 = 0;
}
catch (e) {
    let l11 = 0;
}
finally {
    let l12 = 0;
}

// Switch
switch (0) {
    case 0:
        let l13 = 0;
        break;
    default:
        let l14 = 0;
        break;
}

// blocks
{
    let l15 = 0;
    {
        let l16 = 0
        label17: let l17 = 0;
    }
}

// global
let l18 = 0;

// functions
function F() {
    let l19 = 0;
}

var F2 = () => {
    let l20 = 0;
};

var F3 = function () {
    let l21 = 0;
};

// modules
module m {
    let l22 = 0;

    {
          let l23 = 0;
    }
}

// methods
class C {
    constructor() {
        let l24 = 0;
    }

    method() {
        let l25 = 0;
    }

    get v() {
        let l26 = 0;
        return l26; 
    }

    set v(value) {
        let l27 = value;
    }
}

// object literals
var o = {
    f() {
        let l28 = 0;
    },
    f2: () => {
        let l29 = 0;
    }
}

// labels
label: let l30 = 0;
{
    label2: let l31 = 0;
}

function f3() {
    label: let l32 = 0;
    {
        label2: let l33 = 0;
    }
}

module m3 {
    label: let l34 = 0;
    {
        label2: let l35 = 0;
    }
}