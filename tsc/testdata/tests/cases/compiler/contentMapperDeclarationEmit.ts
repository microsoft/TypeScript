// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2020",
        "module": "esnext",
        "moduleResolution": "bundler",
        "declaration": true,
        "declarationMap": true
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".y.z"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /component.y.z
export interface ComponentProps { emoji: "😀"; label: string; }
export declare const component: ComponentProps;
export const emittedTarget = #{target};

// @Filename: /main.ts
export { component } from "./component.y.z";