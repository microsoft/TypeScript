// @target: es6

// should not be an error
for (var let in [1,2,3]) {}

{
	for (var let in [1,2,3]) {}
}
