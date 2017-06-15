import * as vpath from "./vpath";
import * as io from "./io";
import { toUtf8 } from "./utils";
import { assert } from "chai";

export interface BaselineOptions {
    base?: string;
    relative?: string;
    local?: string;
    reference?: string;
}

export function baseline(file: string, actual: string | undefined, opts: BaselineOptions = {}) {
    const local = vpath.combine(opts.base || "tests/baselines", opts.relative || "", opts.local || "local", file);
    const reference = vpath.combine(opts.base || "tests/baselines", opts.relative || "", opts.reference || "reference", file);
    const expected = io.readFile(reference);
    io.createDirectory(vpath.dirname(local));
    io.deleteFile(local);
    if (actual !== undefined) actual = toUtf8(actual);
    if (expected !== actual) {
        if (actual === undefined) {
            io.writeFile(local + ".delete", "");
        }
        else {
            io.writeFile(local, actual);
        }
        assert.fail(actual, expected, `The baseline file ${file} has changed.`);
    }
}