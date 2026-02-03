//// [tests/cases/compiler/unionTypeWithRecursiveSubtypeReduction2.ts] ////

//// [unionTypeWithRecursiveSubtypeReduction2.ts]
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

var c: Class;
var p: Property;
c = p;
p = c;


//// [unionTypeWithRecursiveSubtypeReduction2.js]
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
var c;
var p;
c = p;
p = c;
