// @strict: true

type Variants = "a" | "b" | "c" | "d";


function fx1(x: Variants) {
    if (x === "a" || x === "b") {        
    }
    else {
        const y: never = x;
    }
}
