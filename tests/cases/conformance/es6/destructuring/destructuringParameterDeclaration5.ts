// Parameter Declaration with generic

interface F { }
class Class implements F {
    constructor() { }
}

class SubClass extends Class {
    foo: boolean;
    constructor() { super(); }
}

class D implements F {
    foo: boolean
    constructor() { }
}

class SubD extends D {
    bar: number
    constructor() {
        super();
    }
}


function d0<T extends Class>({x} = { x: new Class() }) { }
function d1<T extends F>({x}: { x: F }) { }
function d2<T extends Class>({x}: { x: Class }) { }
function d3<T extends D>({y}: { y: D }) { }
function d4<T extends D>({y} = { y: new D() }) { }

var obj = new Class();
d0({ x: 1 });
d0({ x: {} });
d0({ x: "string" });

d1({ x: new Class() });
d1({ x: {} });
d1({ x: "string" });

d2({ x: new SubClass() });
d2({ x: {} });

d3({ y: new SubD() });
d3({ y: new SubClass() });
// Error
d3({ y: new Class() });
d3({});
d3({ y: 1 });
d3({ y: "world" });