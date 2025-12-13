function bigintSubtypeAdder<T extends bigint>(a: T, b: T): bigint {
	const sum = a + b;
	return sum;
}

function bigintSubtypeDifference<T extends bigint>(a: T, b: T): bigint {
	const difference = a - b;
	return difference;
}

function bigintSubtypeArithmeticNegation<T extends bigint>(a: T): bigint {
	const negation = -a;
	return negation;
}

function bigintSubtypeBitInverse<T extends bigint>(a: T): bigint {
	const bitInverse = ~a;
	return bitInverse;
}

function bigintSubtypeBitand<T extends bigint>(a: T, b: T): bigint {
	const bitand = a & b;
	return bitand;
}

function bigintSubtypeBitor<T extends bigint>(a: T, b: T): bigint {
	const bitor = a | b;
	return bitor;
}

function bigintSubtypeLeftshift<T extends bigint>(a: T, b: T): bigint {
	const leftshift = a << b;
	return leftshift;
}

function bigintSubtypeRightshift<T extends bigint>(a: T, b: T): bigint {
	const rightshift = a >> b;
	return rightshift;
}
