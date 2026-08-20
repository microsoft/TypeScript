//// [tests/cases/conformance/jsx/tsxCorrectlyParseLessThanComparison1.tsx] ////

//// [tsxCorrectlyParseLessThanComparison1.tsx]
declare namespace JSX {
    interface Element {
        div: string;
    }
}
declare namespace React {
    class Component<P, S> {
        constructor(props?: P, context?: any);
        props: P;
    }
}

export class ShortDetails extends React.Component<{ id: number }, {}> {
    public render(): JSX.Element {
        if (this.props.id < 1) {
            return (<div></div>);
        }
    }
}

//// [tsxCorrectlyParseLessThanComparison1.js]
export class ShortDetails extends React.Component {
    render() {
        if (this.props.id < 1) {
            return (React.createElement("div", null));
        }
    }
}
