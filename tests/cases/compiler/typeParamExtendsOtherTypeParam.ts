class A<T, U extends T> { }
class B<T extends Object, U extends T> {
    data: A<Object, Object>;
}

// Below 2 should compile without error 
var x: A< { a: string }, { a: string; b: number }>;
var y: B< { a: string }, { a: string; b: number }>;


// Below should be in error
var x1: A<{ a: string;}, { b: string }>;
var x2: A<{ a: string;}, { a: number }>;
var x3: B<{ a: string;}, { b: string }>;
var x4: B<{ a: string;}, { a: number }>;
var x5: A<{ a: string; b: number }, { a: string }>;
var x6: B<{ a: string; b: number }, { a: string }>;

interface I1 {
    a: string;
}

interface I2 {
    a: string;
    b: number;
}

var x7: A<I2, I1>;
var x8: B<I2, I1>;
