// ==ORIGINAL==

/*A*/import /*B*/ { /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/;/*H*/ //I
/*J*/import /*K*/ { /*L*/ F1 /*M*/ } /*N*/ from /*O*/ "lib" /*P*/;/*Q*/ //R

F1();
F2();

// ==ORGANIZED==

/*A*/import /*B*/ { /*L*/ F1 /*M*/, /*C*/ F2 /*D*/ } /*E*/ from /*F*/ "lib" /*G*/; /*H*/ //I

F1();
F2();
