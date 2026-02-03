// @target: es5, es2015

// should not be an error
for (var let of [1,2,3]) {}

{
	for (var let of [1,2,3]) {}
}
