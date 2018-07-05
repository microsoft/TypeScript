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
