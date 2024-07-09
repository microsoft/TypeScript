//// [tests/cases/compiler/unionTypeWithRecursiveSubtypeReduction1.ts] ////

//// [unionTypeWithRecursiveSubtypeReduction1.ts]
class Module {
    public members: Class[];
}

class Namespace {
    public members: (Class | Property)[];
}

class Class {
    public parent: Namespace;
}

class Property {
    public parent: Module | Class;
}

var t: Class | Property;
t.parent;


//// [unionTypeWithRecursiveSubtypeReduction1.js]
var Module = /** @class */ (function () {
    function Module() {
    }
    return Module;
}());
var Namespace = /** @class */ (function () {
    function Namespace() {
    }
    return Namespace;
}());
var Class = /** @class */ (function () {
    function Class() {
    }
    return Class;
}());
var Property = /** @class */ (function () {
    function Property() {
    }
    return Property;
}());
var t;
t.parent;
