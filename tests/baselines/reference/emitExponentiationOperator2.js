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
Math.pow(++temp, 3);
Math.pow(--temp, 3);
Math.pow(temp++, 3);
Math.pow(temp--, 3);
--temp + Math.pow(temp, 3);
--temp - Math.pow(temp, 3);
--temp * Math.pow(temp, 3);
--temp / Math.pow(temp, 3);
--temp % Math.pow(temp, 3);
Math.pow(temp--, 3);
Math.pow(temp++, 3);
Math.pow(temp--, -temp);
Math.pow(temp++, +temp);
temp-- + Math.pow(temp, 3);
temp-- - Math.pow(temp, 3);
temp-- * Math.pow(temp, 3);
temp-- / Math.pow(temp, 3);
temp-- % Math.pow(temp, 3);
--temp + Math.pow(2, 3);
--temp - Math.pow(2, 3);
--temp * Math.pow(2, 3);
--temp / Math.pow(2, 3);
--temp % Math.pow(2, 3);
++temp + Math.pow(2, 3);
++temp - Math.pow(2, 3);
++temp * Math.pow(2, 3);
++temp / Math.pow(2, 3);
Math.pow(3, ++temp);
Math.pow(3, --temp);
Math.pow(3, temp++);
Math.pow(3, temp--);
Math.pow(3, Math.pow(++temp, 2));
Math.pow(3, Math.pow(--temp, 2));
Math.pow(3, Math.pow(temp++, 2));
Math.pow(3, Math.pow(temp--, 2));
Math.pow(3, ++temp) + 2;
Math.pow(3, ++temp) - 2;
Math.pow(3, ++temp) * 2;
Math.pow(3, ++temp) / 2;
Math.pow(3, ++temp) % 2;
Math.pow(3, --temp) + 2;
Math.pow(3, --temp) - 2;
Math.pow(3, --temp) * 2;
Math.pow(3, --temp) / 2;
Math.pow(3, --temp) % 2;
