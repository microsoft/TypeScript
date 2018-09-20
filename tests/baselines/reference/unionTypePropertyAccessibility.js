//// [unionTypePropertyAccessibility.ts]
class Default {
    member: string;
}

class Public {
    public member: string;
}

class Protected {
    protected member: string;
}

class Private {
    private member: number;
}

var v1: Default;
var v2: Public;
var v3: Protected;
var v4: Private;
var v5: Default | Public;
var v6: Default | Protected;
var v7: Default | Private;
var v8: Public | Protected;
var v9: Public | Private;
var v10: Protected | Private;
var v11: Default | Public | Protected;
var v12: Default | Public | Private;
var v13: Default | Protected | Private;
var v14: Public | Private | Protected;
var v15: Default | Public | Private | Protected;

v1.member;
v2.member;
v3.member;
v4.member;
v5.member;
v6.member;
v7.member;
v8.member;
v9.member;
v10.member;
v11.member;
v12.member;
v13.member;
v14.member;
v15.member;


//// [unionTypePropertyAccessibility.js]
var Default = /** @class */ (function () {
    function Default() {
    }
    return Default;
}());
var Public = /** @class */ (function () {
    function Public() {
    }
    return Public;
}());
var Protected = /** @class */ (function () {
    function Protected() {
    }
    return Protected;
}());
var Private = /** @class */ (function () {
    function Private() {
    }
    return Private;
}());
var v1;
var v2;
var v3;
var v4;
var v5;
var v6;
var v7;
var v8;
var v9;
var v10;
var v11;
var v12;
var v13;
var v14;
var v15;
v1.member;
v2.member;
v3.member;
v4.member;
v5.member;
v6.member;
v7.member;
v8.member;
v9.member;
v10.member;
v11.member;
v12.member;
v13.member;
v14.member;
v15.member;
