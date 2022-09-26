// @noFallthroughCasesInSwitch: true
// @filename: file1.ts
// @ts-noFallthroughCasesInSwitch
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

// @filename: file2.ts
// @ts-noFallthroughCasesInSwitch true
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

// @filename: file3.ts
// @ts-noFallthroughCasesInSwitch false
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}

// @filename: file4.ts
export function f1(thing: "a" | "b") {
    switch (thing) {
        case "a":
            thing;
        case "b":
            thing;
            break;
    }
    return thing;
}
