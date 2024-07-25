// @allowJs: true
// @outDir: out

// @Filename: /lib/constants.js
module.exports = {
  str: 'x',
};

// @Filename: /src/constants.ts
import * as tsConstants from "../lib/constants";
export { tsConstants };