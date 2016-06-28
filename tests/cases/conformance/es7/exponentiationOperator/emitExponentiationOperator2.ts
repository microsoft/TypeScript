// @target:es5

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