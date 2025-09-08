namespace M
{
    export interface P { x: number; y: number; }
    export var a = 1;
}
var p: M.P;             // Used as ModuleName
var m: M = M;           // Used as TypeName and PrimaryExpression (error on TypeName)
var m2: typeof M = M;   // Used as PrimaryExpression in TypeQuery
var x1 = M.a;           // Used as PrimaryExpression
var x2 = m.a;           // Same as M.a
var q: m.P;             // Error
