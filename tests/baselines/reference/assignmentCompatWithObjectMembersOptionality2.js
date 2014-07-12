//// [assignmentCompatWithObjectMembersOptionality2.js]
// M is optional and S contains no property with the same name as M
// N is optional and T contains no property with the same name as N
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Derived);

var TargetHasOptional;
(function (TargetHasOptional) {
    
    var c;

    var a;
    var b = { opt: new Base() };

    

    var d;
    var e;
    var f;

    // all ok
    c = d;
    c = e;
    c = f;
    c = a;

    a = d;
    a = e;
    a = f;
    a = c;

    b = d;
    b = e;
    b = f;
    b = a;
    b = c;
})(TargetHasOptional || (TargetHasOptional = {}));

var SourceHasOptional;
(function (SourceHasOptional) {
    
    var c;

    var a;
    var b = { opt: new Base() };

    

    var d;
    var e;
    var f;

    c = d; // error
    c = e; // error
    c = f; // error
    c = a; // ok

    a = d; // error
    a = e; // error
    a = f; // error
    a = c; // ok

    b = d; // error
    b = e; // error
    b = f; // error
    b = a; // ok
    b = c; // ok
})(SourceHasOptional || (SourceHasOptional = {}));
