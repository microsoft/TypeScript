function test() {
    let foo = 0;
    testLoop: do {
        foo++;
        continue testLoop;
    } while (function() {
        var x = 1;
        return false;
    }());

    return foo;
}