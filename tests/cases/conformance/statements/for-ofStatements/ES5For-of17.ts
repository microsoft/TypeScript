for (let v of []) {
    v;
    for (let v of [v]) {
        var x = v;
        v++;
    }
}