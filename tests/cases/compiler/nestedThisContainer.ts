// @noImplicitThis:true

type Foo = any;

const foo: Foo = {};

foo.bar = function () {
    const self: Foo = this;
};

foo.zab = (function () {
    const self: Foo = this;
});
