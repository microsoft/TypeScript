//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.10.ts] ////

//// [esDecorators-classExpression-namedEvaluation.10.ts]
declare let dec: any, f: any;

// 10.2.1.3 RS: EvaluateBody
//   Initializer : `=` AssignmentExpression

{ class C { static x = @dec class {}; } }
{ class C { static "x" = @dec class {}; } }
{ class C { static 0 = @dec class {}; } }
{ class C { static ["x"] = @dec class {}; } }
{ class C { static [0] = @dec class {}; } }
// @ts-ignore
{ class C { static [f()] = @dec class {}; } }

// __proto__ is not special in a class field
{ class C { static __proto__ = @dec class {}; } }
{ class C { static "__proto__" = @dec class {}; } }

{ class C { static x = class { @dec y: any }; } }
{ class C { static "x" = class { @dec y: any }; } }
{ class C { static 0 = class { @dec y: any }; } }
{ class C { static ["x"] = class { @dec y: any }; } }
{ class C { static [0] = class { @dec y: any }; } }
// @ts-ignore
{ class C { static [f()] = @dec class {}; } }

// __proto__ is not special in a class field
{ class C { static __proto__ = class { @dec y: any }; } }
{ class C { static "__proto__" = class { @dec y: any }; } }

// ensure nested named evaluation happens when field is also transformed
{ class C { @dec static x = @dec class {}; } }


//// [esDecorators-classExpression-namedEvaluation.10.js]
{
    class C {
        static x = 
        @dec
        class {
        };
    }
}
{
    class C {
        static "x" = 
        @dec
        class {
        };
    }
}
{
    class C {
        static 0 = 
        @dec
        class {
        };
    }
}
{
    class C {
        static ["x"] = 
        @dec
        class {
        };
    }
}
{
    class C {
        static [0] = 
        @dec
        class {
        };
    }
}
{
    class C {
        static [f()] = 
        @dec
        class {
        };
    }
}
{
    class C {
        static __proto__ = 
        @dec
        class {
        };
    }
}
{
    class C {
        static "__proto__" = 
        @dec
        class {
        };
    }
}
{
    class C {
        static x = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static "x" = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static 0 = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static ["x"] = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static [0] = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static [f()] = 
        @dec
        class {
        };
    }
}
{
    class C {
        static __proto__ = class {
            @dec
            y;
        };
    }
}
{
    class C {
        static "__proto__" = class {
            @dec
            y;
        };
    }
}
{
    class C {
        @dec
        static x = 
        @dec
        class {
        };
    }
}
