//// [tests/cases/compiler/undefinedTypeAssignment1.ts] ////

//// [undefinedTypeAssignment1.ts]
type undefined = string;
function p(undefined = "wat") {
	return undefined;
}


//// [undefinedTypeAssignment1.js]
function p(undefined = "wat") {
    return undefined;
}
