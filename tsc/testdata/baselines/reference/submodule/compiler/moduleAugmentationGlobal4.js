//// [tests/cases/compiler/moduleAugmentationGlobal4.ts] ////

//// [f1.ts]
declare global {
    interface Something {x}
}
export {};
//// [f2.ts]
declare global {
    interface Something {y}
}
export {};
//// [f3.ts]
import "./f1";
import "./f2";



//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./f1");
require("./f2");


//// [f1.d.ts]
declare global {
    interface Something {
        x: any;
    }
}
export {};
//// [f2.d.ts]
declare global {
    interface Something {
        y: any;
    }
}
export {};
//// [f3.d.ts]
import "./f1";
import "./f2";
