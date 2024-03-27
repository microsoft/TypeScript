/// <reference path='fourslash.ts' />

// @filename: ./test.tsx
//// interface FC<P = {}> {
////     (props: P, context?: any): string;
//// }
//// 
//// const Thing: FC = (props) => <div></div>;
//// const HelloWorld = () => <[|/**/Thing|] />;

verify.baselineGoToDefinition("");
