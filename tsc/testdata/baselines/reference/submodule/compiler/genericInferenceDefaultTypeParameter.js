//// [tests/cases/compiler/genericInferenceDefaultTypeParameter.ts] ////

//// [genericInferenceDefaultTypeParameter.ts]
// Repro from #50858

type Type = {
    a: (e: string) => void;
    b: (e: number) => void;
}

declare function f1<T extends keyof Type = "a">(props: Type[T]): void;

f1(event => { });
f1<"a">(event => { });
f1<"b">(event => { });


//// [genericInferenceDefaultTypeParameter.js]
f1(event => { });
f1(event => { });
f1(event => { });
