// @allowJs: true
// @filename: defaultparams.js
// @out: dummy40.js
'use strict';

const PIZZA_TOPPING_DEFAULTS = {
    SARDINES: true,
    MUSTARD: true,
    PIQUANT_CHILI_SPRINKLES: true
};

/**
 * Set the user's first name.
 *
 * @param {string} firstName - The user's first name.
 */
function setFirstName(firstName = 'Buster') {}

/**
 * Set the user's last name.
 *
 * @param {string} [lastName=Braun] - The user's last name.
 */
function setLastName(lastName = 'Brown') {}

/**
 * Set the user's first, middle, and last names.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} middleName - The user's middle name.
 * @param {string} lastName - The user's last name.
 */
function setName(firstName, middleName = 'Bluster', lastName = 'Brown') {}

/**
 * Set the user's manager.
 *
 * @param {Manager} manager - The manager.
 */
function setManager(manager = {}) {}

/**
 * Set whether the user is currently active.
 *
 * @param {boolean} isActive - Set to `true` if active; otherwise, `false`.
 */
function setActive(isActive = true) {}

/**
 * Set the year in which the employee was born.
 * @param {number} year - The four-digit birth year.
 */
function setBirthYear(year = 3000) {}

/**
 * Set the name of the user's dog. At this time, only one dog is supported.
 *
 * @param {string} dogName - The name of the user's dog.
 */
function setDogName(dogName = '') {}

/**
 * Set the user's favorite pizza toppings.
 *
 * @param {PizzaToppings} toppings - The user's favorite toppings.
 */
function setPizzaToppings(toppings = PIZZA_TOPPING_DEFAULTS) {}
