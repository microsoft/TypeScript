// @strict: true

interface Matcher<Input, Value = unknown> {
    matcher(): { match(value: Input): boolean; value?: Value };
}
type Pattern<Input> = Input | Matcher<Input> | { [Key in keyof Input]?: Pattern<Input[Key]> };
type ArrayElement<Input> = Input extends readonly (infer Value)[] ? Value : unknown;
declare function array<Input, Value extends Pattern<ArrayElement<Input>>>(value: Value): Matcher<Input, Value>;
declare function when<Input, Callback extends (value: Input) => unknown>(callback: Callback): Matcher<Input>;
declare function accept<Value extends Pattern<{ list: { prop: string }[] }>>(value: Value): void;

accept({
    list: array({
        prop: when(value => {
            const text: string = value;
            return true;
        }),
    }),
});
