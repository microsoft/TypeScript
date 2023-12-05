//// [tests/cases/compiler/constDeclarations-scopes.ts] ////

//// [constDeclarations-scopes.ts]
// global
const c = "string";

var n: number;

// Control flow statements with blocks
if (true) { 
    const c = 0;
    n = c;
}
else { 
    const c = 0;
    n = c;
}

while (true) { 
    const c = 0;
    n = c;
}

do { 
   const c = 0;
    n = c;
} while (true);

var obj;
with (obj) {
    const c = 0;
    n = c;
}

for (var i = 0; i < 10; i++) {
    const c = 0;
    n = c;
}

for (var i2 in {}) {
    const c = 0;
    n = c;
}

if (true) {
    label: const c = 0;
    n = c;
}

while (false) {
    label2: label3: label4: const c = 0;
    n = c;
}

// Try/catch/finally
try {
    const c = 0;
    n = c;
}
catch (e) {
    const c = 0;
    n = c;
}
finally {
    const c = 0;
    n = c;
}

// Switch
switch (0) {
    case 0:
        const c = 0;
        n = c;
        break;
}

// blocks
{
    const c = 0;
    n = c;
    {
        const c = false;
        var b: boolean = c;
    }
}

// functions

function F() {
    const c = 0;
    n = c;
}

var F2 = () => {
    const c = 0;
    n = c;
};

var F3 = function () {
    const c = 0;
    n = c;
};

// modules
module m {
    const c = 0;
    n = c;

    {
       const c = false;
       var b2: boolean = c;
    }
}

// methods
class C {
    constructor() {
        const c = 0;
        n = c;
    }

    method() {
        const c = 0;
        n = c;
    }

    get v() {
        const c = 0;
        n = c;
        return n;
    }

    set v(value) {
        const c = 0;
        n = c;
    }
}

// object literals
var o = {
    f() {
        const c = 0;
        n = c;
    },
    f2: () => {
        const c = 0;
        n = c;
    }
}

//// [constDeclarations-scopes.js]
// global
const c = "string";
var n;
// Control flow statements with blocks
if (true) {
    const c = 0;
    n = c;
}
else {
    const c = 0;
    n = c;
}
while (true) {
    const c = 0;
    n = c;
}
do {
    const c = 0;
    n = c;
} while (true);
var obj;
with (obj) {
    const c = 0;
    n = c;
}
for (var i = 0; i < 10; i++) {
    const c = 0;
    n = c;
}
for (var i2 in {}) {
    const c = 0;
    n = c;
}
if (true) {
    label: const c = 0;
    n = c;
}
while (false) {
    label2: label3: label4: const c = 0;
    n = c;
}
// Try/catch/finally
try {
    const c = 0;
    n = c;
}
catch (e) {
    const c = 0;
    n = c;
}
finally {
    const c = 0;
    n = c;
}
// Switch
switch (0) {
    case 0:
        const c = 0;
        n = c;
        break;
}
// blocks
{
    const c = 0;
    n = c;
    {
        const c = false;
        var b = c;
    }
}
// functions
function F() {
    const c = 0;
    n = c;
}
var F2 = () => {
    const c = 0;
    n = c;
};
var F3 = function () {
    const c = 0;
    n = c;
};
// modules
var m;
(function (m) {
    const c = 0;
    n = c;
    {
        const c = false;
        var b2 = c;
    }
})(m || (m = {}));
// methods
class C {
    constructor() {
        const c = 0;
        n = c;
    }
    method() {
        const c = 0;
        n = c;
    }
    get v() {
        const c = 0;
        n = c;
        return n;
    }
    set v(value) {
        const c = 0;
        n = c;
    }
}
// object literals
var o = {
    f() {
        const c = 0;
        n = c;
    },
    f2: () => {
        const c = 0;
        n = c;
    }
};
