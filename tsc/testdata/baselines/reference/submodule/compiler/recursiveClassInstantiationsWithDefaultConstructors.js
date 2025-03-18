//// [tests/cases/compiler/recursiveClassInstantiationsWithDefaultConstructors.ts] ////

//// [recursiveClassInstantiationsWithDefaultConstructors.ts]
module TypeScript2 {
    export class MemberName {
        public prefix: string = "";
    }
    export class MemberNameArray extends MemberName {
    }
}

var a = new TypeScript2.MemberNameArray()

//// [recursiveClassInstantiationsWithDefaultConstructors.js]
var TypeScript2;
(function (TypeScript2) {
    class MemberName {
        prefix = "";
    }
    TypeScript2.MemberName = MemberName;
    class MemberNameArray extends MemberName {
    }
    TypeScript2.MemberNameArray = MemberNameArray;
})(TypeScript2 || (TypeScript2 = {}));
var a = new TypeScript2.MemberNameArray();
