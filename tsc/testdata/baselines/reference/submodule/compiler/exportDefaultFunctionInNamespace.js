//// [tests/cases/compiler/exportDefaultFunctionInNamespace.ts] ////

//// [exportDefaultFunctionInNamespace.ts]
namespace ns_function {
    export default function () {}
}

namespace ns_async_function {
    export default async function () {}
}


//// [exportDefaultFunctionInNamespace.js]
var ns_function;
(function (ns_function) {
    function () { }
})(ns_function || (ns_function = {}));
var ns_async_function;
(function (ns_async_function) {
    async function () { }
})(ns_async_function || (ns_async_function = {}));
