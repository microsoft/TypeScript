//// [classAndInterface1.ts]
 class cli { } // error
interface cli { } // error

//// [classAndInterface1.js]
var cli = (function () {
    function cli() {
    }
    return cli;
})(); // error
