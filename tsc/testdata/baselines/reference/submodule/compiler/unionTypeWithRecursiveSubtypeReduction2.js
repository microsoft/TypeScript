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

declare var c: Class;
declare var p: Property;
c = p;
p = c;


//// [unionTypeWithRecursiveSubtypeReduction2.js]
"use strict";
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
c = p;
p = c;
