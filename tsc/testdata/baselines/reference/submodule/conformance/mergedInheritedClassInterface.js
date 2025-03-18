//// [tests/cases/conformance/classes/classDeclarations/mergedInheritedClassInterface.ts] ////

//// [mergedInheritedClassInterface.ts]
interface BaseInterface {
    required: number;
    optional?: number;
}

class BaseClass {
    baseMethod() { }
    baseNumber: number;
}

interface Child extends BaseInterface {
    additional: number;
}

class Child extends BaseClass {
    classNumber: number;
    method() { }
}

interface ChildNoBaseClass extends BaseInterface {
    additional2: string;
}
class ChildNoBaseClass {
    classString: string;
    method2() { }
}
class Grandchild extends ChildNoBaseClass {
}

// checks if properties actually were merged
var child : Child;
child.required;
child.optional;
child.additional;
child.baseNumber;
child.classNumber;
child.baseMethod();
child.method();

var grandchild: Grandchild;
grandchild.required;
grandchild.optional;
grandchild.additional2;
grandchild.classString;
grandchild.method2();


//// [mergedInheritedClassInterface.js]
class BaseClass {
    baseMethod() { }
    baseNumber;
}
class Child extends BaseClass {
    classNumber;
    method() { }
}
class ChildNoBaseClass {
    classString;
    method2() { }
}
class Grandchild extends ChildNoBaseClass {
}
var child;
child.required;
child.optional;
child.additional;
child.baseNumber;
child.classNumber;
child.baseMethod();
child.method();
var grandchild;
grandchild.required;
grandchild.optional;
grandchild.additional2;
grandchild.classString;
grandchild.method2();
