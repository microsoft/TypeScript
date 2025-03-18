//// [tests/cases/compiler/parseErrorIncorrectReturnToken.ts] ////

//// [parseErrorIncorrectReturnToken.ts]
type F1 = {
    (n: number) => string; // should be : not =>
}
type F2 = (n: number): string; // should be => not :

// doesn't work in non-type contexts, where the return type is optional
let f = (n: number) => string => n.toString();
let o = {
    m(n: number) => string {
        return n.toString();
    }
};


//// [parseErrorIncorrectReturnToken.js]
string;
let f = (n) => string => n.toString();
let o = {
    m(n) { }
};
string;
{
    return n.toString();
}
;
