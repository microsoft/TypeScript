//// [tests/cases/compiler/declarationEmitMethodDeclaration.ts] ////

//// [a.js]
export default {
    methods: {
        foo() { }
    }
}




//// [a.d.ts]
declare namespace _default {
    namespace methods {
        function foo(): void;
    }
}
export default _default;
