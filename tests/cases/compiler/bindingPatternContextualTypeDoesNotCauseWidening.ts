declare function pick<O, T extends keyof O>(keys: T[], obj?: O): Pick<O, T>;
const _    = pick(['b'], { a: 'a', b: 'b' }); // T: "b"
const {  } = pick(['b'], { a: 'a', b: 'b' }); // T: "b" | "a" ??? (before fix)
