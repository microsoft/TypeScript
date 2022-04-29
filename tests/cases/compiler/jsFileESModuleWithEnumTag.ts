// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: jsFileESModuleWithEnumTag.js
export {}; // mark as module
/** @enum {number} */
const ChangeDetectionStrategy = {
  OnPush: 0,
  Default: 1,
};
ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = 'OnPush';
ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = 'Default';
Object.defineProperty(ChangeDetectionStrategy, "aField", {value: 42});
/** @type {number} */
ChangeDetectionStrategy["bField"];

