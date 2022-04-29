// @target: es5

// should not be an error
for (var let of [1,2,3]) {}

{
	for (var let of [1,2,3]) {}
}
