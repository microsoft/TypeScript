// @strict: true

// Repro from #22823

interface Props {
    foo?: boolean;
}

function foo<P extends Props>(props: Readonly<P>) {
    let { foo = false } = props;
    if (foo === true) { }
}
