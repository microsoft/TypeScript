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
Math.pow((-++temp), 3);
Math.pow((+--temp), 3);
Math.pow((-temp++), 3);
Math.pow((+temp--), 3);
Math.pow((-(Math.pow(1, ++temp))), 3);
Math.pow((-(Math.pow(1, --temp))), 3);
Math.pow((-(Math.pow(1, temp++))), 3);
Math.pow((-(Math.pow(1, temp--))), 3);
Math.pow((-3), temp++);
Math.pow((-3), temp--);
Math.pow((-3), ++temp);
Math.pow((-3), --temp);
Math.pow((+3), temp++);
Math.pow((+3), temp--);
Math.pow((+3), ++temp);
Math.pow((+3), --temp);
Math.pow((-3), Math.pow(temp++, 2));
Math.pow((-3), Math.pow(temp--, 2));
Math.pow((-3), Math.pow(++temp, 2));
Math.pow((-3), Math.pow(--temp, 2));
Math.pow((+3), Math.pow(temp++, 2));
Math.pow((+3), Math.pow(temp--, 2));
Math.pow((+3), Math.pow(++temp, 2));
Math.pow((+3), Math.pow(--temp, 2));
Math.pow(3, -temp++);
Math.pow(3, -temp--);
Math.pow(3, -++temp);
Math.pow(3, +--temp);
Math.pow(3, Math.pow((-temp++), 2));
Math.pow(3, Math.pow((-temp--), 2));
Math.pow(3, Math.pow((+temp++), 2));
Math.pow(3, Math.pow((+temp--), 2));
Math.pow(3, Math.pow((-++temp), 2));
Math.pow(3, Math.pow((+--temp), 2));
