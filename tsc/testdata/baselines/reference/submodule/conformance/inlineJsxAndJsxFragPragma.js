//// [tests/cases/conformance/jsx/inline/inlineJsxAndJsxFragPragma.tsx] ////

//// [renderer.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function h(): void;
export function jsx(): void;
export function Fragment(): void;

//// [preacty.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<><div></div></>

//// [snabbdomy.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<><span></span></>

//// [preacty-only-fragment.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<></>

//// [snabbdomy-only-fragment.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<></>

//// [preacty-only-fragment-no-jsx.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {Fragment} from "./renderer";
<></>

//// [snabbdomy-only-fragment-no-jsx.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {} from "./renderer";
<></>

//// [preacty-no-fragment.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<div></div>

//// [snabbdomy-no-fragment.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<div></div>

//// [preacty-only-component.tsx]
/**
 * @jsx h
 */
import {h} from "./renderer";
function Component() { return null; }
<Component />


//// [preacty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Fragment
 */
const renderer_1 = require("./renderer");
<><div></div></>;
//// [snabbdomy.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* @jsx jsx */
/* @jsxfrag null */
const renderer_1 = require("./renderer");
<><span></span></>;
//// [preacty-only-fragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Fragment
 */
const renderer_1 = require("./renderer");
<></>;
//// [snabbdomy-only-fragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<></>;
//// [preacty-only-fragment-no-jsx.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Fragment
 */
const renderer_1 = require("./renderer");
<></>;
//// [snabbdomy-only-fragment-no-jsx.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<></>;
//// [preacty-no-fragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Fragment
 */
const renderer_1 = require("./renderer");
<div></div>;
//// [snabbdomy-no-fragment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* @jsx jsx */
/* @jsxfrag null */
const renderer_1 = require("./renderer");
<div></div>;
//// [preacty-only-component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 */
const renderer_1 = require("./renderer");
function Component() { return null; }
<Component />;
