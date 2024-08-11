//// [tests/cases/compiler/impliedNodeFormatEmit1.ts] ////

//// [a.ts]
export const _ = 0;

//// [b.mts]
export const _ = 0;

//// [c.cts]
export const _ = 0;

//// [d.js]
export const _ = 0;

//// [e.mjs]
export const _ = 0;

//// [f.mjs]
export const _ = 0;

//// [g.ts]
import {} from "./a";
import a = require("./a");

//// [h.mts]
import {} from "./a";
import a = require("./a");

//// [i.cts]
import {} from "./a";
import a = require("./a");

//// [dummy.ts]
export {};


//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [b.mjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [c.cjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [d.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [e.mjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [f.mjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = void 0;
    exports._ = 0;
});
//// [g.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [h.mjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [i.cjs]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [dummy.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
