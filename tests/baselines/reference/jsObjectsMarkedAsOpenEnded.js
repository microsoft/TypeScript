//// [tests/cases/conformance/salsa/jsObjectsMarkedAsOpenEnded.ts] ////

//// [a.js]
var variable = {};
variable.a = 0;

class C {
    initializedMember = {};
    constructor() {
        this.member = {};
        this.member.a = 0;
    }
}

var obj = {
    property: {}
};

obj.property.a = 0;

var arr = [{}];

function getObj() {
    return {};
}


//// [b.ts]
variable.a = 1;
(new C()).member.a = 1;
(new C()).initializedMember.a = 1;
obj.property.a = 1;
arr[0].a = 1;
getObj().a = 1;



//// [output.js]
var variable = {};
variable.a = 0;
var C = /** @class */ (function () {
    function C() {
        this.initializedMember = {};
        this.member = {};
        this.member.a = 0;
    }
    return C;
}());
var obj = {
    property: {}
};
obj.property.a = 0;
var arr = [{}];
function getObj() {
    return {};
}
variable.a = 1;
(new C()).member.a = 1;
(new C()).initializedMember.a = 1;
obj.property.a = 1;
arr[0].a = 1;
getObj().a = 1;
