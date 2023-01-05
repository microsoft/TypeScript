import { some, stringContains } from "./core";
import { sys } from "./sys";
import { CompilerOptions, NewLineKind, PrinterOptions } from "./types";

/** @internal */
export const ignoredPaths = ["/node_modules/.", "/.git", "/.#"];

/** @internal */
export function containsIgnoredPath(path: string) {
    return some(ignoredPaths, p => stringContains(path, p));
}

const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";

/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions, getNewLine?: () => string): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
            return lineFeed;
    }
    return getNewLine ? getNewLine() : sys ? sys.newLine : carriageReturnLineFeed;
}
