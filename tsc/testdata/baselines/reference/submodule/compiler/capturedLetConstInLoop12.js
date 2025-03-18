//// [tests/cases/compiler/capturedLetConstInLoop12.ts] ////

//// [capturedLetConstInLoop12.ts]
(function() {
    "use strict";

    for (let i = 0; i < 4; i++) {
        (() => [i] = [i + 1])();
    }
})();

(function() {
    "use strict";

    for (let i = 0; i < 4; i++) {
        (() => ({a:i} = {a:i + 1}))();
    }
})();

//// [capturedLetConstInLoop12.js]
(function () {
    "use strict";
    "use strict";
    for (let i = 0; i < 4; i++) {
        (() => [i] = [i + 1])();
    }
})();
(function () {
    "use strict";
    "use strict";
    for (let i = 0; i < 4; i++) {
        (() => ({ a: i } = { a: i + 1 }))();
    }
})();
