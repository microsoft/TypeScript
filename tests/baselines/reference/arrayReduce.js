//// [arrayReduce.ts]
function toStrings(arr: ReadonlyArray<object>): string[] {
	return arr.reduce((acc, obj) => {
		acc.push(obj.toString());
		return acc;
	}, [] as string[]);
}

interface Operation { readonly kind: "add" | "subtract"; readonly value: number; }
function add(arr: ReadonlyArray<Operation>): Operation {
	return arr.reduce(({ value }, { kind, value: v }) => {
		return { kind: "add", value: kind === "add" ? value + v : value - v };
	}, { kind: "add", value: 5 });
}


//// [arrayReduce.js]
function toStrings(arr) {
    return arr.reduce(function (acc, obj) {
        acc.push(obj.toString());
        return acc;
    }, []);
}
function add(arr) {
    return arr.reduce(function (_a, _b) {
        var value = _a.value;
        var kind = _b.kind, v = _b.value;
        return { kind: "add", value: kind === "add" ? value + v : value - v };
    }, { kind: "add", value: 5 });
}
