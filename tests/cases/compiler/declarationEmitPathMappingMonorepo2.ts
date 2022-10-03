// @filename: packages/core/src/index.d.ts
export * from "./utils";
export { default as SvgIcon } from "./SvgIcon";

// @filename: packages/core/src/SvgIcon.d.ts
import { StyledComponentProps } from "@ts-bug/styles";
export interface SvgIconProps extends StyledComponentProps<"root"> {
    children?: string[];
}
export interface SomeInterface {
    myProp: string;
}
declare const SvgIcon: SomeInterface;
export default SvgIcon;

// @filename: packages/core/src/utils.d.ts
import SvgIcon from "./SvgIcon";
export function createSvgIcon(path: string, displayName: string): typeof SvgIcon;

// @filename: packages/styles/src/index.d.ts
export interface StyledComponentProps<ClassKey extends string> {
    classes?: Record<ClassKey, string>;
}

// @filename: packages/lab/src/index.ts
import { createSvgIcon } from "@ts-bug/core/utils";
export default createSvgIcon("Hello", "ArrowLeft");

// @filename: packages/lab/tsconfig.json
{
    "compilerOptions": {
        "outDir": "dist",
        "declaration": true,
        "baseUrl": "../",
        "paths": {
            "@ts-bug/core": ["./core/src"],
            "@ts-bug/core/*": ["./core/src/*"],
            "@ts-bug/lab": ["./lab/src"],
            "@ts-bug/lab/*": ["./lab/src/*"],
            "@ts-bug/styles": ["./styles/src"],
            "@ts-bug/styles/*": ["./styles/src/*"]
        }
    }
}