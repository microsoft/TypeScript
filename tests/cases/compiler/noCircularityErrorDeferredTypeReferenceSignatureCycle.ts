// @strict: true
type TypeReference = () => TreeSchema<TypeReference>;

class TreeSchema<T> {
	public constructor(public readonly info: T) {}
}

function map<T extends TypeReference>(types: T): TreeSchema<T> {
	return new TreeSchema(types);
}

const jsonRoot = () => jsonObject;

const jsonObject = map(jsonRoot);