// @strict: true
// @target: esnext
// @jsx: preserve
// @noEmit: true

declare namespace JSX {
    interface Element { element: true; }
}

declare function Component<T extends { value: string }>(props: { data: T }): JSX.Element;
const validSelfClosing = <Component data={{ get value() { return ""; } }} />;
const validPaired = <Component data={{ get value() { return ""; } }}></Component>;
const invalidSelfClosing = <Component data={{ get value() { return 42; } }} />;
const invalidPaired = <Component data={{ get value() { return 42; } }}></Component>;

declare function InvalidComponent<T extends { value: string }>(props: { data: T }): number;
const invalidElement = <InvalidComponent data={{ get value() { return 42; } }} />;

declare function tag<T extends { value: string }>(strings: TemplateStringsArray, value: T): T;
const validTagged = tag`${{ get value() { return ""; } }}`;
const invalidTagged = tag`${{ get value() { return 42; } }}`;

declare function rest<T extends { value: string }>(...values: T[]): T;
const validRest = rest({ get value() { return ""; } });
const invalidRest = rest({ get value() { return 42; } });

const matcher = {
    [Symbol.hasInstance]<T extends { value: string }>(value: T) { return true; },
};
const validInstance = { get value() { return ""; } } instanceof matcher;
const invalidInstance = { get value() { return 42; } } instanceof matcher;
