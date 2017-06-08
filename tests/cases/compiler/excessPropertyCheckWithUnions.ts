type ADT = {
    tag: "A",
    a1: string
} | {
    tag: "D",
    d20: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
} | {
    tag: "T",
}
let wrong: ADT = { tag: "T", a1: "extra" }
wrong = { tag: "A", d20: 12 }
wrong = { tag: "D" }
