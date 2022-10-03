//@jsx: react
//@target: es6
//@module: commonjs
//@jsxFactory: MyElement.createElement
//@sourcemap: true

// @filename: test.tsx
declare module JSX {
    interface IntrinsicElements {
        [s: string]: any;
    }
}

export class AppComponent {
    render(createElement) {
        return <div />;
    }
}