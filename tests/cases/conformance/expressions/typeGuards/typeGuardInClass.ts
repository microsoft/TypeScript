let x: string | number;

if (typeof x === "string") {
    let n = class {
        constructor() {
            x; // Should be "string"
        }
    }
}
else {
    let m = class {
        constructor() {
            x; // Should be "number"
        }
    }
}
