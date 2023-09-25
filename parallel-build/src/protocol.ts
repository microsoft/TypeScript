import {
    CompilerOptions,
} from "typescript";

export interface Task {
    name: string;
    config: Message;
    dependencies: string[];
    group: string;
}

export type Message =
    | {
        type: "exit";
    }
    | (
        ({ type: "tsc"; } | { type: "tsc-shard"; shard: number; shardCount: number; }) & {
            project: string;
            suppressOutput?: boolean;
            redirectDeclarationOutput?: boolean;
            tsconfigOverrides: CompilerOptions;
        }
    )
    | {
        type: "declaration";
        project: string;
        tsconfigOverrides: CompilerOptions;
    }
    | {
        type: "tsc-b";
        project: string;
        suppressOutput?: boolean;
        redirectDeclarationOutput?: boolean;
        tsconfigOverrides: CompilerOptions;
    }
    | {
        type: "clean";
        project: string;
        tsconfigOverrides: CompilerOptions;
    };
