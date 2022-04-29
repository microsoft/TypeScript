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
