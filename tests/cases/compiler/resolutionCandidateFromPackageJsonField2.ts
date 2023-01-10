// @moduleResolution: node10,bundler

// @filename: tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "foo/*": ["./dist/*"],
            "baz/*.ts": ["./types/*.d.ts"]
        }
    }
}

// @filename: dist/bar.ts
export const a = 1234;

// @filename: types/main.d.ts
export const b: string;

// @filename: test.ts
import { a } from "foo/bar.ts";
import { b } from "baz/main.ts";
