// @ts-check
/**
 * @param {string} message
 * @returns {never}
 */
function fail(message) {
    throw new Error(message);
}

/**
 * @param {number} value
 */
function base64FormatEncode(value) {
    return value < 0 ? fail("Invalid value") :
        value < 26 ? 0x41 /*A*/ + value :
        value < 52 ? 0x61 /*a*/ + value - 26 :
        value < 62 ? 0x30 /*0*/ + value - 52 :
        value === 62 ? 0x2B /*+*/ :
        value === 63 ? 0x2F /*/*/ :
        fail("Invalid value");
}

/**
 * @param {number} value
 */
function base64VLQFormatEncode(value) {
    if (value < 0) {
        value = ((-value) << 1) + 1;
    }
    else {
        value = value << 1;
    }

    // Encode 5 bits at a time starting from least significant bits
    let result = "";
    do {
        let currentDigit = value & 31; // 11111
        value = value >> 5;
        if (value > 0) {
            // There are still more digits to decode, set the msb (6th bit)
            currentDigit = currentDigit | 32;
        }
        result += String.fromCharCode(base64FormatEncode(currentDigit));
    } while (value > 0);

    return result;
}
exports.base64VLQFormatEncode = base64VLQFormatEncode;

/** @typedef {object} RawSourceMap */
