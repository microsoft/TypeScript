
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
