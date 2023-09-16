//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithNumericLiteral.ts] ////

//// [comparisonOperatorWithNumericLiteral.ts]
type BrandedNum = number & { __numberBrand: any };
var x : BrandedNum;

// operator >
x > 0;
x > <number>0;
x > <BrandedNum>0;

// operator <
x < 0;
x < <number>0;
x < <BrandedNum>0;

// operator >=
x >= 0;
x >= <number>0;
x >= <BrandedNum>0;

// operator <=
x <= 0;
x <= <number>0;
x <= <BrandedNum>0;

// operator ==
x == 0;
x == <number>0;
x == <BrandedNum>0;

// operator !=
x != 0;
x != <number>0;
x != <BrandedNum>0;

// operator ===
x === 0;
x === <number>0;
x === <BrandedNum>0;

// operator !==
x !== 0;
x !== <number>0;
x !== <BrandedNum>0;


//// [comparisonOperatorWithNumericLiteral.js]
var x;
// operator >
x > 0;
x > 0;
x > 0;
// operator <
x < 0;
x < 0;
x < 0;
// operator >=
x >= 0;
x >= 0;
x >= 0;
// operator <=
x <= 0;
x <= 0;
x <= 0;
// operator ==
x == 0;
x == 0;
x == 0;
// operator !=
x != 0;
x != 0;
x != 0;
// operator ===
x === 0;
x === 0;
x === 0;
// operator !==
x !== 0;
x !== 0;
x !== 0;
