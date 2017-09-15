interface X {
    type1: 'x';
    value: string;
}

interface Y {
    type2: 'y';
    value: 'none' | 'done';
}

function foo(bar: X | Y) { }

foo({
    type2: 'y',
    value: 'done',
});
// you could do this (amybe) by noting that
// (1) the argument is a fresh object literal
// (2) of X | Y, the object literal is only assignable to Y
//     - you can do *that* cheaply (ie, symbolically) just by throwing out types
//       that are missing one of the fields in the object literal
