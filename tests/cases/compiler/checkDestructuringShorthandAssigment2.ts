// @noEmit: true

// GH #38175 -- should not crash while checking

let o: any, k: any;
let { x } = { x: 1, ...o, [k]: 1 };
