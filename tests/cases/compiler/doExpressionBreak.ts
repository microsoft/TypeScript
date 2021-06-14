//@target: ES2021
for (const i of [1]) {
    (do {
        if (i === 1) break;
        1;
    })
}


for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) break;
            1;
        })
    }
}

a: for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) break a;
            1;
        })
    }
}
