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
var t;
t.parent;
