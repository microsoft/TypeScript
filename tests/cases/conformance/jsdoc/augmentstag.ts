// @allowJs: true
// @filename: augmentstag.js
// @out: dummy16.js
/**
 * @constructor
 */
function Foo() {
    /** First property */
    this.prop1 = true;
}

/**
 * Second property
 * @type {String}
 */
Foo.prototype.prop2 = "parent prop2";

/**
 * First parent method.
 */
Foo.prototype.method1 = function() {};

/**
 * Second parent method.
 */
Foo.prototype.method2 = function() {};

/**
 * Third parent method.
 */
Foo.prototype.method3 = function() {};

/**
 * @constructor
 * @extends Foo
 */
function Bar() {
    /** Third prop **/
    this.prop3 = true;
}

/**
 * Second child method.
 */
Bar.prototype.method2 = function() {};

/**
 * @constructor
 * @extends {Bar}
 */
function Baz() {
    /** Override prop1 */
    this.prop1 = "new";
}

/**
 * Third grandchild method.
 */
Baz.prototype.method3 = function() {};
