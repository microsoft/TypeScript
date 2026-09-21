import { parseGeneratorArgs } from "../../../tools/scripts/gen/utils.mts";
import generateEncoder from "../../../tools/scripts/tsc/generate-encoder.ts";
import generateAST from "../../../tools/scripts/tsc/generate-ts-ast.ts";
import { generateSync } from "./generateSync.ts";

const { force } = parseGeneratorArgs({});
generateAST(force);
generateEncoder(force);
generateSync(force);
