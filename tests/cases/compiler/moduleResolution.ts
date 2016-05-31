// @traceResolution: true
// @Filename: a.ts
export default 0;

// No extension: '.ts' added
// @Filename: b.ts
import a from './a';

// Matching extension
// @Filename: c.ts
import a from './a.ts';

// '.js' extension: stripped and replaced with '.ts'
// @Filename: d.ts
import a from './a.js';

// @Filename: jquery.d.ts
declare var x: number;
export default x;

// No extension: '.d.ts' added
// @Filename: jquery_user_1.ts
import j from "./jquery";

// '.js' extension: stripped and replaced with '.d.ts'
// @Filename: jquery_user_1.ts
import j from "./jquery.js"
