module.exports = deprecate

function deprecate (func, message) {
  return function () {
    const caller = (new Error()).stack.split('\n')[2]
    console.warn('DEPRECATED: ' + message)
    console.warn(caller)

    return func.apply(null, arguments)
  }
}
