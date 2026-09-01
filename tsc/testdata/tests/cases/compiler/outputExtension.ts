// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "declaration": true,
        "declarationMap": true,
        "emitDeclarationOnly": true,
        "outputExtension": ".js"
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".y.z", ".p"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /helper.ts
export declare const helper: string;

// @Filename: /other.p
export declare const other: number;

// @Filename: /component.y.z
import { helper } from "./helper.ts";
import { other } from "./other.p";
export interface ComponentProps {
    label: typeof helper;
    count: typeof other;
}
export declare const component: ComponentProps;

// @Filename: /main.ts
export { component } from "./component.y.z";
export type { ComponentProps } from "./component.y.z";
export type Props = import("./component.y.z").ComponentProps;
export * as other from "./other.p";
export { helper } from "./helper.ts";
export { helper as helperJs } from "./helper.js";
export { helper as helperBare } from "./helper";
