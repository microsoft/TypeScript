// @allowJs: true
// @filename: emptycomments.js
// @out: dummy47.js
/** */
function first() {}

/**    */
function second() {}

// the next comment must contain a single hard tab (\t) character
/** 	 */
function third() {}

// the next comment must contain at least two hard tab (\t) characters
/** 			 */
function fourth() {}

// the next comment must contain one newline (\n) character
/**
 */
function fifth() {}

// the next comment must contain multiple newline (\n) characters
/**
 *
 *
 *
 *
 */
function sixth() {}
