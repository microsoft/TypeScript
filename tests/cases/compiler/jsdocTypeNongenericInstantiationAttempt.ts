// @allowJs: true
// @noEmit: true
// @checkJs: true
// @filename: index.js
/**
 * @param {<T>(m: Boolean<T>) => string} somebody
 */
function sayHello(somebody) {
    return 'Hello ' + somebody;
}

// @filename: index2.js
/**
 * @param {<T>(m: Void<T>) => string} somebody
 */
function sayHello2(somebody) {
    return 'Hello ' + somebody;
}


// @filename: index3.js
/**
 * @param {<T>(m: Undefined<T>) => string} somebody
 */
function sayHello3(somebody) {
    return 'Hello ' + somebody;
}


// @filename: index4.js
/**
 * @param {<T>(m: Function<T>) => string} somebody
 */
function sayHello4(somebody) {
    return 'Hello ' + somebody;
}


// @filename: index5.js
/**
 * @param {<T>(m: String<T>) => string} somebody
 */
function sayHello5(somebody) {
    return 'Hello ' + somebody;
}


// @filename: index6.js
/**
 * @param {<T>(m: Number<T>) => string} somebody
 */
function sayHello6(somebody) {
    return 'Hello ' + somebody;
}


// @filename: index7.js
/**
 * @param {<T>(m: Object<T>) => string} somebody
 */
function sayHello7(somebody) {
    return 'Hello ' + somebody;
}

// @filename: index8.js
function fn() {}

/**
 * @param {fn<T>} somebody
 */
function sayHello8(somebody) { }