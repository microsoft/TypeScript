// @moduleResolution: classic,node,node16,nodenext,hybrid
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /project/a.js
export default "a.js";

// @Filename: /project/a.js.js
export default "a.js.js";

// @Filename: /project/b.ts
import a from "./a.js";
