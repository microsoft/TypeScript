// When symlinked files are not in node_modules, realpath is not used.
// A symlink file acts like the real thing. So, 2 symlinks act like 2 different files.
// See GH#10364. 
// @noImplicitReferences: true
// @traceResolution: true
// @fullEmitPaths: true

// @filename: /shared/abc.ts
// @symlink: /src/shared/abc.ts,/src/shared2/abc.ts
export const x = 0;

// @filename: /src/app.ts
import { x } from "./shared/abc";
import { x as x2 } from "./shared2/abc";
x + x2;

// @filename: /src/tsconfig.json
{
    "compilerOptions": {
        "outDir": "bin"
    }
}

/*
# To reproduce in a real project:

mkdir shared
echo 'export const x = 0;' > shared/abc.ts

mkdir src; cd src
echo 'import { x } from "./shared/abc"; import { x as x2 } from "./shared2/abc"; x + x2;' > app.ts

ln -s ../shared ./shared; ln -s ../shared ./shared2 # Linux
# Windows: Open command prompt as administrator and run: `mklink /D shared ..\shared; mklink /D shared2 ..\shared`

echo '{ "compilerOptions": { "outDir": "bin" } }' > tsconfig.json
tsc # Should create `bin/app.js`, `bin/shared/abc.js`, and `bin/shared2/abc.js`
*/
