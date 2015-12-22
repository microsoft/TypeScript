//// [tests/cases/compiler/moduleAugmentationGlobal4.ts] ////

//// [f1.ts]

declare module "/" {
    interface Something {x}
}
export {};
//// [f2.ts]

declare module "/" {
    interface Something {y}
}
export {};
//// [f3.ts]
import "./f1";
import "./f2";



//// [f1.js]
"use strict";
//// [f2.js]
"use strict";
//// [f3.js]
"use strict";
require("./f1");
require("./f2");


//// [f1.d.ts]
declare module "/" {
    interface Something {
        x: any;
    }
}
export {  };
export {};
//// [f2.d.ts]
declare module "/" {
    interface Something {
        y: any;
    }
}
export {  };
export {};
//// [f3.d.ts]
