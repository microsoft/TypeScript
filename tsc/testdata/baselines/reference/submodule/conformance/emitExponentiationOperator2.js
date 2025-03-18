//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperator2.ts] ////

//// [emitExponentiationOperator2.ts]
var temp = 10;

++temp ** 3;
--temp ** 3;
temp++ ** 3;
temp-- ** 3;
--temp + temp ** 3;
--temp - temp ** 3;
--temp * temp ** 3;
--temp / temp ** 3;
--temp % temp ** 3;
temp-- ** 3;
temp++ ** 3;
temp-- ** -temp;
temp++ ** +temp;

temp-- + temp ** 3;
temp-- - temp ** 3;
temp-- * temp ** 3;
temp-- / temp ** 3;
temp-- % temp ** 3;

--temp + 2 ** 3;
--temp - 2 ** 3;
--temp * 2 ** 3;
--temp / 2 ** 3;
--temp % 2 ** 3;

++temp + 2 ** 3;
++temp - 2 ** 3;
++temp * 2 ** 3;
++temp / 2 ** 3;

3 ** ++temp;
3 ** --temp;
3 ** temp++;
3 ** temp--;

3 ** ++temp ** 2;
3 ** --temp ** 2;
3 ** temp++ ** 2;
3 ** temp-- ** 2;

3 ** ++temp + 2;
3 ** ++temp - 2;
3 ** ++temp * 2;
3 ** ++temp / 2;
3 ** ++temp % 2;

3 ** --temp + 2;
3 ** --temp - 2;
3 ** --temp * 2;
3 ** --temp / 2;
3 ** --temp % 2;

//// [emitExponentiationOperator2.js]
var temp = 10;
(++temp) ** 3;
(--temp) ** 3;
temp++ ** 3;
temp-- ** 3;
--temp + temp ** 3;
--temp - temp ** 3;
--temp * temp ** 3;
--temp / temp ** 3;
--temp % temp ** 3;
temp-- ** 3;
temp++ ** 3;
temp-- ** -temp;
temp++ ** +temp;
temp-- + temp ** 3;
temp-- - temp ** 3;
temp-- * temp ** 3;
temp-- / temp ** 3;
temp-- % temp ** 3;
--temp + 2 ** 3;
--temp - 2 ** 3;
--temp * 2 ** 3;
--temp / 2 ** 3;
--temp % 2 ** 3;
++temp + 2 ** 3;
++temp - 2 ** 3;
++temp * 2 ** 3;
++temp / 2 ** 3;
3 ** ++temp;
3 ** --temp;
3 ** temp++;
3 ** temp--;
3 ** (++temp) ** 2;
3 ** (--temp) ** 2;
3 ** temp++ ** 2;
3 ** temp-- ** 2;
3 ** ++temp + 2;
3 ** ++temp - 2;
3 ** ++temp * 2;
3 ** ++temp / 2;
3 ** ++temp % 2;
3 ** --temp + 2;
3 ** --temp - 2;
3 ** --temp * 2;
3 ** --temp / 2;
3 ** --temp % 2;
