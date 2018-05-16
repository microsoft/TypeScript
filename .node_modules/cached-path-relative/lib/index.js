/**
 * Modules
 */

var path = require('path')

/**
 * Vars
 */

var relative = path.relative
var lastCwd = process.cwd()
var cache = {}

/**
 * Expose cachedPathRelative
 */

module.exports = cachedPathRelative

/**
 * cachedPathRelative
 */

function cachedPathRelative (from, to) {
  // If the current working directory changes, we need
  // to invalidate the cache
  var cwd = process.cwd()
  if (cwd !== lastCwd) {
    cache = {}
    lastCwd = cwd
  }

  if (cache[from] && cache[from][to]) return cache[from][to]

  var result = relative.call(path, from, to)

  cache[from] = cache[from] || {}
  cache[from][to] = result

  return result

}
