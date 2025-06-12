//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.ts] ////

//// [ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.ts]
// all expected to be errors

class clodule1<T>{

    id: string;
    value: T;
}

module clodule1 {
    function f(x: T) { }
}

class clodule2<T>{

    id: string;
    value: T;
}

module clodule2 {
    var x: T;

    class D<U extends T>{
        id: string;
        value: U;
    }
}

class clodule3<T>{

    id: string;
    value: T;
}

module clodule3 {
    export var y = { id: T };
}

class clodule4<T>{

    id: string;
    value: T;
}

module clodule4 {
    class D {
        name: T;
    }
}


//// [ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.js]
// all expected to be errors
class clodule1 {
}
(function (clodule1) {
    function f(x) { }
})(clodule1 || (clodule1 = {}));
class clodule2 {
}
(function (clodule2) {
    var x;
    class D {
    }
})(clodule2 || (clodule2 = {}));
class clodule3 {
}
(function (clodule3) {
    clodule3.y = { id: T };
})(clodule3 || (clodule3 = {}));
class clodule4 {
}
(function (clodule4) {
    class D {
    }
})(clodule4 || (clodule4 = {}));
