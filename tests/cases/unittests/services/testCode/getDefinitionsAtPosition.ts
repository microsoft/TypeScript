///<reference path='getDefinitionsAtPosition2.ts' />
var locVar;
function locFn() { }
class locCls { }
interface locInt{ }
module locMod{ export var foo = 1;}

locVar = 1;
locFn();
var foo = new locCls();
class fooCls implements locInt { }
var fooVar = locMod.foo;

remVar = 1;
remFn();
var remfoo = new remCls();
class remfooCls implements remInt { }
var remfooVar = remMod.foo;

rem2Var = 1;
rem2Fn();
var rem2foo = new rem2Cls();
class rem2fooCls implements rem2Int { }
var rem2fooVar = rem2Mod.foo;

var shdVar = "foo";
module shdModule {
    var shdVar;
    shdVar = 1;
}

function fnOverload( );
function fnOverload(foo: string);
function fnOverload(foo: any) { };

fnOverload();
fnOverload("test");

class clsOverload {
    constructor ();
    constructor (foo: string);
    constructor (foo: any)  { }
};

var clsOverloadVar = new clsOverload();
clsOverloadVar = new clsOverload("test");

class clsInOverload {
    static fnOverload( );
    static fnOverload(foo: string);
    static fnOverload(foo: any) { };
    public fnOverload():any;
    public fnOverload(foo: string);
    public fnOverload(foo: any) { return "foo" };
    public fnOverload1():any;
    public fnOverload1(foo: string);
    public fnOverload1(foo: any) { return "foo" };

    constructor () { }
} 

clsInOverload.fnOverload();
clsInOverload.fnOverload("test");

var clsInOverloadVar = new clsInOverload();
var foo3 = clsInOverloadVar.fnOverload();
foo3 = clsInOverloadVar.fnOverload("test");

function fnInOverload() {
    static fnOverload():any;
    static fnOverload(foo: string); 
    static fnOverload(foo: any){ return "foo" };
}

fnInOverload.fnOverload();                            
fnInOverload.fnOverload("test");

interface sInt {
    sVar: number;
    sFn: () => void;    
}

class iClass implements sInt {
    public sVar = 1;
    public sFn() {
    }
}

declare var ambientVar;

ambientVar = 1;