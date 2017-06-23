//// [exportDefaultClassInNamespace.ts]
namespace ns_class {
    export default class {}
}

namespace ns_abstract_class {
    export default abstract class {}
}


//// [exportDefaultClassInNamespace.js]
var ns_class;
(function (ns_class) {
    var default_1 = (function () {
        function default_1() {
        }
        return default_1;
    }());
    ns_class.default_1 = default_1;
})(ns_class || (ns_class = {}));
var ns_abstract_class;
(function (ns_abstract_class) {
    var default_2 = (function () {
        function default_2() {
        }
        return default_2;
    }());
    ns_abstract_class.default_2 = default_2;
})(ns_abstract_class || (ns_abstract_class = {}));
