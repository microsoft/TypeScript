// @noEmit: true
// @noErrorTruncation: false

// https://github.com/microsoft/typescript-go/issues/2917

export type FlattenKeys<O> = {
	[K in keyof O & (string | number)]: O[K] extends Record<any, any>
		? K | `${K}.${FlattenKeys<O[K]>}`
		: K;
}[O extends readonly any[]
	? keyof O & `${number}`
	: keyof O & (string | number)];

export type KeySeparator = '.' | '[' | ']';

export type GetByString<
	Data,
	Path extends string | number = FlattenKeys<Data>,
> = Path extends `__proto__${`${KeySeparator}${string | number}` | ''}`
	? never
	: Path extends `${KeySeparator}${infer Rest}`
		? GetByString<Data, Rest>
		: Path extends `${infer Rest}${KeySeparator}`
			? GetByString<Data, Rest>
			: Path extends `${infer Key extends keyof Data & (string | number)}${KeySeparator}${infer Rest}`
				? GetByString<Data[Key], Rest>
				: Path extends keyof Data & (string | number)
					? Data[Path]
					: undefined;

interface Duck {
	taxonomy: {
		genus: 'anas';
		species: 'platyrhynchos';
	};
}

type DuckSpecies = GetByString<Duck, 'taxonomy.species'>; // 'platyrhynchos'
