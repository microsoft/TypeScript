// @allowJs: true
// @filename: exportstag4.js
// @out: dummy61.js
define(
   /** @exports some/module */
   function () {
       /** @class */
       function myClass() {}

       /** Some method */
       myClass.prototype.myMethod = function () {};

       return new myClass();
   }
);