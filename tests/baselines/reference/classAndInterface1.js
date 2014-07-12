//// [classAndInterface1.ts]
class cli { }
interface cli { } // error

//// [classAndInterface1.js]
var cli = (function () {
    function cli() {
    }
    return cli;
})();
