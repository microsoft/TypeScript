// @comments: true

var v = {
 //property
 prop: 1,
 //property
 func: function () {
 },
 //PropertyName + CallSignature
 func1() { },
 //getter
 get a() {
  return this.prop;
 },
 //setter
 set a(value) {
  this.prop = value;
 }
};
