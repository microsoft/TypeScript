//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorSyntaxError2.ts] ////

//// [exponentiationOperatorSyntaxError2.ts]
// Error: early syntax error using ES7 SimpleUnaryExpression on left-hand side without ()
var temp: any;

delete --temp ** 3;
delete ++temp ** 3;
delete temp-- ** 3;
delete temp++ ** 3;


1 ** delete --temp ** 3;
1 ** delete ++temp ** 3;
1 ** delete temp-- ** 3;
1 ** delete temp++ ** 3;

typeof --temp ** 3;
typeof temp-- ** 3;
typeof 3 ** 4;
typeof temp++ ** 4;
typeof temp-- ** 4;

1 ** typeof --temp ** 3;
1 ** typeof temp-- ** 3;
1 ** typeof 3 ** 4;
1 ** typeof temp++ ** 4;
1 ** typeof temp-- ** 4;

void --temp ** 3;
void temp-- ** 3;
void 3 ** 4;
void temp++ ** 4;
void temp-- ** 4;

1 ** void --temp ** 3;
1 ** void temp-- ** 3;
1 ** void 3 ** 4;
1 ** void temp++ ** 4;
1 ** void temp-- ** 4 ;

~ --temp ** 3;
~temp-- ** 3;
~3 ** 4;
~temp++ ** 4;
~temp-- ** 4;

1 ** ~ --temp ** 3;
1 ** ~temp-- ** 3;
1 ** ~3 ** 4;
1 ** ~temp++ ** 4;
1 ** ~temp-- ** 4;

! --temp ** 3;
!temp-- ** 3;
!3 ** 4;
!temp++ ** 4;
!temp-- ** 4;

1 ** ! --temp ** 3;
1 ** !temp-- ** 3;
1 ** !3 ** 4;
1 ** !temp++ ** 4;
1 ** !temp-- ** 4;

<number>temp ** 3;
<number>++temp ** 3;
<number>--temp ** 3;
<number>temp++ ** 3;
<number>temp-- ** 3;

//// [exponentiationOperatorSyntaxError2.js]
// Error: early syntax error using ES7 SimpleUnaryExpression on left-hand side without ()
var temp;
Math.pow(delete --temp, 3);
Math.pow(delete ++temp, 3);
Math.pow(delete temp--, 3);
Math.pow(delete temp++, 3);
Math.pow(1, Math.pow(delete --temp, 3));
Math.pow(1, Math.pow(delete ++temp, 3));
Math.pow(1, Math.pow(delete temp--, 3));
Math.pow(1, Math.pow(delete temp++, 3));
Math.pow(typeof --temp, 3);
Math.pow(typeof temp--, 3);
Math.pow(typeof 3, 4);
Math.pow(typeof temp++, 4);
Math.pow(typeof temp--, 4);
Math.pow(1, Math.pow(typeof --temp, 3));
Math.pow(1, Math.pow(typeof temp--, 3));
Math.pow(1, Math.pow(typeof 3, 4));
Math.pow(1, Math.pow(typeof temp++, 4));
Math.pow(1, Math.pow(typeof temp--, 4));
Math.pow(void --temp, 3);
Math.pow(void temp--, 3);
Math.pow(void 3, 4);
Math.pow(void temp++, 4);
Math.pow(void temp--, 4);
Math.pow(1, Math.pow(void --temp, 3));
Math.pow(1, Math.pow(void temp--, 3));
Math.pow(1, Math.pow(void 3, 4));
Math.pow(1, Math.pow(void temp++, 4));
Math.pow(1, Math.pow(void temp--, 4));
Math.pow(~--temp, 3);
Math.pow(~temp--, 3);
Math.pow(~3, 4);
Math.pow(~temp++, 4);
Math.pow(~temp--, 4);
Math.pow(1, Math.pow(~--temp, 3));
Math.pow(1, Math.pow(~temp--, 3));
Math.pow(1, Math.pow(~3, 4));
Math.pow(1, Math.pow(~temp++, 4));
Math.pow(1, Math.pow(~temp--, 4));
Math.pow(!--temp, 3);
Math.pow(!temp--, 3);
Math.pow(!3, 4);
Math.pow(!temp++, 4);
Math.pow(!temp--, 4);
Math.pow(1, Math.pow(!--temp, 3));
Math.pow(1, Math.pow(!temp--, 3));
Math.pow(1, Math.pow(!3, 4));
Math.pow(1, Math.pow(!temp++, 4));
Math.pow(1, Math.pow(!temp--, 4));
Math.pow(temp, 3);
Math.pow(++temp, 3);
Math.pow(--temp, 3);
Math.pow(temp++, 3);
Math.pow(temp--, 3);
