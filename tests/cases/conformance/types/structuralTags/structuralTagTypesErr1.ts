export type Paired = {
    x: number & tag {x};
    y: number & tag {y};
};


export function isPaired(x: {x: number, y: number}): x is Paired {
    return true;
}

export function makePair(x: number, y: number): Paired {
    return {x, y} as Paired;
}

const a = makePair(0, 0);
const b = {x: 0, y: 0};

a.x = a.y; // err
a.y = a.x; // err

a.x = b.y; // err
a.y = b.y; // err

a.x = b.x; // err
a.y = b.x; // err 