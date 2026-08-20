// @target: es2017,es2022,es2025
// @noEmit: true

// Pattern modifiers are only available from ES2025.
const addModifier = /(?i:abc)/;
const removeModifier = /(?-i:abc)/;
const addAndRemoveModifiers = /(?i-ms:abc)/;

// A plain non-capturing group is not a pattern modifier and is available at every target.
const nonCapturingGroup = /(?:abc)/;

// Duplicate named capturing groups are only available from ES2025.
const duplicateNames = /(?<year>\d{4})-\d{2}|\d{2}\/(?<year>\d{4})/;
const duplicateNamesWithReference = /(?<a>x)\k<a>|(?<a>y)/;

// Named capturing groups that are not duplicated remain available from ES2018.
const distinctNames = /(?<a>x)|(?<b>y)/;

// Duplicate names within the same alternative are an error at every target.
const sameAlternative = /(?<dup>x)(?<dup>y)/;
