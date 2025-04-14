//// [tests/cases/compiler/genericFunctions2.ts] ////

//// [genericFunctions2.ts]
declare function map <T, U > (items: T[], f: (x: T) => U): U[];

var myItems: string[];
var lengths = map(myItems, x => x.length);



//// [genericFunctions2.js]
var myItems;
var lengths = map(myItems, function (x) { return x.length; });


//// [genericFunctions2.d.ts]
declare function map<T, U>(items: T[], f: (x: T) => U): U[];
declare var myItems: string[];
declare var lengths: number[];
