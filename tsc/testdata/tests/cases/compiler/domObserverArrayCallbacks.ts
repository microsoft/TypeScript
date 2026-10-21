// @strict: true
// @target: es2015
// @lib: es2015,dom

new ResizeObserver(entries => entries[0]);
new MutationObserver(records => records.some(record => record.attributeName === "style"));
new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting));
