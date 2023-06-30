//// [tests/cases/compiler/contextualSignatureInObjectFreeze.ts] ////

//// [contextualSignatureInObjectFreeze.ts]
// #49101

Object.freeze({
    f: function () { }
})


//// [contextualSignatureInObjectFreeze.js]
// #49101
Object.freeze({
    f: function () { }
});
