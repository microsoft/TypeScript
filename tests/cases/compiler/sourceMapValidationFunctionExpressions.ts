// @sourcemap: true
var greetings = 0;
var greet = (greeting: string): number => {
    greetings++;
    return greetings;
}
greet("Hello");
var incrGreetings = () => greetings++;