// @filename: tsconfig.json
{
    "compilerOptions": {
        "module": "AmD"
    }
}

// @filename: other.ts
export default 42;

// @filename: index.ts
import Answer from "./other.js";
const x = 10 + Answer;
export {
    x
};