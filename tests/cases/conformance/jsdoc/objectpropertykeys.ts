// @allowJs: true
// @filename: objectpropertykeys.js
// @out: dummy133.js
Call(
{
  methodA: function()
  {
    this.id = this.createUUID();
  },

  valueOf: function()
  {
    return this.id;
  },

  toString: function()
  {
      return this.id;
  }
});

//Simple inheritance model with correct constructor
function Test() {}
function Test2() { Test.call(this); }
Test2.prototype = Object.create(Test.prototype, {constructor: {value: Test2}});