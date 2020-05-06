declare const sb: [string, boolean];

let k1: [number, string, boolean];
k1 = [1, ...sb];

let k2: [number, string, boolean, number];
k2 = [1, ...sb, 1];

declare const sb_: [string, ...boolean[]];

let k3: [number, string, ...boolean[]];
k3 = [1, ...sb_];

declare const sbb_: [string, boolean, ...boolean[]];

let k4: [number, string, ...boolean[]];
k4 = [1, ...sbb_];

let k5: [number, string, boolean, ...boolean[]];
k5 = [1, ...sbb_];

let k6: [number, string, boolean, boolean, ...boolean[]];
k6 = [1, ...sbb_];
