//// [tests/cases/compiler/parseTypes.ts] ////

//// [parseTypes.ts]
var x = <() => number>null;
var y = <{(): number; }>null;
var z = <{new(): number; }>null
var w = <{[x:number]: number; }>null
function f() { return 3 };
function g(s: string) { true };
y=f;
y=g;
x=g;
w=g;
z=g;


/// [Declarations] ////



//// [parseTypes.d.ts]
declare var x: () => number;
declare var y: () => number;
declare var z: new () => number;
declare var w: {
    [x: number]: number;
};
declare function f(): invalid;
declare function g(s: string): invalid;

/// [Errors] ////

parseTypes.ts(5,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseTypes.ts(6,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parseTypes.ts(8,1): error TS2322: Type '(s: string) => void' is not assignable to type '() => number'.
  Target signature provides too few arguments. Expected 1 or more, but got 0.
parseTypes.ts(9,1): error TS2322: Type '(s: string) => void' is not assignable to type '() => number'.
  Target signature provides too few arguments. Expected 1 or more, but got 0.
parseTypes.ts(10,1): error TS2322: Type '(s: string) => void' is not assignable to type '{ [x: number]: number; }'.
  Index signature for type 'number' is missing in type '(s: string) => void'.
parseTypes.ts(11,1): error TS2322: Type '(s: string) => void' is not assignable to type 'new () => number'.
  Type '(s: string) => void' provides no match for the signature 'new (): number'.


==== parseTypes.ts (6 errors) ====
    var x = <() => number>null;
    var y = <{(): number; }>null;
    var z = <{new(): number; }>null
    var w = <{[x:number]: number; }>null
    function f() { return 3 };
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    function g(s: string) { true };
             ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    y=f;
    y=g;
    ~
!!! error TS2322: Type '(s: string) => void' is not assignable to type '() => number'.
!!! error TS2322:   Target signature provides too few arguments. Expected 1 or more, but got 0.
    x=g;
    ~
!!! error TS2322: Type '(s: string) => void' is not assignable to type '() => number'.
!!! error TS2322:   Target signature provides too few arguments. Expected 1 or more, but got 0.
    w=g;
    ~
!!! error TS2322: Type '(s: string) => void' is not assignable to type '{ [x: number]: number; }'.
!!! error TS2322:   Index signature for type 'number' is missing in type '(s: string) => void'.
    z=g;
    ~
!!! error TS2322: Type '(s: string) => void' is not assignable to type 'new () => number'.
!!! error TS2322:   Type '(s: string) => void' provides no match for the signature 'new (): number'.
    