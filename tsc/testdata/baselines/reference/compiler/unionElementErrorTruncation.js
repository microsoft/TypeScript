//// [tests/cases/compiler/unionElementErrorTruncation.ts] ////

//// [unionElementErrorTruncation.ts]
declare let s: string;
declare let o1:
    | { id: "00" }
    | { id: "01" }
    | { id: "02" }
    | { id: "03" }
    | { id: "04" }
    | { id: "05" }
    | { id: "06" }
    | { id: "07" }
    | { id: "08" }
    | { id: "09" }
    | { id: "10" }
    | { id: "11" }
    | { id: "12" }
    | { id: "13" }
    | { id: "14" }
    | { id: "15" }
    | { id: "16" }
    | { id: "17" }
    | { id: "18" };
declare let o2:
    | typeof o1
    | { id: "19" };

o1[s];
o2[s];


//// [unionElementErrorTruncation.js]
"use strict";
o1[s];
o2[s];


//// [unionElementErrorTruncation.d.ts]
declare let s: string;
declare let o1: {
    id: "00";
} | {
    id: "01";
} | {
    id: "02";
} | {
    id: "03";
} | {
    id: "04";
} | {
    id: "05";
} | {
    id: "06";
} | {
    id: "07";
} | {
    id: "08";
} | {
    id: "09";
} | {
    id: "10";
} | {
    id: "11";
} | {
    id: "12";
} | {
    id: "13";
} | {
    id: "14";
} | {
    id: "15";
} | {
    id: "16";
} | {
    id: "17";
} | {
    id: "18";
};
declare let o2: typeof o1 | {
    id: "19";
};
