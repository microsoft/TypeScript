var x: {p1:number; p2?:string; p3?:{():number;};};

interface IFoo
{
    id: number;
    name?: string;
    print?(): void;
}


var foo: IFoo;
foo = { id: 1234 };                // Ok
foo = { id: 1234, name: "test" };  // Ok
foo = { name: "test" };            // Error, id missing
foo = {id: 1234, print:()=>{}}	   // Ok

var s = foo.name || "default";
if (foo.print !== undefined) foo.print();

interface i1 { M: () => void; };
interface i2 { M?: () => void; };
interface i3 { M: number; };
interface i4 { M?: number; };

var test1: i1 = {};
var test2: i3 = {};
var test3: i2 = {};
var test4: i4 = {};
var test5: i1 = { M: function () { } };
var test6: i3 = { M: 5 };
var test7: i2 = { M: function () { } };
test7 = {};
var test8: i4 = { M: 5 }
test8 = {};
var test9_1: i2;
var test9_2: i1;
test9_1 = test9_2;
var test10_1: i1;
var test10_2: i2;
test10_1 = test10_2;