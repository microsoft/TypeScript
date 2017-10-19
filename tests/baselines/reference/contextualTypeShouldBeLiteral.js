//// [contextualTypeShouldBeLiteral.ts]
interface X {
    type: 'x';
    value: string;
}

interface Y {
    type: 'y';
    value: 'none' | 'done';
}

function foo(bar: X | Y) { }

foo({
    type: 'y',
    value: 'done',
});

interface X2 {
    type1: 'x';
    value: string;
}

interface Y2 {
    type2: 'y';
    value: 'none' | 'done';
}

function foo2(bar: X2 | Y2) { }

foo2({
    type2: 'y',
    value: 'done',
});

interface X3 {
    type: 'x';
    value: 1 | 2 | 3;
    xtra: number;
}

interface Y3 {
    type: 'y';
    value: 11 | 12 | 13;
    ytra: number;
}

let xy: X3 | Y3 = {
    type: 'y',
    value: 11,
    ytra: 12
};

xy;


//// [contextualTypeShouldBeLiteral.js]
function foo(bar) { }
foo({
    type: 'y',
    value: 'done'
});
function foo2(bar) { }
foo2({
    type2: 'y',
    value: 'done'
});
var xy = {
    type: 'y',
    value: 11,
    ytra: 12
};
xy;
