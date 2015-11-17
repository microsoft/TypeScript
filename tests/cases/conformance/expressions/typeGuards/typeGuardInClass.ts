let x: string | number;

if (typeof x === "string") {
    let n = class {
        constructor() {
            let y: string = x;
        }
    }
}
else {
    let m = class {
        constructor() {
            let y: number = x;
        }
    }
}
