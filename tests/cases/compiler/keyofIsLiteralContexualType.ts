// keyof T is a literal contextual type

function foo<T extends { a: string, b: string }>() {
    let a: (keyof T)[] = ["a", "b"];
    let b: (keyof T)[] = ["a", "b", "c"];
}

// Repro from #12455

declare function pick<T, K extends keyof T>(obj: T, propNames: K[]): Pick<T, K>;

let x = pick({ a: 10, b: 20, c: 30 }, ["a", "c"]);
let b = x.b;  // Error