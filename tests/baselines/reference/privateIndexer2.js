//// [privateIndexer2.ts]
// private indexers not allowed

var x = {
    private [x: string]: string;
}

var y: {
    private[x: string]: string;
}

//// [privateIndexer2.js]
// private indexers not allowed
<<<<<<< HEAD
var x = {
    [x]: string, string: 
};
=======
var x = (_a = {}, _a[x] = string, _a.string = , _a);
>>>>>>> master
var y;
var _a;
