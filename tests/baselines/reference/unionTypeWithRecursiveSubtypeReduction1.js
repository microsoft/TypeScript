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
var Module = (function () {
    function Module() {
    }
    return Module;
}());
var Namespace = (function () {
    function Namespace() {
    }
    return Namespace;
}());
var Class = (function () {
    function Class() {
    }
    return Class;
}());
var Property = (function () {
    function Property() {
    }
    return Property;
}());
var t;
t.parent;
