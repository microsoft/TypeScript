//// [tests/cases/compiler/nativeToBoxedTypes.ts] ////

//// [nativeToBoxedTypes.ts]
var N = new Number();
var n = 100;
n = N;

var S = new String();
var s = "foge";
s = S;

var B = new Boolean();
var b = true;
b = B;

var sym: symbol; 
var Sym: Symbol;
sym = Sym;

//// [nativeToBoxedTypes.js]
var N = new Number();
var n = 100;
n = N;
var S = new String();
var s = "foge";
s = S;
var B = new Boolean();
var b = true;
b = B;
var sym;
var Sym;
sym = Sym;
