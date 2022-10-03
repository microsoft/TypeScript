// @jsx: preserve

declare namespace JSX {
    interface Element { }
    interface ElementClass {
        render: any;
    }
    interface IntrinsicAttributes {
        key: string | number
    }
    interface IntrinsicClassAttributes<T> {
        ref: T
    }
    interface IntrinsicElements {
        div: {
            text?: string;
            width?: number;
        }

        span: any;
    }
}

interface I {
    new(n: string): {
        x: number
        render(): void
    }
}
var E: I;
<E x={10} />
