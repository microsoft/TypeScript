// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @enum {number} */
const MyEnum = {
  a: 1,
  b: 2
};
export default MyEnum;

// @Filename: use.js
import MyEnum from "./def";

/** @type {MyEnum} */
const v = MyEnum.b;
