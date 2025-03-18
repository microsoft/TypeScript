//// [tests/cases/compiler/exportDefaultClassInNamespace.ts] ////

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
    class {
    }
})(ns_class || (ns_class = {}));
var ns_abstract_class;
(function (ns_abstract_class) {
    class {
    }
})(ns_abstract_class || (ns_abstract_class = {}));
