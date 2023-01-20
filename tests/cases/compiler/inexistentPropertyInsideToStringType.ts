// @checkJs: true
// @noEmit: true
// @Filename: index.js
function SomeClass() {
}
var _proto = SomeClass.prototype;
_proto.toString = function toString() {
    this.yadda
    let someValue = "";
    this.toString = () => someValue;
    return someValue;
}