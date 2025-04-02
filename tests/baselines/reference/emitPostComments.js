//// [tests/cases/compiler/emitPostComments.ts] ////

//// [emitPostComments.ts]
var y = 10;
/**
* @name Foo
* @class
*/
/**#@+
* @memberOf Foo#
* @field
*/
/**
* @name bar
* @type Object[]
*/
/**#@-*/
/**
* @name Foo2
* @class
*/
/**#@+
* @memberOf Foo2#
* @field
*/
/**
* @name bar
* @type Object[]
*/
/**#@-*/


//// [emitPostComments.js]
var y = 10;
/**
* @name Foo
* @class
*/
/**#@+
* @memberOf Foo#
* @field
*/
/**
* @name bar
* @type Object[]
*/
/**#@-*/
/**
* @name Foo2
* @class
*/
/**#@+
* @memberOf Foo2#
* @field
*/
/**
* @name bar
* @type Object[]
*/
/**#@-*/
