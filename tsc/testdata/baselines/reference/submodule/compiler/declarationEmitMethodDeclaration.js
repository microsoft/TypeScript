//// [tests/cases/compiler/declarationEmitMethodDeclaration.ts] ////

//// [a.js]
export default {
    methods: {
        foo() { }
    }
}




//// [a.d.ts]
declare const _default: {
    methods: {
        foo(): void;
    };
};
export default _default;
