// @declaration: true
declare function map <T, U > (items: T[], f: (x: T) => U): U[];

var myItems: string[];
var lengths = map(myItems, x => x.length);

