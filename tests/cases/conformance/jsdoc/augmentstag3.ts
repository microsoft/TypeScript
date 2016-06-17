// @allowJs: true
// @filename: augmentstag3.js
// @out: dummy18.js
// test to see that we can @augment multiple things (code allows for it)
/** @class */
function Foo() {
}
/** A method. */
Foo.prototype.method1 = function () {};

/** @class */
function Bar() {
}
/** Another method. */
Bar.prototype.method2 = function () {}

/** @class
 * @augments Foo
 * @augments Bar */
function FooBar() {
}
