//// [tests/cases/compiler/narrowingOfDottedNames.ts] ////

//// [narrowingOfDottedNames.ts]
// Repro from #8383

class A {
    prop!: { a: string; };
}

class B {
    prop!: { b: string; }
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isB(x: any): x is B {
    return x instanceof B;
}

function f1(x: A | B) {
    while (true) {
        if (x instanceof A) {
            x.prop.a;
        }
        else if (x instanceof B) {
            x.prop.b;
        }
    }
}

function f2(x: A | B) {
    while (true) {
        if (isA(x)) {
            x.prop.a;
        }
        else if (isB(x)) {
            x.prop.b;
        }
    }
}

// Repro from #28100

class Foo1
{
    x: number;  // Error
    constructor() {
        if (this instanceof Boolean) {
        }
    }
}

class Foo2
{
    x: number;  // Error
    constructor() {
    }
}

// Repro from  #29513

class AInfo {
    a_count: number = 1;
}

class BInfo {
    b_count: number = 1;
}

class Base {
    id: number = 0;
}

class A2 extends Base {
    info!: AInfo;
}

class B2 extends Base {
    info!: BInfo;
}

let target: Base = null as any;

while (target) {
    if (target instanceof A2) {
        target.info.a_count = 3;
    }
    else if (target instanceof B2) {
        const j: BInfo = target.info;
    }
}


//// [narrowingOfDottedNames.js]
// Repro from #8383
class A {
    prop;
}
class B {
    prop;
}
function isA(x) {
    return x instanceof A;
}
function isB(x) {
    return x instanceof B;
}
function f1(x) {
    while (true) {
        if (x instanceof A) {
            x.prop.a;
        }
        else if (x instanceof B) {
            x.prop.b;
        }
    }
}
function f2(x) {
    while (true) {
        if (isA(x)) {
            x.prop.a;
        }
        else if (isB(x)) {
            x.prop.b;
        }
    }
}
// Repro from #28100
class Foo1 {
    x; // Error
    constructor() {
        if (this instanceof Boolean) {
        }
    }
}
class Foo2 {
    x; // Error
    constructor() {
    }
}
// Repro from  #29513
class AInfo {
    a_count = 1;
}
class BInfo {
    b_count = 1;
}
class Base {
    id = 0;
}
class A2 extends Base {
    info;
}
class B2 extends Base {
    info;
}
let target = null;
while (target) {
    if (target instanceof A2) {
        target.info.a_count = 3;
    }
    else if (target instanceof B2) {
        const j = target.info;
    }
}
