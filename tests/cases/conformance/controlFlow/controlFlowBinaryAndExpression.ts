let x: string | number | boolean;
let cond: boolean;

(x = "") && (x = 0);
x; // string | number

x = "";
cond && (x = 0);
x; // string | number
