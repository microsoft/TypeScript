// @target: ES6

// error, missing intialicer
const c1;
const c2: number;
const c3, c4, c5 :string, c6;  // error, missing initialicer

for(const c in {}) { }

// error, assigning to a const
for(const c8 = 0; c8 < 1; c8++) { }

// error, can not be unintalized
for(const c9; c9 < 1;) { }

// error, can not be unintalized
for(const c10 = 0, c11; c10 < 1;) { }