// @target: es2015
// @strict: true, false

export {};

type IsAny<Type> = 0 extends (1 & Type) ? true : false;
type Assert<Condition extends true> = Condition;

var comma = (comma, 3);
type CommaInference = Assert<IsAny<typeof comma>>;

var nestedComma = (comma, nestedComma, comma);
type NestedCommaInference = Assert<IsAny<typeof nestedComma>>;

var assignment = (assignment = 2);
type AssignmentInference = Assert<IsAny<typeof assignment>>;

var nestedAssignment = (nestedAssignment = nestedAssignment = 2);
type NestedAssignmentInference = Assert<IsAny<typeof nestedAssignment>>;

var conditional = conditional ? 0 : 1;
type ConditionalInference = Assert<IsAny<typeof conditional>>;

var logicalAnd = logicalAnd && "";
type LogicalAndInference = Assert<IsAny<typeof logicalAnd>>;

var propertyAccess = { member: propertyAccess.member };
type PropertyAccessInference = Assert<IsAny<typeof propertyAccess>>;

const nonCircular: number = 3;
type NonCircularInference = Assert<IsAny<typeof nonCircular> extends false ? true : false>;