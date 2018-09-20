//// [mappedTypeWithCombinedTypeMappers.ts]
// Repro from #13351

type Meta<T, A> = {
    readonly[P in keyof T]: {
        value: T[P];
        also: A;
        readonly children: Meta<T[P], A>;
    };
}

interface Input {
    x: string;
    y: number;
}

declare const output: Meta<Input, boolean>;

const shouldFail: { important: boolean } = output.x.children;


//// [mappedTypeWithCombinedTypeMappers.js]
// Repro from #13351
var shouldFail = output.x.children;
