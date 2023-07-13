//// [tests/cases/compiler/letDeclarations-scopes.ts] ////

//// [letDeclarations-scopes.ts]
// global
let l = "string";

var n: number;

// Control flow statements with blocks
if (true) {
    let l = 0;
    n = l;
}
else {
    let l = 0;
    n = l;
}

while (true) {
    let l = 0;
    n = l;
}

do {
   let l = 0;
    n = l;
} while (true);

var obj;
with (obj) {
    let l = 0;
    n = l;
}

for (var i = 0; i < 10; i++) {
    let l = 0;
    n = l;
}

for (var i2 in {}) {
    let l = 0;
    n = l;
}

if (true) {
    label: let l = 0;
    n = l;
}

while (false) {
    label2: label3: label4: let l = 0;
    n = l;
}

for (let l = 0; n = l; l++) {
    let l = true;
    var b3: boolean = l;
}

for (let l in {}) {

}

// Try/catch/finally
try {
    let l = 0;
    n = l;
}
catch (e) {
    let l = 0;
    n = l;
}
finally {
    let l = 0;
    n = l;
}

// Switch
switch (0) {
    case 0:
        let l = 0;
        n = l;
        break;
}

// blocks
{
    let l = 0;
    n = l;
    {
        let l = false;
        var b: boolean = l;
    }
}

// functions
function F() {
    let l = 0;
    n = l;
}

var F2 = () => {
    let l = 0;
    n = l;
};

var F3 = function () {
    let l = 0;
    n = l;
};

// modules
module m {
    let l = 0;
    n = l;

    {
       let l = false;
       var b2: boolean = l;
    }

    lable: let l2 = 0;
}

// methods
class C {
    constructor() {
        let l = 0;
        n = l;
    }

    method() {
        let l = 0;
        n = l;
    }

    get v() {
        let l = 0;
        n = l;
        return n;
    }

    set v(value) {
        let l = 0;
        n = l;
    }
}

// object literals
var o = {
    f() {
        let l = 0;
        n = l;
    },
    f2: () => {
        let l = 0;
        n = l;
    }
}

//// [letDeclarations-scopes.js]
// global
let l = "string";
var n;
// Control flow statements with blocks
if (true) {
    let l = 0;
    n = l;
}
else {
    let l = 0;
    n = l;
}
while (true) {
    let l = 0;
    n = l;
}
do {
    let l = 0;
    n = l;
} while (true);
var obj;
with (obj) {
    let l = 0;
    n = l;
}
for (var i = 0; i < 10; i++) {
    let l = 0;
    n = l;
}
for (var i2 in {}) {
    let l = 0;
    n = l;
}
if (true) {
    label: let l = 0;
    n = l;
}
while (false) {
    label2: label3: label4: let l = 0;
    n = l;
}
for (let l = 0; n = l; l++) {
    let l = true;
    var b3 = l;
}
for (let l in {}) {
}
// Try/catch/finally
try {
    let l = 0;
    n = l;
}
catch (e) {
    let l = 0;
    n = l;
}
finally {
    let l = 0;
    n = l;
}
// Switch
switch (0) {
    case 0:
        let l = 0;
        n = l;
        break;
}
// blocks
{
    let l = 0;
    n = l;
    {
        let l = false;
        var b = l;
    }
}
// functions
function F() {
    let l = 0;
    n = l;
}
var F2 = () => {
    let l = 0;
    n = l;
};
var F3 = function () {
    let l = 0;
    n = l;
};
// modules
var m;
(function (m) {
    let l = 0;
    n = l;
    {
        let l = false;
        var b2 = l;
    }
    lable: let l2 = 0;
})(m || (m = {}));
// methods
class C {
    constructor() {
        let l = 0;
        n = l;
    }
    method() {
        let l = 0;
        n = l;
    }
    get v() {
        let l = 0;
        n = l;
        return n;
    }
    set v(value) {
        let l = 0;
        n = l;
    }
}
// object literals
var o = {
    f() {
        let l = 0;
        n = l;
    },
    f2: () => {
        let l = 0;
        n = l;
    }
};
