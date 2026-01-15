// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

export function test(fn) {
  const composed = function (...args) { }

  Object.defineProperty(composed, 'name', {
    value: composed.fn + '_test'
  })

  return composed
}
