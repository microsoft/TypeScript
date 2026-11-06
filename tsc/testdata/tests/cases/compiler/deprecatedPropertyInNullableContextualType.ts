// @strict: true
// @jsx: preserve
// @captureSuggestions: true
// @noEmit: true

// @filename: objectLiteral.ts
interface Options {
    /** @deprecated use other */
    value: number;
}
const nullable: Options | undefined = { value: 1 };
const plain: Options = { value: 1 };

// @filename: jsxAttributes.tsx
declare namespace JSX {
    interface Element {}
}
interface Props {
    /** @deprecated use other */
    value: number;
}
declare function Nullable(props: Props | undefined): JSX.Element;
declare function Plain(props: Props): JSX.Element;
const nullableElement = <Nullable value={1} />;
const plainElement = <Plain value={1} />;
