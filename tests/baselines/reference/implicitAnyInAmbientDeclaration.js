//// [tests/cases/compiler/implicitAnyInAmbientDeclaration.ts] ////

//// [implicitAnyInAmbientDeclaration.ts]
module Test {
    declare class C {
        public publicMember;  // this should be an error
        private privateMember;  // this should not be an error

        public publicFunction(x);  // this should be an error
        private privateFunction(privateParam);  // this should not be an error
        private constructor(privateParam);
    }
}

//// [implicitAnyInAmbientDeclaration.js]
var Test;
(function (Test) {
})(Test || (Test = {}));
