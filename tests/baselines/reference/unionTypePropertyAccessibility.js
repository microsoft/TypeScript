//// [tests/cases/conformance/types/union/unionTypePropertyAccessibility.ts] ////

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

declare var v1: Default;
declare var v2: Public;
declare var v3: Protected;
declare var v4: Private;
declare var v5: Default | Public;
declare var v6: Default | Protected;
declare var v7: Default | Private;
declare var v8: Public | Protected;
declare var v9: Public | Private;
declare var v10: Protected | Private;
declare var v11: Default | Public | Protected;
declare var v12: Default | Public | Private;
declare var v13: Default | Protected | Private;
declare var v14: Public | Private | Protected;
declare var v15: Default | Public | Private | Protected;

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
