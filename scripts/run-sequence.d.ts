import { SpawnSyncOptions } from "child_process";

export function runSequence(tasks: [string, string[]][], opts?: SpawnSyncOptions): string;
