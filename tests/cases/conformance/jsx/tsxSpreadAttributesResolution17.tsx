// @strictNullChecks: true
// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: lib.d.ts

declare global {
    namespace JSX {
        interface Element {}
        interface ElementAttributesProperty { props: {} }
    }
}
declare var React: any;

export class Empty extends React.Component<{}, {}> {
    render() {
        return <div>Hello</div>;
    }
}

declare const obj: { a: number | undefined } | undefined;

// OK
let unionedSpread = <Empty {...obj} />;
