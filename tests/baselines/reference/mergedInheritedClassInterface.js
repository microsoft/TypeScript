//// [mergedInheritedClassInterface.ts]
interface BaseInterface {
    required: number;
    optional?: number;
}

declare class BaseClass {
    baseMethod();
    x2: number;
}

interface Child extends BaseInterface {
    x3: number;
}

declare class Child extends BaseClass {
    x4: number;
    method();
}

// checks if properties actually were merged
var child : Child;
child.required;
child.optional;
child.x3;
child.x4;
child.baseMethod();
child.method();


//// [mergedInheritedClassInterface.js]
// checks if properties actually were merged
var child;
child.required;
child.optional;
child.x3;
child.x4;
child.baseMethod();
child.method();
