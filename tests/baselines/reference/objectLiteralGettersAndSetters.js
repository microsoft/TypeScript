//// [tests/cases/conformance/expressions/objectLiterals/objectLiteralGettersAndSetters.ts] ////

//// [objectLiteralGettersAndSetters.ts]
// Get and set accessor with the same name
var sameName1a = { get 'a'() { return ''; }, set a(n) { var p = n; var p: string; } };
var sameName2a = { get 0.0() { return ''; }, set 0(n) { var p = n; var p: string; } };
var sameName3a = { get 0x20() { return ''; }, set 3.2e1(n) { var p = n; var p: string; } };
var sameName4a = { get ''() { return ''; }, set ""(n) { var p = n; var p: string; } };
var sameName5a = { get '\t'() { return ''; }, set '\t'(n) { var p = n; var p: string; } };
var sameName6a = { get 'a'() { return ''; }, set a(n) { var p = n; var p: string; } };

// PropertyName CallSignature{FunctionBody} is equivalent to PropertyName:function CallSignature{FunctionBody}
var callSig1 = { num(n: number) { return '' } };
var callSig1: { num: (n: number) => string; };
var callSig2 = { num: function (n: number) { return '' } };
var callSig2: { num: (n: number) => string; };
var callSig3 = { num: (n: number) => '' };
var callSig3: { num: (n: number) => string; };

// Get accessor only, type of the property is the annotated return type of the get accessor
var getter1 = { get x(): string { return undefined; } };
var getter1: { readonly x: string; }

// Get accessor only, type of the property is the inferred return type of the get accessor
var getter2 = { get x() { return ''; } };
var getter2: { readonly x: string; }

// Set accessor only, type of the property is the param type of the set accessor
var setter1 = { set x(n: number) { } };
var setter1: { x: number };

// Set accessor only, type of the property is Any for an unannotated set accessor
var setter2 = { set x(n) { } };
var setter2: { x: any };

var anyVar: any;
// Get and set accessor with matching type annotations
var sameType1 = { get x(): string { return undefined; }, set x(n: string) { } };
var sameType2 = { get x(): Array<number> { return undefined; }, set x(n: number[]) { } };
var sameType3 = { get x(): any { return undefined; }, set x(n: typeof anyVar) { } };
var sameType4 = { get x(): Date { return undefined; }, set x(n: Date) { } };

// Type of unannotated get accessor return type is the type annotation of the set accessor param
var setParamType1 = {
    set n(x: (t: string) => void) { },
    get n() { return (t) => {
            var p: string;
            var p = t;
        }
    }
};
var setParamType2 = {
    get n() { return (t) => {
            var p: string;
            var p = t;
        }
    },
    set n(x: (t: string) => void) { }
};

// Type of unannotated set accessor parameter is the return type annotation of the get accessor
var getParamType1 = {
    set n(x) {
        var y = x;
        var y: string;
    },
    get n() { return ''; }
};
var getParamType2 = {
    get n() { return ''; },
    set n(x) {
        var y = x;
        var y: string;
    }
};

// Type of unannotated accessors is the inferred return type of the get accessor
var getParamType3 = {
    get n() { return ''; },
    set n(x) {
        var y = x;
        var y: string;
    }
};



//// [objectLiteralGettersAndSetters.js]
// Get and set accessor with the same name
var sameName1a = { get 'a'() { return ''; }, set a(n) { var p = n; var p; } };
var sameName2a = { get 0.0() { return ''; }, set 0(n) { var p = n; var p; } };
var sameName3a = { get 0x20() { return ''; }, set 3.2e1(n) { var p = n; var p; } };
var sameName4a = { get ''() { return ''; }, set ""(n) { var p = n; var p; } };
var sameName5a = { get '\t'() { return ''; }, set '\t'(n) { var p = n; var p; } };
var sameName6a = { get 'a'() { return ''; }, set a(n) { var p = n; var p; } };
// PropertyName CallSignature{FunctionBody} is equivalent to PropertyName:function CallSignature{FunctionBody}
var callSig1 = { num: function (n) { return ''; } };
var callSig1;
var callSig2 = { num: function (n) { return ''; } };
var callSig2;
var callSig3 = { num: function (n) { return ''; } };
var callSig3;
// Get accessor only, type of the property is the annotated return type of the get accessor
var getter1 = { get x() { return undefined; } };
var getter1;
// Get accessor only, type of the property is the inferred return type of the get accessor
var getter2 = { get x() { return ''; } };
var getter2;
// Set accessor only, type of the property is the param type of the set accessor
var setter1 = { set x(n) { } };
var setter1;
// Set accessor only, type of the property is Any for an unannotated set accessor
var setter2 = { set x(n) { } };
var setter2;
var anyVar;
// Get and set accessor with matching type annotations
var sameType1 = { get x() { return undefined; }, set x(n) { } };
var sameType2 = { get x() { return undefined; }, set x(n) { } };
var sameType3 = { get x() { return undefined; }, set x(n) { } };
var sameType4 = { get x() { return undefined; }, set x(n) { } };
// Type of unannotated get accessor return type is the type annotation of the set accessor param
var setParamType1 = {
    set n(x) { },
    get n() {
        return function (t) {
            var p;
            var p = t;
        };
    }
};
var setParamType2 = {
    get n() {
        return function (t) {
            var p;
            var p = t;
        };
    },
    set n(x) { }
};
// Type of unannotated set accessor parameter is the return type annotation of the get accessor
var getParamType1 = {
    set n(x) {
        var y = x;
        var y;
    },
    get n() { return ''; }
};
var getParamType2 = {
    get n() { return ''; },
    set n(x) {
        var y = x;
        var y;
    }
};
// Type of unannotated accessors is the inferred return type of the get accessor
var getParamType3 = {
    get n() { return ''; },
    set n(x) {
        var y = x;
        var y;
    }
};
