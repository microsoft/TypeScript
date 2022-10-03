import * as path from "path";
import { TSESLint } from "@typescript-eslint/utils";

export const ROOT_DIR = path.join(process.cwd(), "scripts", "eslint", "tests", "fixtures");
export const FILENAME = path.join(ROOT_DIR, "file.ts");
export const RuleTester = TSESLint.RuleTester;
