import * as path from "path";
import { TSESLint } from "@typescript-eslint/experimental-utils";

export const ROOT_DIR = path.resolve(__dirname);
export const RuleTester = TSESLint.RuleTester;
