function toStrings(arr: ReadonlyArray<object>): string[] {
	return arr.reduce((acc, obj) => {
		acc.push(obj.toString());
		return acc;
	}, [] as string[]);
}
