module.exports = parseOptions

const defaults = require('lodash/defaults')
const pick = require('lodash/pick')

const getRequestAgent = require('./get-request-agent')
const DEFAULTS = require('./defaults')
const OPTION_NAMES = [
  'timeout',
  'baseUrl',
  'agent',
  'headers'
]

function parseOptions (userOptions) {
  if (!userOptions) {
    userOptions = {}
  }

  if ('followRedirects' in userOptions) {
    console.warn('DEPRECATED: followRedirects option is no longer supported. All redirects are followed correctly')
  }

  if ('protocol' in userOptions) {
    console.warn('DEPRECATED: protocol option is no longer supported')
  }

  if ('host' in userOptions) {
    console.warn('DEPRECATED: host option is no longer supported')
  }

  if ('port' in userOptions) {
    console.warn('DEPRECATED: port option is no longer supported')
  }

  if ('pathPrefix' in userOptions) {
    console.warn('DEPRECATED: pathPrefix option is no longer supported')
  }

  if ('Promise' in userOptions) {
    console.warn('DEPRECATED: Promise option is no longer supported. The native Promise API is used')
  }

  const options = defaults(pick(userOptions, OPTION_NAMES), DEFAULTS)

  const clientDefaults = {
    baseUrl: options.baseUrl,
    headers: options.headers,
    request: {
      timeout: options.timeout
    }
  }
  if (userOptions.protocol) {
    clientDefaults.baseUrl = `${userOptions.protocol}://${userOptions.host}`

    if (userOptions.port) {
      clientDefaults.baseUrl += `:${userOptions.port}`
    }

    // Check if a prefix is passed in the options and strip any leading or trailing slashes from it.
    if (userOptions.pathPrefix) {
      clientDefaults.baseUrl += '/' + userOptions.pathPrefix.replace(/(^[/]+|[/]+$)/g, '')
    }
  }
  /* istanbul ignore else */

  if (!process.browser) {
    clientDefaults.request.agent = getRequestAgent(clientDefaults.baseUrl, userOptions)
  }

  return clientDefaults
}
