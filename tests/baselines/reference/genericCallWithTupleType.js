//// [genericCallWithTupleType.ts]
interface I<T, U> {
    tuple1: [T, U];
} 

var i1: I<string, number>;
var i2: I<{}, {}>;

// no error
i1.tuple1 = ["foo", 5];
var e1 = i1.tuple1[0];  // string
var e2 = i1.tuple1[1];  // number
i1.tuple1 = ["foo", 5, false, true];
var e3 = i1.tuple1[2];  // {}
i1.tuple1[3] = { a: "string" };
var e4 = i1.tuple1[3];  // {}
i2.tuple1 = ["foo", 5];
i2.tuple1 = ["foo", "bar"];
i2.tuple1 = [5, "bar"];
i2.tuple1 = [{}, {}];

// error
i1.tuple1 = [5, "foo"];
i1.tuple1 = [{}, {}];
i2.tuple1 = [{}];


//// [genericCallWithTupleType.js]
var i1;
var i2;
// no error
i1.tuple1 = ["foo", 5];
var e1 = i1.tuple1[0]; // string
var e2 = i1.tuple1[1]; // number
i1.tuple1 = ["foo", 5, false, true];
var e3 = i1.tuple1[2]; // {}
i1.tuple1[3] = { a: "string" };
var e4 = i1.tuple1[3]; // {}
i2.tuple1 = ["foo", 5];
i2.tuple1 = ["foo", "bar"];
i2.tuple1 = [5, "bar"];
i2.tuple1 = [{}, {}];
// error
i1.tuple1 = [5, "foo"];
i1.tuple1 = [{}, {}];
i2.tuple1 = [{}];
