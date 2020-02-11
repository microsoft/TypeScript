//// [identifierStartAfterNumericLiteral.ts]
let valueIn = 3in[null];

3a[null]
123a[null]
3e[null]
123e[null]
3in[null]
123in[null]
3en[null]
123en[null]
1a
123a
123abc
1e
123e
1e9
123e9
1ee
123ee
1n
123n
2n2
123n2
2na
123na
123nabc


//// [identifierStartAfterNumericLiteral.js]
var valueIn = 3 in [null];
3;
a[null];
123;
a[null];
3e[null];
123e[null];
3 in [null];
123 in [null];
3en[null];
123en[null];
1;
a;
123;
a;
123;
abc;
1e;
123e;
1e9;
123e9;
1e;
e;
123e;
e;
1n;
123n;
2n;
2;
123n;
2;
2n;
a;
123n;
a;
123n;
abc;
