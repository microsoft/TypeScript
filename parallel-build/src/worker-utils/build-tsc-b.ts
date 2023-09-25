import ts from "typescript";

import type {
    Message,
} from "../protocol.js";
import {
    parseConfigHostFromCompilerHostLike,
} from "./utils.js";

export function buildTSCB(value: Extract<Message, { type: "tsc-b"; }>) {
    const buildHost = ts.createSolutionBuilderHost(
        ts.sys,
        /*createProgram*/ undefined,
        d => {
            console.log(d.messageText);
        },
    );

    buildHost.getParsedCommandLine = fileName => {
        const parserHost = parseConfigHostFromCompilerHostLike(buildHost, ts.sys);
        const config = ts.getParsedCommandLineOfConfigFile(fileName, value.tsconfigOverrides, parserHost);
        return config;
    };
    const builder = ts.createSolutionBuilder(buildHost, [value.project], {});
    builder.build();
}
