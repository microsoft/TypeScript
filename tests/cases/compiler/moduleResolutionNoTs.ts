// @filename: m.ts
export default 0;

// @filename: user.ts
// '.ts' extension is OK in a reference
///<reference path="./m.ts"/>

import x from "./m.ts";
