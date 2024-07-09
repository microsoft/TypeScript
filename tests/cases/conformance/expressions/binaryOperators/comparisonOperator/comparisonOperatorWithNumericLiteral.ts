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
