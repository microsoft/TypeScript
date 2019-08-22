export type Paired = {
    x: unique number;
    y: unique number;
};


export function isPaired(x: {x: number, y: number}): x is Paired {
    return true;
}

export function makePair(x: number, y: number): Paired {
    return {x, y} as Paired;
}

const a = makePair(0, 0);
const b = {x: 0, y: 0};

if (Math.random() > 0.3) {
    b.x = a.x;
    b.y = a.y;
}

if (isPaired(b)) {
    b.x = a.x;
    b.y = a.y;
    a.x = b.x;
    a.y = b.y;
}
