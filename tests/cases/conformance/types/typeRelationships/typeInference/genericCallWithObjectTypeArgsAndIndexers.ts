// Type inference infers from indexers in target type, no errors expected

function foo<T>(x: T) {
    return x;
}

var a: {
    [x: string]: Object;
    [x: number]: Date;
};
var r = foo(a);

function other<T extends Date>(arg: T) {
    var b: {
        [x: string]: Object;
        [x: number]: T
    };
    var r2 = foo(b);
    var d = r2[1]; 
    var e = r2['1']; 
}