/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /src/admin/utils/db/db.ts
//// export const db = {};

// @Filename: /src/admin/utils/db/index.ts
//// export * from "./db";

// @Filename: /src/client/helpers/db.ts
//// export const db = {};

// @Filename: /src/client/db.ts
//// export const db = {};

// @Filename: /src/client/foo.ts
//// db/**/

goTo.marker("");
verify.importFixAtPosition([
  `import { db } from "./db";\n\ndb`,
  `import { db } from "./helpers/db";\n\ndb`,
  `import { db } from "../admin/utils/db";\n\ndb`,
  `import { db } from "../admin/utils/db/db";\n\ndb`
]);
