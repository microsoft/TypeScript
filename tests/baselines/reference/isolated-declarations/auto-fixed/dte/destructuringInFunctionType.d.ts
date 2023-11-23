//// [tests/cases/conformance/es6/destructuring/destructuringInFunctionType.ts] ////

//// [destructuringInFunctionType.ts]
interface a { a }
interface b { b }
interface c { c }

type T1 = ([a, b, c]);
type F1 = ([a, b, c]: [
    any,
    any,
    any
]) => void;

type T2 = ({ a });
type F2 = ({ a }: {
    a: any;
}) => void;

type T3 = ([{ a: b }, { b: a }]);
type F3 = ([{ a: b }, { b: a }]: [
    {
        a: any;
    },
    {
        b: any;
    }
]) => void;

type T4 = ([{ a: [b, c] }]);
type F4 = ([{ a: [b, c] }]: [
    {
        a: [any, any];
    }
]) => void;

type C1 = new ([{ a: [b, c] }]: [
        {
            a: [any, any];
        }
    ]) => void;

var v1 = ([a, b, c]: [
        any,
        any,
        any
    ]): string => "hello";
var v2: ([a, b, c]: [
    any,
    any,
    any
]) => string;


/// [Declarations] ////



//// [destructuringInFunctionType.d.ts]
interface a {
    a: any;
}
interface b {
    b: any;
}
interface c {
    c: any;
}
type T1 = ([a, b, c]);
type F1 = ([a, b, c]: [
    any,
    any,
    any
]) => void;
type T2 = ({
    a: any;
});
type F2 = ({ a }: {
    a: any;
}) => void;
type T3 = ([{
    a: b;
}, {
    b: a;
}]);
type F3 = ([{ a: b }, { b: a }]: [
    {
        a: any;
    },
    {
        b: any;
    }
]) => void;
type T4 = ([{
    a: [b, c];
}]);
type F4 = ([{ a: [b, c] }]: [
    {
        a: [any, any];
    }
]) => void;
type C1 = new ([{ a: [b, c] }]: [
    {
        a: [any, any];
    }
]) => void;
declare var v1: ([a, b, c]: [
    any,
    any,
    any
]) => string;
declare var v2: ([a, b, c]: [
    any,
    any,
    any
]) => string;
//# sourceMappingURL=destructuringInFunctionType.d.ts.map
/// [Errors] ////

destructuringInFunctionType.ts(18,18): error TS2842: 'b' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
destructuringInFunctionType.ts(18,28): error TS2842: 'a' is an unused renaming of 'b'. Did you intend to use it as a type annotation?


==== destructuringInFunctionType.ts (2 errors) ====
    interface a { a }
    interface b { b }
    interface c { c }
    
    type T1 = ([a, b, c]);
    type F1 = ([a, b, c]: [
        any,
        any,
        any
    ]) => void;
    
    type T2 = ({ a });
    type F2 = ({ a }: {
        a: any;
    }) => void;
    
    type T3 = ([{ a: b }, { b: a }]);
    type F3 = ([{ a: b }, { b: a }]: [
                     ~
!!! error TS2842: 'b' is an unused renaming of 'a'. Did you intend to use it as a type annotation?
                               ~
!!! error TS2842: 'a' is an unused renaming of 'b'. Did you intend to use it as a type annotation?
        {
            a: any;
        },
        {
            b: any;
        }
    ]) => void;
    
    type T4 = ([{ a: [b, c] }]);
    type F4 = ([{ a: [b, c] }]: [
        {
            a: [any, any];
        }
    ]) => void;
    
    type C1 = new ([{ a: [b, c] }]: [
            {
                a: [any, any];
            }
        ]) => void;
    
    var v1 = ([a, b, c]: [
            any,
            any,
            any
        ]): string => "hello";
    var v2: ([a, b, c]: [
        any,
        any,
        any
    ]) => string;
    