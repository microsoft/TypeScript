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
}
class Namespace {
}
class Class {
}
class Property {
}
var c;
var p;
c = p;
p = c;
