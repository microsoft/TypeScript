type Predicates = { [s: string]: (n: number) => boolean };

const p = {
    isEven: n => n % 2 === 0,
    isOdd: n => n % 2 === 1
} satisfies Predicates;
