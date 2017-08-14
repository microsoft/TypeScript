//// [index.tsx]
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

function InferenceShouldNotProduceAny<T>(props: Props<T>): JSX.Element {
    return <div />;
}

// Sanity check: function call equivalent versions work fine
InferenceShouldNotProduceAny({ data: "1" });
InferenceShouldNotProduceAny({ data: "1", convert: n => "" + n });
InferenceShouldNotProduceAny({ data: 2, convert: n => "" + n });


const f1 = <InferenceShouldNotProduceAny data={"1"} />;
const f2 = <InferenceShouldNotProduceAny data={"1"} convert={n => "" + n} />;
const f3 = <InferenceShouldNotProduceAny data={2} convert={n => "" + n} />;

//// [index.jsx]
function InferenceShouldNotProduceAny(props) {
    return <div />;
}
// Sanity check: function call equivalent versions work fine
InferenceShouldNotProduceAny({ data: "1" });
InferenceShouldNotProduceAny({ data: "1", convert: function (n) { return "" + n; } });
InferenceShouldNotProduceAny({ data: 2, convert: function (n) { return "" + n; } });
var f1 = <InferenceShouldNotProduceAny data={"1"}/>;
var f2 = <InferenceShouldNotProduceAny data={"1"} convert={function (n) { return "" + n; }}/>;
var f3 = <InferenceShouldNotProduceAny data={2} convert={function (n) { return "" + n; }}/>;
