// @jsx: preserve
// @jsxImportSource: @solidjs/web
// @module: esnext

// @filename: ambient.d.ts
declare module "@solidjs/web/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            div: any;
        }
    }
}

// @filename: index.tsx
const x = <><div>hi</div></>;
