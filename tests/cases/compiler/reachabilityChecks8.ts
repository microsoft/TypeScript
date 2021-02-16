// @allowUnreachableCode: false

try {
    for (
        (function () { throw "1"; })();
        (function () { throw "2"; })();
        (function () { throw "3"; })()
    ) {}
} catch (e) {}
