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
class Module {
    members;
}
class Namespace {
    members;
}
class Class {
    parent;
}
class Property {
    parent;
}
var c;
var p;
c = p;
p = c;
