//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.1.ts] ////

//// [usingDeclarations.1.ts]
using d1 = { [Symbol.dispose]() {} };

function f() {
    using d2 = { [Symbol.dispose]() {} };
}

async function af() {
    using d3 = { [Symbol.dispose]() {} };
    await null;
}

function * g() {
    using d4 = { [Symbol.dispose]() {} };
    yield;
}

async function * ag() {
    using d5 = { [Symbol.dispose]() {} };
    yield;
    await null;
}

const a = () => {
    using d6 = { [Symbol.dispose]() {} };
}

class C1 {
    a = () => {
        using d7 = { [Symbol.dispose]() {} };
    }

    constructor() {
        using d8 = { [Symbol.dispose]() {} };
    }

    static {
        using d9 = { [Symbol.dispose]() {} };
    }

    m() {
        using d10 = { [Symbol.dispose]() {} };
    }

    get x() {
        using d11 = { [Symbol.dispose]() {} };
        return 0;
    }

    set x(v) {
        using d12 = { [Symbol.dispose]() {} };
    }

    async am() {
        using d13 = { [Symbol.dispose]() {} };
        await null;
    }

    * g() {
        using d14 = { [Symbol.dispose]() {} };
        yield;
    }

    async * ag() {
        using d15 = { [Symbol.dispose]() {} };
        yield;
        await null;
    }
}

class C2 extends C1 {
    constructor() {
        using d16 = { [Symbol.dispose]() {} };
        super();
    }
}

class C3 extends C1 {
    y = 1;
    constructor() {
        using d17 = { [Symbol.dispose]() {} };
        super();
    }
}

namespace N {
    using d18 = { [Symbol.dispose]() {} };
}

{
    using d19 = { [Symbol.dispose]() {} };
}

switch (Math.random()) {
    case 0:
        using d20 = { [Symbol.dispose]() {} };
        break;

    case 1:
        using d21 = { [Symbol.dispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            using d22 = { [Symbol.dispose]() {} };
            break;
    }

try {
    using d23 = { [Symbol.dispose]() {} };
}
catch {
    using d24 = { [Symbol.dispose]() {} };
}
finally {
    using d25 = { [Symbol.dispose]() {} };
}

if (true) {
    using d26 = { [Symbol.dispose]() {} };
}
else {
    using d27 = { [Symbol.dispose]() {} };
}

while (true) {
    using d28 = { [Symbol.dispose]() {} };
    break;
}

do {
    using d29 = { [Symbol.dispose]() {} };
    break;
}
while (true);

for (;;) {
    using d30 = { [Symbol.dispose]() {} };
    break;
}

for (const x in {}) {
    using d31 = { [Symbol.dispose]() {} };
}

for (const x of []) {
    using d32 = { [Symbol.dispose]() {} };
}

export {};

//// [usingDeclarations.1.js]
using d1 = { [Symbol.dispose]() { } };
function f() {
    using d2 = { [Symbol.dispose]() { } };
}
async function af() {
    using d3 = { [Symbol.dispose]() { } };
    await null;
}
function* g() {
    using d4 = { [Symbol.dispose]() { } };
    yield;
}
async function* ag() {
    using d5 = { [Symbol.dispose]() { } };
    yield;
    await null;
}
const a = () => {
    using d6 = { [Symbol.dispose]() { } };
};
class C1 {
    a = () => {
        using d7 = { [Symbol.dispose]() { } };
    };
    constructor() {
        using d8 = { [Symbol.dispose]() { } };
    }
    static {
        using d9 = { [Symbol.dispose]() { } };
    }
    m() {
        using d10 = { [Symbol.dispose]() { } };
    }
    get x() {
        using d11 = { [Symbol.dispose]() { } };
        return 0;
    }
    set x(v) {
        using d12 = { [Symbol.dispose]() { } };
    }
    async am() {
        using d13 = { [Symbol.dispose]() { } };
        await null;
    }
    *g() {
        using d14 = { [Symbol.dispose]() { } };
        yield;
    }
    async *ag() {
        using d15 = { [Symbol.dispose]() { } };
        yield;
        await null;
    }
}
class C2 extends C1 {
    constructor() {
        using d16 = { [Symbol.dispose]() { } };
        super();
    }
}
class C3 extends C1 {
    y = 1;
    constructor() {
        using d17 = { [Symbol.dispose]() { } };
        super();
    }
}
var N;
(function (N) {
    using d18 = { [Symbol.dispose]() { } };
})(N || (N = {}));
{
    using d19 = { [Symbol.dispose]() { } };
}
switch (Math.random()) {
    case 0:
        using d20 = { [Symbol.dispose]() { } };
        break;
    case 1:
        using d21 = { [Symbol.dispose]() { } };
        break;
}
if (true)
    switch (0) {
        case 0:
            using d22 = { [Symbol.dispose]() { } };
            break;
    }
try {
    using d23 = { [Symbol.dispose]() { } };
}
catch {
    using d24 = { [Symbol.dispose]() { } };
}
finally {
    using d25 = { [Symbol.dispose]() { } };
}
if (true) {
    using d26 = { [Symbol.dispose]() { } };
}
else {
    using d27 = { [Symbol.dispose]() { } };
}
while (true) {
    using d28 = { [Symbol.dispose]() { } };
    break;
}
do {
    using d29 = { [Symbol.dispose]() { } };
    break;
} while (true);
for (;;) {
    using d30 = { [Symbol.dispose]() { } };
    break;
}
for (const x in {}) {
    using d31 = { [Symbol.dispose]() { } };
}
for (const x of []) {
    using d32 = { [Symbol.dispose]() { } };
}
export {};
