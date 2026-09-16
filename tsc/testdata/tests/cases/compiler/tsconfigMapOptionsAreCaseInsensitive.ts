// @target: es2015
// @filename: tsconfig.json
{
    "compilerOptions": {
        "module": "CoMmOnJs"
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
