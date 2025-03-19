//// [tests/cases/conformance/statements/labeledStatements/labeledStatementWithLabel_es2015.ts] ////

//// [labeledStatementWithLabel_es2015.ts]
label: function fn() { }
label: function* gen() { }
label: async function gen1() { }
label: enum E {}
label: interface I {}
label: class C { }
label: var a = 1;
label: let b = 1;
label: const c = 1;

label: module M { }
label: namespace N {}
label: type T = {}


//// [labeledStatementWithLabel_es2015.js]
label: function fn() { }
label: function* gen() { }
label: async function gen1() { }
label: {
    var E;
    (function (E) {
    })(E || (E = {}));
}
label: 
label: class C {
}
label: var a = 1;
label: let b = 1;
label: const c = 1;
label: 
label: 
label: 
