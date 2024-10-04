import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { getProjectConfigWithNodeNext } from "./contents.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

export function getFsContentsForTransitiveReferencesRefsAdts(): string {
    return dedent`
        export class X {}
        export class A {}
    `;
}

export function getFsContentsForTransitiveReferencesBConfig(withNodeNext: boolean): string {
    return jsonToReadableText({
        compilerOptions: {
            ...getProjectConfigWithNodeNext(withNodeNext),
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

export function getFsContentsForTransitiveReferencesAConfig(withNodeNext: boolean): string {
    return jsonToReadableText({
        compilerOptions: {
            ...getProjectConfigWithNodeNext(withNodeNext),
            composite: true,
        },
        files: ["a.ts"],
    });
}

export function getSysForTransitiveReferences(withNodeNext?: boolean): TestServerHost {
    return TestServerHost.createWatchedSystem({
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
        "/user/username/projects/transitiveReferences/tsconfig.a.json": getFsContentsForTransitiveReferencesAConfig(!!withNodeNext),
        "/user/username/projects/transitiveReferences/tsconfig.b.json": getFsContentsForTransitiveReferencesBConfig(!!withNodeNext),
        "/user/username/projects/transitiveReferences/tsconfig.c.json": jsonToReadableText({
            files: ["c.ts"],
            compilerOptions: {
                ...getProjectConfigWithNodeNext(withNodeNext),
                baseUrl: "./",
                paths: {
                    "@ref/*": ["./refs/*"],
                },
            },
            references: [{ path: "tsconfig.b.json" }],
        }),
    }, { currentDirectory: "/user/username/projects/transitiveReferences" });
}
