// @Filename: index.ts
export default 0;

// @Filename: a/index.ts
export default 1;

// @Filename: a/a.ts
import parent from "..";
import here from ".";
parent + here;
