// @filename: x.ts
export default 0;

// @filename: y.tsx
export default 0;

// @filename: user.ts
// '.ts' extension is OK in a reference
///<reference path="./x.ts"/>

import x from "./x.ts";
import y from "./y.tsx";

// Making sure the suggested fixes are valid:
import x2 from "./x";
import y2 from "./y";
