// @target: ES6

// error, missing intialicer
const c1;
const c2: number;
const c3, c4, c5 :string, c6;  // error, missing initialicer

// error, wrong context
for(const c in {}) { }

for(const c = 0; c < 9; c++) { }
