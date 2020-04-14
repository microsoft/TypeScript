const square = Math.pow(?, 2);

square(4) === 16;

const struct = {
    a: {
        b: 10,
    },
};

const ultraCube = Math.pow(?, struct.a.b);
ultraCube(2) == 1024;

let s: undefined | { c: number };

const useC = (s2: typeof s) =>
    Math.pow(?, s2?.c ?? 0);

useC(undefined)(5) === 1;
useC({ c: 2 })(4) === 16;
