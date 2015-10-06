//// [emitExponentiationOperator3ES7.ts]

var temp = 10;

(-++temp) ** 3;
(+--temp) ** 3;
(-temp++) ** 3;
(+temp--) ** 3;
(-(1 ** ++temp)) ** 3;
(-(1 ** --temp)) ** 3;
(-(1 ** temp++)) ** 3;
(-(1 ** temp--)) ** 3;

(-3) ** temp++;
(-3) ** temp--;
(-3) ** ++temp;
(-3) ** --temp;
(+3) ** temp++;
(+3) ** temp--;
(+3) ** ++temp;
(+3) ** --temp;
(-3) ** temp++ ** 2;
(-3) ** temp-- ** 2;
(-3) ** ++temp ** 2;
(-3) ** --temp ** 2;
(+3) ** temp++ ** 2;
(+3) ** temp-- ** 2;
(+3) ** ++temp ** 2;
(+3) ** --temp ** 2;

3 ** -temp++;
3 ** -temp--;
3 ** -++temp;
3 ** +--temp;
3 ** (-temp++) ** 2;
3 ** (-temp--) ** 2;
3 ** (+temp++) ** 2;
3 ** (+temp--) ** 2;
3 ** (-++temp) ** 2;
3 ** (+--temp) ** 2;


//// [emitExponentiationOperator3ES7.js]
var temp = 10;
(-++temp) ** 3;
(+--temp) ** 3;
(-temp++) ** 3;
(+temp--) ** 3;
(-(1 ** ++temp)) ** 3;
(-(1 ** --temp)) ** 3;
(-(1 ** temp++)) ** 3;
(-(1 ** temp--)) ** 3;
(-3) ** temp++;
(-3) ** temp--;
(-3) ** ++temp;
(-3) ** --temp;
(+3) ** temp++;
(+3) ** temp--;
(+3) ** ++temp;
(+3) ** --temp;
(-3) ** temp++ ** 2;
(-3) ** temp-- ** 2;
(-3) ** ++temp ** 2;
(-3) ** --temp ** 2;
(+3) ** temp++ ** 2;
(+3) ** temp-- ** 2;
(+3) ** ++temp ** 2;
(+3) ** --temp ** 2;
3 ** -temp++;
3 ** -temp--;
3 ** -++temp;
3 ** +--temp;
3 ** (-temp++) ** 2;
3 ** (-temp--) ** 2;
3 ** (+temp++) ** 2;
3 ** (+temp--) ** 2;
3 ** (-++temp) ** 2;
3 ** (+--temp) ** 2;
