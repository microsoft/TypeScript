// @jsx: preserve
// @filename: index.tsx
namespace JSX {
    export interface Element {}
}

type Props<T> = PropsBase<string> | PropsWithConvert<T>;

interface PropsBase<T> {
    data: T;
}

interface PropsWithConvert<T> extends PropsBase<T> {
    convert: (t: T) => string;
}

function ShouldInferFromData<T>(props: Props<T>): JSX.Element {
    return <div />;
}

// Sanity check: function call equivalent versions work fine
ShouldInferFromData({ data: "1" });
ShouldInferFromData({ data: "1", convert: n => "" + n });
ShouldInferFromData({ data: 2, convert: n => "" + n });


const f1 = <ShouldInferFromData data={"1"} />;
const f2 = <ShouldInferFromData data={"1"} convert={n => "" + n} />;
const f3 = <ShouldInferFromData data={2} convert={n => "" + n} />;