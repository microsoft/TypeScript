import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    FsContents,
    libContent,
} from "./contents";
import {
    libFile,
} from "./virtualFileSystemWithWatch";

export function getFsContentsForTransitiveReferencesRefsAdts() {
    return dedent`
        export class X {}
        export class A {}
    `;
}

export function getFsContentsForTransitiveReferencesBConfig() {
    return jsonToReadableText({
        compilerOptions: {
            composite: true,
            baseUrl: "./",
            paths: {
                "@ref/*": ["./*"],
            },
        },
        files: ["b.ts"],
        references: [{ path: "tsconfig.a.json" }],
    });
}

export function getFsContentsForTransitiveReferencesAConfig() {
    return jsonToReadableText({
        compilerOptions: { composite: true },
        files: ["a.ts"],
    });
}

export function getFsContentsForTransitiveReferences(): FsContents {
    return {
        "/user/username/projects/transitiveReferences/refs/a.d.ts": getFsContentsForTransitiveReferencesRefsAdts(),
        "/user/username/projects/transitiveReferences/a.ts": dedent`
            export class A {}
        `,
        "/user/username/projects/transitiveReferences/b.ts": dedent`
            import {A} from '@ref/a';
            export const b = new A();
        `,
        "/user/username/projects/transitiveReferences/c.ts": dedent`
            import {b} from './b';
            import {X} from "@ref/a";
            b;
            X;
        `,
        "/user/username/projects/transitiveReferences/tsconfig.a.json": getFsContentsForTransitiveReferencesAConfig(),
        "/user/username/projects/transitiveReferences/tsconfig.b.json": getFsContentsForTransitiveReferencesBConfig(),
        "/user/username/projects/transitiveReferences/tsconfig.c.json": jsonToReadableText({
            files: ["c.ts"],
            compilerOptions: {
                baseUrl: "./",
                paths: {
                    "@ref/*": ["./refs/*"],
                },
            },
            references: [{ path: "tsconfig.b.json" }],
        }),
        [libFile.path]: libContent,
    };
}
