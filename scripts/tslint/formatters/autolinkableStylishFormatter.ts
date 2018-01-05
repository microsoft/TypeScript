import * as Lint from "tslint";
import chalk from "chalk";
import { sep } from "path";
function groupBy<T>(array: ReadonlyArray<T> | undefined, getGroupId: (elem: T, index: number) => number | string): T[][] {
    if (!array) {
        return [];
    }

    const groupIdToGroup: { [index: string]: T[] } = {};
    let result: T[][] | undefined; // Compacted array for return value
    for (let index = 0; index < array.length; index++) {
        const value = array[index];
        const key = getGroupId(value, index);
        if (groupIdToGroup[key]) {
            groupIdToGroup[key].push(value);
        }
        else {
            const newGroup = [value];
            groupIdToGroup[key] = newGroup;
            if (!result) {
                result = [newGroup];
            }
            else {
                result.push(newGroup);
            }
        }
    }

    return result || [];
}

function max<T>(array: ReadonlyArray<T> | undefined, selector: (elem: T) => number): number {
    if (!array) {
        return 0;
    }

    let max = 0;
    for (const item of array) {
        const scalar = selector(item);
        if (scalar > max) {
            max = scalar;
        }
    }
    return max;
}

function getLink(failure: Lint.RuleFailure, color: boolean): string {
    const lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
    const sev = failure.getRuleSeverity().toUpperCase();
    let path = failure.getFileName();
    // Most autolinks only become clickable if they contain a slash in some way; so we make a top level file into a relative path here
    if (path.indexOf("/") === -1 && path.indexOf("\\") === -1) {
        path = `.${sep}${path}`;
    }
    return `${color ? (sev === "WARNING" ? chalk.blue(sev) : chalk.red(sev)) : sev}: ${path}:${lineAndCharacter.line + 1}:${lineAndCharacter.character + 1}`;
}

function getLinkMaxSize(failures: Lint.RuleFailure[]): number {
    return max(failures, f => getLink(f, /*color*/ false).length);
}

function getNameMaxSize(failures: Lint.RuleFailure[]): number {
    return max(failures, f => f.getRuleName().length);
}

function pad(str: string, visiblelen: number, len: number) {
    if (visiblelen >= len) return str;
    const count = len - visiblelen;
    for (let i = 0; i < count; i++) {
        str += " ";
    }
    return str;
}

export class Formatter extends Lint.Formatters.AbstractFormatter {
    public static metadata: Lint.IFormatterMetadata = {
        formatterName: "autolinkableStylish",
        description: "Human-readable formatter which creates stylish messages with autolinkable filepaths.",
        descriptionDetails: Lint.Utils.dedent`
            Colorized output grouped by file, with autolinkable filepaths containing line and column information
        `,
        sample: Lint.Utils.dedent`
        src/myFile.ts
        ERROR: src/myFile.ts:1:14 semicolon Missing semicolon`,
        consumer: "human"
    };
    public format(failures: Lint.RuleFailure[]): string {
        return groupBy(failures, f => f.getFileName()).map(group => {
            const currentFile = group[0].getFileName();
            const linkMaxSize = getLinkMaxSize(group);
            const nameMaxSize = getNameMaxSize(group);
            return `
${currentFile}
${group.map(f => `${pad(getLink(f, /*color*/ true), getLink(f, /*color*/ false).length, linkMaxSize)} ${chalk.grey(pad(f.getRuleName(), f.getRuleName().length, nameMaxSize))} ${chalk.yellow(f.getFailure())}`).join("\n")}`;
        }).join("\n");
    }
}