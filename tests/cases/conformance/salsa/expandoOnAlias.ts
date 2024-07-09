// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @Filename: vue.js
export class Vue {}
export const config = { x: 0 };

// @Filename: test.js
import { Vue, config } from "./vue";

// Expando declarations aren't allowed on aliases.
Vue.config = {};
new Vue();

// This is not an expando declaration; it's just a plain property assignment.
config.x = 1;

// This is not an expando declaration; it works because non-strict JS allows
// loosey goosey assignment on objects.
config.y = {};
config.x;
config.y;
