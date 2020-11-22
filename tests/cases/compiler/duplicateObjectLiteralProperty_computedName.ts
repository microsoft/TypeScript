const t1 = {
    1: 1,
    [1]: 0 // duplicate
}

const t2 = {
    1: 1,
    [+1]: 0 // duplicate
}

const t3 = {
    "1": 1,
    [+1]: 0 // duplicate
}

const t4 = {
    "+1": 1,
    [+1]: 0 // two different keys, "+1", "1"
}

const t5 = {
    "+1": 1,
    ["+1"]: 0 // duplicate
}

const t6 = {
    "-1": 1,
    [-1]: 0 // duplicate
}

const t7 = {
    "-1": 1,
    ["-1"]: 0 // duplicate
}
