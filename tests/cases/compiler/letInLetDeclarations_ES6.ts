// @target: es6

// All use of let in const declaration should be an error
let x = 50, let = 5;

{
    let x = 10, let = 20;
}