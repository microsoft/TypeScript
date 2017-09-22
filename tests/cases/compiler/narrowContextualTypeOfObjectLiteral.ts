interface X {
    type: 'x';
    value: 1 | 2 | 3;
    xtra: number;
}

interface Y {
    type: 'y';
    value: 11 | 12 | 13;
    ytra: number;
}

let resa: X | Y = {
    type: 'y',
    value: 11,
    ytra: 12
};
