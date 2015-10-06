//// [emitExponentiationOperator2ES7.ts]

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

//// [emitExponentiationOperator2ES7.js]
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
