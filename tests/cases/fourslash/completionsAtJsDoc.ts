/// <reference path="fourslash.ts" />

////interface Foo<T> { }
/////**
//// * @type {Foo<{/**/}>}
//// */

verify.completions({ marker: "", exact: [], isNewIdentifierLocation: true });
