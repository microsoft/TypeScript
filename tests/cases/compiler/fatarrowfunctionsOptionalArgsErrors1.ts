(arg1?, arg2) => 101;
(...arg?) => 102;
(...arg) => 103;
(...arg:number [] = []) => 104;
(...) => 105;

// Non optional parameter following an optional one
(arg1 = 1, arg2) => 1; 