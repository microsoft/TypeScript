// @jsx: preserve

// @filename: index.tsx
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        div: {
            static?: boolean;
        };
    }
}
export default <div static={true} />;
