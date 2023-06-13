//// [tests/cases/compiler/reachabilityChecks8.ts] ////

//// [reachabilityChecks8.ts]
try {
    for (
        (function () { throw "1"; })();
        (function () { throw "2"; })();
        (function () { throw "3"; })()
    ) {}
} catch (e) {}


//// [reachabilityChecks8.js]
try {
    for ((function () { throw "1"; })(); (function () { throw "2"; })(); (function () { throw "3"; })()) { }
}
catch (e) { }
