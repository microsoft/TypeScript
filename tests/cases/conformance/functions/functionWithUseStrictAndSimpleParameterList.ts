function a(a = 10) {
    "use strict";
}

export var foo = 10;
function b(a = 10) {
}

function container() {
    "use strict";
    function f(a = 10) {
    }
}

function rest(...args: any[]) {
    'use strict';
}

function rest1(a = 1, ...args) {
    'use strict';
}

function paramDefault(param = 1) {
    'use strict';
}

function objectBindingPattern({foo}: any) {
    'use strict';
}

function arrayBindingPattern([foo]: any[]) {
    'use strict';
}

function manyParameter(a = 10, b = 20) {
    "use strict";
}

function manyPrologue(a = 10, b = 20) {
    "foo";
    "use strict";
}

function invalidPrologue(a = 10, b = 20) {
    "foo";
    const c = 1;
    "use strict";
}
