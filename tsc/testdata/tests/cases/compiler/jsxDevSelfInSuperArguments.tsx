// @jsx: react-jsxdev
// @jsxImportSource: preact
// @target: esnext
// @module: esnext

// @filename: /node_modules/preact/jsx-dev-runtime/index.d.ts
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        h2: {};
    }
}
export function jsxDEV(type: any, props: any, key?: any, isStatic?: boolean, source?: any, self?: any): JSX.Element;

// @filename: /index.tsx
class Base {
    content: any;
    constructor(...args: any[]) { this.content = args[0]; }
}
class Card extends Base {
    constructor(title: string) {
        super(<h2>{title}</h2>);
    }
}
class Nested extends Base {
    constructor() {
        super({ render() { return <h2 />; } });
    }
}
class Outer extends Base {
    constructor() {
        super(class extends Base { constructor() { super(<h2 />); } }, <h2 />);
    }
}
