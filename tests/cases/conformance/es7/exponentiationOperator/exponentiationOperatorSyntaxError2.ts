// @target: es5

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