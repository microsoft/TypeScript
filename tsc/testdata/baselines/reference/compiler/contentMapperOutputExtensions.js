//// [tests/cases/compiler/contentMapperOutputExtensions.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": {
        "contentMapper": {
            "exec": ["compiler-test-mapper"],
            "outputExtensions": { ".astro": ".js", ".vue": ".mjs" }
        }
    }
}

//// [Card.astro]
const __VERSION = "1.0.0";
export interface CardProps { title: string }
export declare const Card: (props: CardProps) => string;

//// [Widget.part.vue]
const __VERSION = "1.0.0";
export declare const Widget: () => string;

//// [typed.ts]
export const annotated: import("./Card.astro").CardProps = { title: "" };

//// [main.ts]
import { annotated } from "./typed";
export { Card } from "./Card.astro";
export type { CardProps } from "./Card.astro";
export { Widget } from "./Widget.part.vue";

const path = "./Card.astro";
void import(path);

export async function load() { return import("./Card.astro"); }
export const inferred = import("./Widget.part.vue");
export const nested = { load: () => import("./Card.astro") };
export const copied = [annotated];


//// [typed.js]
export const annotated = { title: "" };
//// [main.js]
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx, extraExtensions, ignoreCase) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        if (extraExtensions) {
            for (var extension in extraExtensions) {
                var suffix = path.slice(-extension.length);
                if (suffix === extension || ignoreCase && suffix.toLowerCase() === extension.toLowerCase()) {
                    return path.slice(0, -extension.length) + extraExtensions[extension];
                }
            }
        }
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import { annotated } from "./typed";
export { Card } from "./Card.js";
export { Widget } from "./Widget.part.mjs";
const path = "./Card.astro";
void import(__rewriteRelativeImportExtension(path, false, { ".astro": ".js", ".vue": ".mjs" }));
export async function load() { return import("./Card.js"); }
export const inferred = import("./Widget.part.mjs");
export const nested = { load: () => import("./Card.js") };
export const copied = [annotated];


//// [Card.d.ts]
export interface CardProps {
    title: string;
}
export declare const Card: (props: CardProps) => string;
//# sourceMappingURL=Card.d.ts.map//// [Widget.part.d.mts]
export declare const Widget: () => string;
//# sourceMappingURL=Widget.part.d.mts.map//// [typed.d.ts]
export declare const annotated: import("./Card.js").CardProps;
//# sourceMappingURL=typed.d.ts.map//// [main.d.ts]
export { Card } from "./Card.js";
export type { CardProps } from "./Card.js";
export { Widget } from "./Widget.part.mjs";
export declare function load(): Promise<typeof import("./Card.js")>;
export declare const inferred: Promise<typeof import("./Widget.part.mjs")>;
export declare const nested: {
    load: () => Promise<typeof import("./Card.js")>;
};
export declare const copied: import("./Card.js").CardProps[];
//# sourceMappingURL=main.d.ts.map