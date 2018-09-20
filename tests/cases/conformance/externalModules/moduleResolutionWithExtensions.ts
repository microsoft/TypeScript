// @traceResolution: true

// @Filename: /src/a.ts
export default 0;

// No extension: '.ts' added
// @Filename: /src/b.ts
import a from './a';

// '.js' extension: stripped and replaced with '.ts'
// @Filename: /src/d.ts
import a from './a.js';

// @Filename: /src/jquery.d.ts
declare var x: number;
export default x;

// No extension: '.d.ts' added
// @Filename: /src/jquery_user_1.ts
import j from "./jquery";

// '.js' extension: stripped and replaced with '.d.ts'
// @Filename: /src/jquery_user_1.ts
import j from "./jquery.js"
