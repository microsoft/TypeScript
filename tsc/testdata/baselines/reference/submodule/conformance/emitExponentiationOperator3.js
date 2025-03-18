//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperator3.ts] ////

//// [emitExponentiationOperator3.ts]
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


//// [emitExponentiationOperator3.js]
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
(-3) ** (++temp) ** 2;
(-3) ** (--temp) ** 2;
(+3) ** temp++ ** 2;
(+3) ** temp-- ** 2;
(+3) ** (++temp) ** 2;
(+3) ** (--temp) ** 2;
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
