// @target: es5

// All use of let in const declaration should be an error
const x = 50, let = 5;

{
    const x = 10, let = 20;
}