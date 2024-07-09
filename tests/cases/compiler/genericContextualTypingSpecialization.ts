var b: number[];
b.reduce<number>((c, d) => c + d, 0); // should not error on '+'