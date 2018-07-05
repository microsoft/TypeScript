//// [arrayReduce.ts]
function toStrings(arr: ReadonlyArray<object>): string[] {
	return arr.reduce((acc, obj) => {
		acc.push(obj.toString());
		return acc;
	}, [] as string[]);
}


//// [arrayReduce.js]
function toStrings(arr) {
    return arr.reduce(function (acc, obj) {
        acc.push(obj.toString());
        return acc;
    }, []);
}
