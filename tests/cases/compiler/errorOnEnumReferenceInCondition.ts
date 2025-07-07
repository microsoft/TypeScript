// @strict: true
enum Nums {
    Zero = 0,
    One = 1,
}

const a = Nums.Zero ? "a" : "b";
const b = Nums.One ? "a" : "b";

if (Nums.Zero) {
    Nums;
}
else {
    Nums;
}


if (Nums.One) {
    Nums;
}
else {
    Nums;
}


enum Strs {
    Empty = "",
    A = "A",
}

const c = Strs.Empty ? "a" : "b";
const d = Strs.A ? "a" : "b";

if (Strs.Empty) {
    Strs;
}
else {
    Strs;
}


if (Strs.A) {
    Strs;
}
else {
    Strs;
}