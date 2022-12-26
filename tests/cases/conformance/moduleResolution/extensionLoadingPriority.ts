// @moduleResolution: classic,node,node16,nodenext,bundler
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /project/a.js
export default "a.js";

// @Filename: /project/a.js.js
export default "a.js.js";

// @Filename: /project/dir/index.ts
export default "dir/index.ts";

// @Filename: /project/dir.js
export default "dir.js";

// @Filename: /project/b.ts
import a from "./a.js";
import dir from "./dir";
