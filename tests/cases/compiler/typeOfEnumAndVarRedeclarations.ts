enum E {
    a
}
enum E {
    b = 1
}
var x = E;
var x: { a: E; b: E;[x: number]: string; }; // Shouldnt error
var y = E;
var y: { a: E; b: E;[x: number]: string;[x: number]: string } // two errors: the types are not identical and duplicate signatures