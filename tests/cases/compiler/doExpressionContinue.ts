//@target: ES2021
for (const i of [1]) {
    (do {
        if (i === 1) continue;
        1;
    })
}


for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) continue;
            1;
        })
    }
}

a: for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) continue a;
            1;
        })
    }
}
