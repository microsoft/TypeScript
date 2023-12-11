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



/// [Declarations] ////



//// [objectLiteralGettersAndSetters.d.ts]
declare var sameName1a: invalid;
declare var sameName2a: invalid;
declare var sameName3a: invalid;
declare var sameName4a: invalid;
declare var sameName5a: invalid;
declare var sameName6a: invalid;
declare var callSig1: invalid;
declare var callSig1: {
    num: (n: number) => string;
};
declare var callSig2: invalid;
declare var callSig2: {
    num: (n: number) => string;
};
declare var callSig3: invalid;
declare var callSig3: {
    num: (n: number) => string;
};
declare var getter1: {
    readonly x: string;
};
declare var getter1: {
    readonly x: string;
};
declare var getter2: invalid;
declare var getter2: {
    readonly x: string;
};
declare var setter1: {
    x: number;
};
declare var setter1: {
    x: number;
};
declare var setter2: invalid;
declare var setter2: {
    x: any;
};
declare var anyVar: any;
declare var sameType1: {
    x: string;
};
declare var sameType2: {
    x: number[];
};
declare var sameType3: {
    x: any;
};
declare var sameType4: {
    x: Date;
};
declare var setParamType1: {
    n: (t: string) => void;
};
declare var setParamType2: {
    n: (t: string) => void;
};
declare var getParamType1: invalid;
declare var getParamType2: invalid;
declare var getParamType3: invalid;

/// [Errors] ////

objectLiteralGettersAndSetters.ts(2,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(3,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(4,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(5,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(6,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(7,24): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(10,18): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(12,23): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(14,23): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(22,21): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(30,23): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(64,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(67,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
objectLiteralGettersAndSetters.ts(76,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations


==== objectLiteralGettersAndSetters.ts (14 errors) ====
    // Get and set accessor with the same name
    var sameName1a = { get 'a'() { return ''; }, set a(n) { var p = n; var p: string; } };
                           ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:2:50: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:2:24: Add a return type to the get accessor declaration
    var sameName2a = { get 0.0() { return ''; }, set 0(n) { var p = n; var p: string; } };
                           ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:3:50: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:3:24: Add a return type to the get accessor declaration
    var sameName3a = { get 0x20() { return ''; }, set 3.2e1(n) { var p = n; var p: string; } };
                           ~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:4:51: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:4:24: Add a return type to the get accessor declaration
    var sameName4a = { get ''() { return ''; }, set ""(n) { var p = n; var p: string; } };
                           ~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:5:49: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:5:24: Add a return type to the get accessor declaration
    var sameName5a = { get '\t'() { return ''; }, set '\t'(n) { var p = n; var p: string; } };
                           ~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:6:51: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:6:24: Add a return type to the get accessor declaration
    var sameName6a = { get 'a'() { return ''; }, set a(n) { var p = n; var p: string; } };
                           ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:7:50: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:7:24: Add a return type to the get accessor declaration
    
    // PropertyName CallSignature{FunctionBody} is equivalent to PropertyName:function CallSignature{FunctionBody}
    var callSig1 = { num(n: number) { return '' } };
                     ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9027 objectLiteralGettersAndSetters.ts:10:5: Add a type annotation to the variable callSig1
!!! related TS9034 objectLiteralGettersAndSetters.ts:10:18: Add a return type to the method
    var callSig1: { num: (n: number) => string; };
    var callSig2 = { num: function (n: number) { return '' } };
                          ~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9027 objectLiteralGettersAndSetters.ts:12:5: Add a type annotation to the variable callSig2
!!! related TS9030 objectLiteralGettersAndSetters.ts:12:23: Add a return type to the function expression
    var callSig2: { num: (n: number) => string; };
    var callSig3 = { num: (n: number) => '' };
                          ~~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9027 objectLiteralGettersAndSetters.ts:14:5: Add a type annotation to the variable callSig3
!!! related TS9030 objectLiteralGettersAndSetters.ts:14:23: Add a return type to the function expression
    var callSig3: { num: (n: number) => string; };
    
    // Get accessor only, type of the property is the annotated return type of the get accessor
    var getter1 = { get x(): string { return undefined; } };
    var getter1: { readonly x: string; }
    
    // Get accessor only, type of the property is the inferred return type of the get accessor
    var getter2 = { get x() { return ''; } };
                        ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9032 objectLiteralGettersAndSetters.ts:22:21: Add a return type to the get accessor declaration
    var getter2: { readonly x: string; }
    
    // Set accessor only, type of the property is the param type of the set accessor
    var setter1 = { set x(n: number) { } };
    var setter1: { x: number };
    
    // Set accessor only, type of the property is Any for an unannotated set accessor
    var setter2 = { set x(n) { } };
                          ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:30:21: Add a type to parameter of the set accessor declaration
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
            ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:60:9: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:64:9: Add a return type to the get accessor declaration
    };
    var getParamType2 = {
        get n() { return ''; },
            ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:68:9: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:67:9: Add a return type to the get accessor declaration
        set n(x) {
            var y = x;
            var y: string;
        }
    };
    
    // Type of unannotated accessors is the inferred return type of the get accessor
    var getParamType3 = {
        get n() { return ''; },
            ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 objectLiteralGettersAndSetters.ts:77:9: Add a type to parameter of the set accessor declaration
!!! related TS9032 objectLiteralGettersAndSetters.ts:76:9: Add a return type to the get accessor declaration
        set n(x) {
            var y = x;
            var y: string;
        }
    };
    
    