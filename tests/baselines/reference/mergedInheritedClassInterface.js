//// [mergedInheritedClassInterface.ts]
interface BaseInterface {
    required: number;
    optional?: number;
}

declare class BaseClass {
    baseMethod();
    baseNumber: number;
}

interface Child extends BaseInterface {
    additional: number;
}

declare class Child extends BaseClass {
    classNumber: number;
    method();
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


//// [mergedInheritedClassInterface.js]
// checks if properties actually were merged
var child;
child.required;
child.optional;
child.additional;
child.baseNumber;
child.classNumber;
child.baseMethod();
child.method();
