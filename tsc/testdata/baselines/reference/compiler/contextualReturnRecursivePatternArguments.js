//// [tests/cases/compiler/contextualReturnRecursivePatternArguments.ts] ////

//// [contextualReturnRecursivePatternArguments.ts]
interface Matcher<Input, Pattern = unknown> {
    matcher(): { match(value: Input): boolean; pattern?: Pattern };
}
type Pattern<Input> = Input | Matcher<Input> | { [Key in keyof Input]?: Pattern<Input[Key]> };
declare function union<Input, Patterns extends readonly [Pattern<Input>, ...Pattern<Input>[]]>(...patterns: Patterns): Matcher<Input, Patterns>;
declare function optional<Input, Value extends unknown extends Input ? unknown : Pattern<Input>>(value: Value): Matcher<Input, Value>;
declare function intersection<Input, Values extends readonly [Pattern<Input>, ...Pattern<Input>[]]>(...values: Values): Matcher<Input, Values>;
declare function accept<Value extends Pattern<{ type: "a" | "b" }>>(value: Value): void;

accept(optional({
    // @ts-expect-error
    type: union("oops"),
}));
accept(intersection({
    // @ts-expect-error
    type: union("oops"),
}));


//// [contextualReturnRecursivePatternArguments.js]
"use strict";
accept(optional({
    // @ts-expect-error
    type: union("oops"),
}));
accept(intersection({
    // @ts-expect-error
    type: union("oops"),
}));
