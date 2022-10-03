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
"\u{10_ffff}";
//// [2.js]
'\u{10_ffff}';
//// [3.js]
"_ffff}";
//// [4.js]
/\u{10_ffff}/u;
//// [5.js]
"\uff_ff";
//// [6.js]
'\uff_ff';
//// [7.js]
"_ff";
//// [8.js]
/\uff_ff/u;
//// [9.js]
"\xf_f";
//// [10.js]
'\xf_f';
//// [11.js]
"_f";
//// [12.js]
/\xf_f/u;
//// [13.js]
"\u{_10ffff}";
//// [14.js]
'\u{_10ffff}';
//// [15.js]
"_10ffff}";
//// [16.js]
/\u{_10ffff}/u;
//// [17.js]
"\u_ffff";
//// [18.js]
'\u_ffff';
//// [19.js]
"_ffff";
//// [20.js]
/\u_ffff/u;
//// [21.js]
"\x_ff";
//// [22.js]
'\x_ff';
//// [23.js]
"_ff";
//// [24.js]
/\x_ff/u;
//// [25.js]
"\u{10ffff_}";
//// [26.js]
'\u{10ffff_}';
//// [27.js]
"_}";
//// [28.js]
/\u{10ffff_}/u;
//// [29.js]
"\uffff_";
//// [30.js]
'\uffff_';
//// [31.js]
"\uFFFF_";
//// [32.js]
/\uffff_/u;
//// [33.js]
"\xff_";
//// [34.js]
'\xff_';
//// [35.js]
"\u00FF_";
//// [36.js]
/\xff_/u;
//// [37.js]
"\u{10__ffff}";
//// [38.js]
'\u{10__ffff}';
//// [39.js]
"__ffff}";
//// [40.js]
/\u{10__ffff}/u;
//// [41.js]
"\uff__ff";
//// [42.js]
'\uff__ff';
//// [43.js]
"__ff";
//// [44.js]
/\uff__ff/u;
//// [45.js]
"\xf__f";
//// [46.js]
'\xf__f';
//// [47.js]
"__f";
//// [48.js]
/\xf__f/u;
