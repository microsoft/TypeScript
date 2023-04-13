// @strict: true
// @noEmit: true

// repro from #52354

type SS1 = string;
let y: [t: "AAA", ...args: { [S in SS1]: [a: number]; }[SS1]] = ["AAA", 1];

type SS2 = "1" | "2" | "3";
let z: [t: "AAA", ...args: { [S in SS2]: [a: number]; }[SS2]] = ["AAA", 1];

class I<SS extends string>{
    f() {
        let w: [...args: { [S in SS]: [a: number]; }[SS]] = [1];

        let x: [t: "AAA", ...args: { [S in SS]: [a: number]; }[SS]] = ["AAA", 1];
    }
}
