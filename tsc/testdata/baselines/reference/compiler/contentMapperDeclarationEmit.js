//// [tests/cases/compiler/contentMapperDeclarationEmit.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [component.part.toml]
const __VERSION = "1.0.0";
export interface ComponentProps { emoji: "😀"; label: string; }
export declare const component: ComponentProps;
export const emittedTarget = 7;

//// [main.ts]
export { component } from "./component.part.toml";

//// [main.js]
export { component } from "./component.part.toml";


//// [component.part.d.toml.ts]
export interface ComponentProps {
    emoji: "😀";
    label: string;
}
export declare const component: ComponentProps;
export declare const emittedTarget = 7;
//# sourceMappingURL=component.part.d.toml.ts.map//// [main.d.ts]
export { component } from "./component.part.toml";
//# sourceMappingURL=main.d.ts.map