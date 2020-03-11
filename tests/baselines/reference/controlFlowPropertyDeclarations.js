//// [controlFlowPropertyDeclarations.ts]
// Repro from ##8913

declare var require:any;

var HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');

// Populate property map with ReactJS's attribute and property mappings
// TODO handle/use .Properties value eg: MUST_USE_PROPERTY is not HTML attr
for (var propname in HTMLDOMPropertyConfig.Properties) {
  if (!HTMLDOMPropertyConfig.Properties.hasOwnProperty(propname)) {
    continue;
  }

  var mapFrom = HTMLDOMPropertyConfig.DOMAttributeNames[propname] || propname.toLowerCase();
}

/**
 * Repeats a string a certain number of times.
 * Also: the future is bright and consists of native string repetition:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 *
 * @param {string} string  String to repeat
 * @param {number} times   Number of times to repeat string. Integer.
 * @see http://jsperf.com/string-repeater/2
 */
function repeatString(string, times) {
  if (times === 1) {
    return string;
  }
  if (times < 0) { throw new Error(); }
  var repeated = '';
  while (times) {
    if (times & 1) {
      repeated += string;
    }
    if (times >>= 1) {
      string += string;
    }
  }
  return repeated;
}

/**
 * Determine if the string ends with the specified substring.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {boolean}
 */
function endsWith(haystack, needle) {
  return haystack.slice(-needle.length) === needle;
}

/**
 * Trim the specified substring off the string. If the string does not end
 * with the specified substring, this is a no-op.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {string}
 */
function trimEnd(haystack, needle) {
  return endsWith(haystack, needle)
    ? haystack.slice(0, -needle.length)
    : haystack;
}

/**
 * Convert a hyphenated string to camelCase.
 */
function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
}

/**
 * Determines if the specified string consists entirely of whitespace.
 */
function isEmpty(string) {
   return !/[^\s]/.test(string);
}

/**
 * Determines if the CSS value can be converted from a
 * 'px' suffixed string to a numeric value
 *
 * @param {string} value CSS property value
 * @return {boolean}
 */
function isConvertiblePixelValue(value) {
  return /^\d+px$/.test(value);
}

export class HTMLtoJSX {
    private output: string;
    private level: number;
    private _inPreTag: boolean;


  /**
   * Handles processing of the specified text node
   *
   * @param {TextNode} node
   */
  _visitText = (node) => {
    var parentTag = node.parentNode && node.parentNode.tagName.toLowerCase();
    if (parentTag === 'textarea' || parentTag === 'style') {
      // Ignore text content of textareas and styles, as it will have already been moved
      // to a "defaultValue" attribute and "dangerouslySetInnerHTML" attribute respectively.
      return;
    }

    var text = ''

    if (this._inPreTag) {
      // If this text is contained within a <pre>, we need to ensure the JSX
      // whitespace coalescing rules don't eat the whitespace. This means
      // wrapping newlines and sequences of two or more spaces in variables.
      text = text
        .replace(/\r/g, '')
        .replace(/( {2,}|\n|\t|\{|\})/g, function(whitespace) {
          return '{' + JSON.stringify(whitespace) + '}';
        });
    } else {
      // If there's a newline in the text, adjust the indent level
      if (text.indexOf('\n') > -1) {
      }
    }
    this.output += text;
  }



};

/**
 * Handles parsing of inline styles
 */
export class StyleParser {
  styles = {};
  toJSXString = () => {
    for (var key in this.styles) {
      if (!this.styles.hasOwnProperty(key)) {
      }
    }
  }
}

//// [controlFlowPropertyDeclarations.js]
"use strict";
// Repro from ##8913
exports.__esModule = true;
exports.StyleParser = exports.HTMLtoJSX = void 0;
var HTMLDOMPropertyConfig = require('react/lib/HTMLDOMPropertyConfig');
// Populate property map with ReactJS's attribute and property mappings
// TODO handle/use .Properties value eg: MUST_USE_PROPERTY is not HTML attr
for (var propname in HTMLDOMPropertyConfig.Properties) {
    if (!HTMLDOMPropertyConfig.Properties.hasOwnProperty(propname)) {
        continue;
    }
    var mapFrom = HTMLDOMPropertyConfig.DOMAttributeNames[propname] || propname.toLowerCase();
}
/**
 * Repeats a string a certain number of times.
 * Also: the future is bright and consists of native string repetition:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 *
 * @param {string} string  String to repeat
 * @param {number} times   Number of times to repeat string. Integer.
 * @see http://jsperf.com/string-repeater/2
 */
function repeatString(string, times) {
    if (times === 1) {
        return string;
    }
    if (times < 0) {
        throw new Error();
    }
    var repeated = '';
    while (times) {
        if (times & 1) {
            repeated += string;
        }
        if (times >>= 1) {
            string += string;
        }
    }
    return repeated;
}
/**
 * Determine if the string ends with the specified substring.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {boolean}
 */
function endsWith(haystack, needle) {
    return haystack.slice(-needle.length) === needle;
}
/**
 * Trim the specified substring off the string. If the string does not end
 * with the specified substring, this is a no-op.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {string}
 */
function trimEnd(haystack, needle) {
    return endsWith(haystack, needle)
        ? haystack.slice(0, -needle.length)
        : haystack;
}
/**
 * Convert a hyphenated string to camelCase.
 */
function hyphenToCamelCase(string) {
    return string.replace(/-(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}
/**
 * Determines if the specified string consists entirely of whitespace.
 */
function isEmpty(string) {
    return !/[^\s]/.test(string);
}
/**
 * Determines if the CSS value can be converted from a
 * 'px' suffixed string to a numeric value
 *
 * @param {string} value CSS property value
 * @return {boolean}
 */
function isConvertiblePixelValue(value) {
    return /^\d+px$/.test(value);
}
var HTMLtoJSX = /** @class */ (function () {
    function HTMLtoJSX() {
        var _this = this;
        /**
         * Handles processing of the specified text node
         *
         * @param {TextNode} node
         */
        this._visitText = function (node) {
            var parentTag = node.parentNode && node.parentNode.tagName.toLowerCase();
            if (parentTag === 'textarea' || parentTag === 'style') {
                // Ignore text content of textareas and styles, as it will have already been moved
                // to a "defaultValue" attribute and "dangerouslySetInnerHTML" attribute respectively.
                return;
            }
            var text = '';
            if (_this._inPreTag) {
                // If this text is contained within a <pre>, we need to ensure the JSX
                // whitespace coalescing rules don't eat the whitespace. This means
                // wrapping newlines and sequences of two or more spaces in variables.
                text = text
                    .replace(/\r/g, '')
                    .replace(/( {2,}|\n|\t|\{|\})/g, function (whitespace) {
                    return '{' + JSON.stringify(whitespace) + '}';
                });
            }
            else {
                // If there's a newline in the text, adjust the indent level
                if (text.indexOf('\n') > -1) {
                }
            }
            _this.output += text;
        };
    }
    return HTMLtoJSX;
}());
exports.HTMLtoJSX = HTMLtoJSX;
;
/**
 * Handles parsing of inline styles
 */
var StyleParser = /** @class */ (function () {
    function StyleParser() {
        var _this = this;
        this.styles = {};
        this.toJSXString = function () {
            for (var key in _this.styles) {
                if (!_this.styles.hasOwnProperty(key)) {
                }
            }
        };
    }
    return StyleParser;
}());
exports.StyleParser = StyleParser;
