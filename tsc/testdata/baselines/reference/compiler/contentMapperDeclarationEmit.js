//// [tests/cases/compiler/contentMapperDeclarationEmit.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [component.y.z]
const __VERSION = "1.0.0";
export interface ComponentProps { emoji: "😀"; label: string; }
export declare const component: ComponentProps;
export const emittedTarget = 7;

//// [main.ts]
export { component } from "./component.y.z";

//// [main.js]
export { component } from "./component.y.z";


//// [component.d.y.z.ts]
export interface ComponentProps {
    emoji: "😀";
    label: string;
}
export declare const component: ComponentProps;
export declare const emittedTarget = 7;
//# sourceMappingURL=component.d.y.z.ts.map//// [main.d.ts]
export { component } from "./component.y.z";
//# sourceMappingURL=main.d.ts.map