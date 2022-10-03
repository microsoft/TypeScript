// @strictNullChecks: true
function f(x: { [key: string]: number; } | null | undefined) {
    for (const key in x) {  // 1
        console.log(x[key]);  // 2
    }
    x["no"]; // should still error
}