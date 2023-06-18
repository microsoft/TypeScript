//// [tests/cases/compiler/nestedThisContainer.ts] ////

//// [nestedThisContainer.ts]
type Foo = any;

const foo: Foo = {};

foo.bar = function () {
    const self: Foo = this;
};

foo.zab = (function () {
    const self: Foo = this;
});


//// [nestedThisContainer.js]
var foo = {};
foo.bar = function () {
    var self = this;
};
foo.zab = (function () {
    var self = this;
});
