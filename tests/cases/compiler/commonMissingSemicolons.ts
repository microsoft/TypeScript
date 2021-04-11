// @noEmit: true
// @noTypesAndSymbols: true

async function myAsyncFunction1() {}
asynd function myAsyncFunction2() {}
sasync function myAsyncFunction3() {}

// Arrow functions don't (yet?) parse as nicely as standalone functions.
// Eventually it would be good to get them the same "did you mean" for typos such as "asyncd".
const myAsyncArrow1 = async () => 3;
const myAsyncArrow2 = asyncd () => 3;

class MyClass1 {}
clasd MyClass2 {}
classs MyClass3 {}

const myConst1 = 1;
consd myConst2 = 1;
constd myConst3 = 1;

declare const myDeclareConst1: 1;
declared const myDeclareConst2: 1;
declare constd myDeclareConst3: 1;
declared constd myDeclareConst4: 1;
declareconst myDeclareConst5;

function myFunction1() { }
functiond myFunction2() { }
function function() { }
functionMyFunction;

interface myInterface1 { }
interfaced myInterface2 { }
interface interface { }
interface { }
interface void { }
interfaceMyInterface { }

let let = 1;
let let1 = 1;
letd let2 = 1;
letMyLet;

type type;
type type1 = {};
type type2 = type;
type type3 = {};
typed type4 = {}
typed type5 = type;
typeMyType;

var myVar1 = 1;
vard myVar2 = 1;
varMyVar;

class NoSemicolonClassA {
  ['a'] = 0
  {}
}

class NoSemicolonClassB {
  ['a'] = 0
  {}
}

class NoSemicolonClassC {
  ['a'] = 0;
  {}
}

class NoSemicolonClassD {
  ['a'] = 0
  ['b']() {}
}
 
class NoSemicolonClassE {
  ['a'] = 0
  ['b']() {
    c: true
  }
}
