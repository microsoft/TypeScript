// @runExternalCode: true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "preserve",
        "moduleResolution": "bundler",
        "rewriteRelativeImportExtensions": true,
        "declaration": true,
        "declarationMap": true,
        "rootDir": "/",
        "outDir": "/dist"
    },
    "contentMappers": [
        { "package": "mapper", "extensions": [".astro", ".y.z"] }
    ]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": {
        "contentMapper": {
            "exec": ["compiler-test-mapper"],
            "outputExtensions": { ".astro": ".js", ".y.z": ".mjs" }
        }
    }
}

// @Filename: /Card.astro
export interface CardProps { title: string }
export declare const Card: (props: CardProps) => string;

// @Filename: /Widget.y.z
export declare const Widget: () => string;

// @Filename: /typed.ts
export const annotated: import("./Card.astro").CardProps = { title: "" };

// @Filename: /main.ts
import { annotated } from "./typed";
export { Card } from "./Card.astro";
export type { CardProps } from "./Card.astro";
export { Widget } from "./Widget.y.z";

const path = "./Card.astro";
void import(path);

export async function load() { return import("./Card.astro"); }
export const inferred = import("./Widget.y.z");
export const nested = { load: () => import("./Card.astro") };
export const copied = [annotated];
