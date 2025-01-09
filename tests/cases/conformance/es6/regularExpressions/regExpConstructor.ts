// @strict: true
// @target: es2015

// Flags should be copied
const regex1 = new RegExp(/foo/i);

// Flags should be copied
const regex2 = new RegExp(/foo/i, undefined);

// Flags should not be copied
const regex3 = new RegExp(/foo/i, "dgi");

// Flags should not be copied
const regex4 = new RegExp(/foo/i, Math.random() >= 0.5 ? "dgi" : undefined);
