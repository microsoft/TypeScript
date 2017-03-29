//// [commentsOnObjectLiteral3.ts]
var v = {
 //property
 prop: 1 /* multiple trailing comments */ /*trailing comments*/,
 //property
 func: function () {
 },
 //PropertyName + CallSignature
 func1() { },
 //getter
 get a() {
  return this.prop;
 } /*trailing 1*/,
 //setter
 set a(value) {
  this.prop = value;
 } // trailing 2
};


//// [commentsOnObjectLiteral3.js]
var v = {
    //property
    prop: 1 /* multiple trailing comments */ /*trailing comments*/,
    //property
    func: function () {
    },
    //PropertyName + CallSignature
    func1: function () { },
    //getter
    get a() {
        return this.prop;
    } /*trailing 1*/,
    //setter
    set a(value) {
        this.prop = value;
    } // trailing 2
};
