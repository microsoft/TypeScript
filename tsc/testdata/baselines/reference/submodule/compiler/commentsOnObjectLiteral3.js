//// [tests/cases/compiler/commentsOnObjectLiteral3.ts] ////

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
    prop: 1,
    func: function () {
    },
    func1() { },
    get a() {
        return this.prop;
    },
    set a(value) {
        this.prop = value;
    }
};
