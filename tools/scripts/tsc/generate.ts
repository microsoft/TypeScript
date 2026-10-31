import { fileURLToPath } from "node:url";
import { parseGeneratorArgs } from "../gen/utils.mts";
import generateEncoder from "./generate-encoder.ts";
import generateGoAST from "./generate-go-ast.ts";
import generateTSAST from "./generate-ts-ast.ts";
import { reloadSchema } from "./schema.ts";

export default function generate(force = false) {
    reloadSchema();
    generateEncoder(force);
    generateGoAST(force);
    generateTSAST(force);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    generate(parseGeneratorArgs({}).force);
}
