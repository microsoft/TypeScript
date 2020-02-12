function greeting(username: string, x: () => void) {
    x();
    return `Hello, ${username}!`;
}
greeting(12, () => {       // error
    greeting('hi', () => 12)  // ok
    greeting(12, () => 12) // error
});
