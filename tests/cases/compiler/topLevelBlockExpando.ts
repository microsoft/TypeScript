// https://github.com/microsoft/TypeScript/issues/31972

// @allowJs: true
// @noEmit: true
// @checkJs: true

// @filename: check.ts

// https://github.com/microsoft/TypeScript/issues/31972
interface Person {
  first: string;
  last: string;
}

{
  const dice = () => Math.floor(Math.random() * 6);
  dice.first = 'Rando';  
  dice.last = 'Calrissian';
  const diceP: Person = dice;  
}

// @filename: check.js

// Creates a type { first:string, last: string }
/**
 * @typedef {Object} Human - creates a new type named 'SpecialType'
 * @property {string} first - a string property of SpecialType
 * @property {string} last - a number property of SpecialType
 */

/**
 * @param {Human} param used as a validation tool
 */
function doHumanThings(param) {}

const dice1 = () => Math.floor(Math.random() * 6);
// dice1.first = 'Rando';
dice1.last = 'Calrissian';

// doHumanThings(dice)

// but inside a block... you can't call  a human
{
  const dice2 = () => Math.floor(Math.random() * 6);
  dice2.first = 'Rando';
  dice2.last = 'Calrissian'; 
  
  doHumanThings(dice2)
}
