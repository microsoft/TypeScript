//// [identifierStartAfterNumericLiteral.ts]
let valueIn = 3in[null];

3a[null]
3e[null]
3in[null]
3en[null]
1a
1e
1e9
1ee
1n
2n2
2na


//// [identifierStartAfterNumericLiteral.js]
var valueIn = 3 in [null];
3;
a[null];
3e[null];
3 in [null];
3e;
n[null];
1;
a;
1e;
1e9;
1e;
e;
1n;
2n;
2;
2n;
a;
