// no error
var numStrTuple: [number, string] = [5, "hello"];
var numStrTuple2: [number, string] = [5, "foo", true];
var numStrBoolTuple: [number, string, boolean] = [5, "foo", true];
var objNumTuple: [{ a: string }, number] = [{ a: "world" }, 5];
var strTupleTuple: [string, [number, {}]] = ["bar", [5, { x: 1, y: 1 }]];
class C { }
class D { }
var unionTuple: [C, string | number] = [new C(), "foo"];
var unionTuple1: [C, string | number] = [new C(), "foo"];
var unionTuple2: [C, string | number, D] = [new C(), "foo", new D()];
var unionTuple3: [number, string| number] = [10, "foo"]; 

numStrTuple = numStrTuple2;
numStrTuple = numStrBoolTuple;

// error
objNumTuple = [ {}, 5];
numStrBoolTuple = numStrTuple;
var strStrTuple: [string, string] = ["foo", "bar", 5];

unionTuple = unionTuple1;
unionTuple = unionTuple2;
unionTuple2 = unionTuple;
numStrTuple = unionTuple3;

// repro from #29311
type test1 = [...number[]]
type fixed1 = test1 & { length: 2 }
let var1: fixed1 = [0, 0]

// #52551
type EmptyTuple = []
interface MyEmptyTuple extends EmptyTuple { extraInfo?: any; }
const withExtra: MyEmptyTuple = []
