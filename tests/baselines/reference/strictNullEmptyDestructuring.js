//// [strictNullEmptyDestructuring.ts]
// Repro from #20873

let [] = null;

let { } = null;

({} = null);

let { } = undefined;

({} = undefined);

let { } = Math.random() ? {} : null;

({} = Math.random() ? {} : null);

let { } = Math.random() ? {} : undefined;

({} = Math.random() ? {} : undefined);

let { } = Math.random() ? null : undefined;

({} = Math.random() ? null : undefined);


//// [strictNullEmptyDestructuring.js]
// Repro from #20873
var _a = null;
var _b = null;
(null);
var _c = undefined;
(undefined);
var _d = Math.random() ? {} : null;
(Math.random() ? {} : null);
var _e = Math.random() ? {} : undefined;
(Math.random() ? {} : undefined);
var _f = Math.random() ? null : undefined;
(Math.random() ? null : undefined);
