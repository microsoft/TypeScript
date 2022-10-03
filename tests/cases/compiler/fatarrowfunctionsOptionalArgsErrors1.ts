(arg1?, arg2) => 101;
(...arg?) => 102;
(...arg) => 103;
(...arg:number [] = []) => 104;

// Uninitialized parameter makes the initialized one required
(arg1 = 1, arg2) => 1; 