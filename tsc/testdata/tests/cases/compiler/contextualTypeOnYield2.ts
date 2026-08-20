// @strict: true
// @target: ES6

type OrGen = () => (number | Generator<string, (arg: number) => void, undefined>);
const g: OrGen = function* () {
    return (num) => console.log(num);
}