// Type definitions for del 3.0
// Project: https://github.com/sindresorhus/del
// Definitions by: Asana <https://asana.com>
//                 Aya Morisawa <https://github.com/AyaMorisawa>
//                 BendingBender <https://github.com/BendingBender>
//                 Jason Dreyzehner <https://github.com/bitjson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import glob = require('glob');

declare function del(
    patterns: string | ReadonlyArray<string>,
    options?: del.Options
): Promise<string[]>;

declare namespace del {
    function sync(
        patterns: string | ReadonlyArray<string>,
        options?: Options
    ): string[];

    interface Options extends glob.IOptions {
        force?: boolean;
        dryRun?: boolean;
        concurrency?: number;
    }
}

export = del;
