//// [emitPreComments.ts]
// This is pre comment
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


//// [emitPreComments.js]
// This is pre comment
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
