// @target: ES6

function f1() {
    (async () => {
        await 10
        throw new Error();
    })();

    var x = 1;
}
