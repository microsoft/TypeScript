function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    for (foo().x of [])
        var p = foo().x;
}