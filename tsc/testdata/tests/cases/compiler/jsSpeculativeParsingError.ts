// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: t.js

const is_morning = new Date().getHours() < 12;

// prettier-ignore
const greeting = ([
  is_morning ? 'good morning' : 'good evening'
]);
