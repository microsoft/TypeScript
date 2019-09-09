for (var [a, b] in []) {}
for (var { a, b } in []) {}

for (let [a, b] in []) {
    (() => a + b);
}

for (let { a, b } in []) {
    (() => a + b);
}
