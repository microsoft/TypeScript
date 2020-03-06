// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: propertyAssignmentUseParentType2.js

/** @type {{ (): boolean; nuo: 789 }} */
export const inlined = () => true
inlined.nuo = 789

/** @type {{ (): boolean; nuo: 789 }} */
export const duplicated = () => true
/** @type {789} */
duplicated.nuo = 789

/** @type {{ (): boolean; nuo: 789 }} */
export const conflictingDuplicated = () => true
/** @type {1000} */
conflictingDuplicated.nuo = 789
