// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: inferringClassMembersFromAssignments5.js
function Foonly() {
    var self = this
    self.x = 1
    // self.m = function() {
      //   console.log(self.x)
    // }
}
const foo = new Foonly()
foo.x
foo.m()
//class Base {
    //m() {
        //this.p = 1
    //}
//}
//class Derived extends Base {
    //constructor() {
        //super();
        //// should be OK, and p should have type number from this assignment
        //this.p = 1
    //}
    //test() {
        //return this.p
    //}
//}
