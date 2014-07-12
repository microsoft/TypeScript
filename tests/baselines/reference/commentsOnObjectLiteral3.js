//// [commentsOnObjectLiteral3.ts]

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


//// [commentsOnObjectLiteral3.js]
var v = {
    //property
    prop: 1,
    //property
    func: function () {
    },
    //PropertyName + CallSignature
    func1: function () {
    },
    //getter
    get a() {
        return this.prop;
    },
    //setter
    set a(value) {
        this.prop = value;
    }
};
