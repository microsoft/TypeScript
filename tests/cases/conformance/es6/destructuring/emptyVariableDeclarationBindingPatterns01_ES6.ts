// @target: es6

(function () {
    var a: any;

    var {} = a;
    let {} = a;
    const {} = a;

    var [] = a;
    let [] = a;
    const [] = a;

    var {} = a, [] = a;
    let {} = a, [] = a;
    const {} = a, [] = a;

    var { p1: {}, p2: [] } = a;
    let { p1: {}, p2: [] } = a;
    const { p1: {}, p2: [] } = a;

    for (var {} = {}, {} = {}; false; void 0) {
    }

    function f({} = a, [] = a, { p: {} = a} = a) {
        return ({} = a, [] = a, { p: {} = a } = a) => a;
    }
})();

(function () {
    const ns: number[][] = [];

    for (var {} of ns) {
    }

    for (let {} of ns) {
    }

    for (const {} of ns) {
    }

    for (var [] of ns) {
    }

    for (let [] of ns) {
    }

    for (const [] of ns) {
    }
})();