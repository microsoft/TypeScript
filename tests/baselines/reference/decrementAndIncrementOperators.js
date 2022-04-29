//// [decrementAndIncrementOperators.ts]
var x = 0;

// errors
1 ++;

(1)++;
(1)--;

++(1);
--(1);

(1 + 2)++;
(1 + 2)--;

++(1 + 2);
--(1 + 2);

(x + x)++;
(x + x)--;

++(x + x);
--(x + x);

//OK
x++;
x--;

++x;
--x;

(x)++;
--(x);

((x))++;
((x))--;

x[x++]++;


//// [decrementAndIncrementOperators.js]
var x = 0;
// errors
1++;
(1)++;
(1)--;
++(1);
--(1);
(1 + 2)++;
(1 + 2)--;
++(1 + 2);
--(1 + 2);
(x + x)++;
(x + x)--;
++(x + x);
--(x + x);
//OK
x++;
x--;
++x;
--x;
(x)++;
--(x);
((x))++;
((x))--;
x[x++]++;
