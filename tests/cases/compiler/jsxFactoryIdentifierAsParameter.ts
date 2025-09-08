//@jsx: react
//@target: es6
//@module: commonjs
//@jsxFactory: createElement
//@sourcemap: true

// @filename: test.tsx
declare namespace JSX {
    interface IntrinsicElements {
        [s: string]: any;
    }
}

export class AppComponent {
    render(createElement) {
        return <div />;
    }
}
