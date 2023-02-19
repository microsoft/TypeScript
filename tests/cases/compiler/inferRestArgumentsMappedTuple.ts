// @strict: true

type MyMappedType<Primitive extends any> = {
	primitive: Primitive;
};

type TupleMapperOld<Tuple extends any[]> = {
	[Key in keyof Tuple]: Tuple[Key] extends Tuple[number] ? MyMappedType<Tuple[Key]> : never;
};

// [MyMappedType<string>, MyMappedType<number>]
type MyMappedTupleOld = TupleMapperOld<[string, number]>;
//    ^?

declare function extractPrimitivesOld<Tuple extends any[]>(...mappedTypes: TupleMapperOld<Tuple>): Tuple;

// [string, number]
const myPrimitiveTupleOld: [string, number] = extractPrimitivesOld({ primitive: "" }, { primitive: 0 });
