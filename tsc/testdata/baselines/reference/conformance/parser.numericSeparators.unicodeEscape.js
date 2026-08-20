//// [tests/cases/conformance/parser/ecmascript2021/numericSeparators/parser.numericSeparators.unicodeEscape.ts] ////

//// [1.ts]
"\u{10_ffff}"

//// [2.ts]
'\u{10_ffff}'

//// [3.ts]
`\u{10_ffff}`

//// [4.ts]
/\u{10_ffff}/u

//// [5.ts]
"\uff_ff"

//// [6.ts]
'\uff_ff'

//// [7.ts]
`\uff_ff`

//// [8.ts]
/\uff_ff/u

//// [9.ts]
"\xf_f"

//// [10.ts]
'\xf_f'

//// [11.ts]
`\xf_f`

//// [12.ts]
/\xf_f/u

//// [13.ts]
"\u{_10ffff}"

//// [14.ts]
'\u{_10ffff}'

//// [15.ts]
`\u{_10ffff}`

//// [16.ts]
/\u{_10ffff}/u

//// [17.ts]
"\u_ffff"

//// [18.ts]
'\u_ffff'

//// [19.ts]
`\u_ffff`

//// [20.ts]
/\u_ffff/u

//// [21.ts]
"\x_ff"

//// [22.ts]
'\x_ff'

//// [23.ts]
`\x_ff`

//// [24.ts]
/\x_ff/u

//// [25.ts]
"\u{10ffff_}"

//// [26.ts]
'\u{10ffff_}'

//// [27.ts]
`\u{10ffff_}`

//// [28.ts]
/\u{10ffff_}/u

//// [29.ts]
"\uffff_"

//// [30.ts]
'\uffff_'

//// [31.ts]
`\uffff_`

//// [32.ts]
/\uffff_/u

//// [33.ts]
"\xff_"

//// [34.ts]
'\xff_'

//// [35.ts]
`\xff_`

//// [36.ts]
/\xff_/u

//// [37.ts]
"\u{10__ffff}"

//// [38.ts]
'\u{10__ffff}'

//// [39.ts]
`\u{10__ffff}`

//// [40.ts]
/\u{10__ffff}/u

//// [41.ts]
"\uff__ff"

//// [42.ts]
'\uff__ff'

//// [43.ts]
`\uff__ff`

//// [44.ts]
/\uff__ff/u

//// [45.ts]
"\xf__f"

//// [46.ts]
'\xf__f'

//// [47.ts]
`\xf__f`

//// [48.ts]
/\xf__f/u


//// [1.js]
"use strict";
"\u{10_ffff}";
//// [2.js]
"use strict";
'\u{10_ffff}';
//// [3.js]
"use strict";
`\u{10_ffff}`;
//// [4.js]
"use strict";
/\u{10_ffff}/u;
//// [5.js]
"use strict";
"\uff_ff";
//// [6.js]
"use strict";
'\uff_ff';
//// [7.js]
"use strict";
`\uff_ff`;
//// [8.js]
"use strict";
/\uff_ff/u;
//// [9.js]
"use strict";
"\xf_f";
//// [10.js]
"use strict";
'\xf_f';
//// [11.js]
"use strict";
`\xf_f`;
//// [12.js]
"use strict";
/\xf_f/u;
//// [13.js]
"use strict";
"\u{_10ffff}";
//// [14.js]
"use strict";
'\u{_10ffff}';
//// [15.js]
"use strict";
`\u{_10ffff}`;
//// [16.js]
"use strict";
/\u{_10ffff}/u;
//// [17.js]
"use strict";
"\u_ffff";
//// [18.js]
"use strict";
'\u_ffff';
//// [19.js]
"use strict";
`\u_ffff`;
//// [20.js]
"use strict";
/\u_ffff/u;
//// [21.js]
"use strict";
"\x_ff";
//// [22.js]
"use strict";
'\x_ff';
//// [23.js]
"use strict";
`\x_ff`;
//// [24.js]
"use strict";
/\x_ff/u;
//// [25.js]
"use strict";
"\u{10ffff_}";
//// [26.js]
"use strict";
'\u{10ffff_}';
//// [27.js]
"use strict";
`\u{10ffff_}`;
//// [28.js]
"use strict";
/\u{10ffff_}/u;
//// [29.js]
"use strict";
"\uffff_";
//// [30.js]
"use strict";
'\uffff_';
//// [31.js]
"use strict";
`\uffff_`;
//// [32.js]
"use strict";
/\uffff_/u;
//// [33.js]
"use strict";
"\xff_";
//// [34.js]
"use strict";
'\xff_';
//// [35.js]
"use strict";
`\xff_`;
//// [36.js]
"use strict";
/\xff_/u;
//// [37.js]
"use strict";
"\u{10__ffff}";
//// [38.js]
"use strict";
'\u{10__ffff}';
//// [39.js]
"use strict";
`\u{10__ffff}`;
//// [40.js]
"use strict";
/\u{10__ffff}/u;
//// [41.js]
"use strict";
"\uff__ff";
//// [42.js]
"use strict";
'\uff__ff';
//// [43.js]
"use strict";
`\uff__ff`;
//// [44.js]
"use strict";
/\uff__ff/u;
//// [45.js]
"use strict";
"\xf__f";
//// [46.js]
"use strict";
'\xf__f';
//// [47.js]
"use strict";
`\xf__f`;
//// [48.js]
"use strict";
/\xf__f/u;
