//// [tests/cases/compiler/numericClassMembers1.ts] ////

//// [numericClassMembers1.ts]
class C234 {
  0 = 1; 
  0.0 = 2;
}
 
class C235 { 
  0.0 = 1;
 '0' = 2;
}

class C236 {
    '0.0' = 1;
    '0' = 2;
}


//// [numericClassMembers1.js]
class C234 {
    0 = 1;
    0.0 = 2;
}
class C235 {
    0.0 = 1;
    '0' = 2;
}
class C236 {
    '0.0' = 1;
    '0' = 2;
}
