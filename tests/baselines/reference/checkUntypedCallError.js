//// [checkUntypedCallError.ts]
function greeting(username: string, x: () => void) {
    x();
    return `Hello, ${username}!`;
}
greeting(12, () => {       // error
    greeting('hi', () => 12)  // ok
    greeting(12, () => 12) // error
});


//// [checkUntypedCallError.js]
function greeting(username, x) {
    x();
    return "Hello, " + username + "!";
}
greeting(12, function () {
    greeting('hi', function () { return 12; }); // ok
    greeting(12, function () { return 12; }); // error
});
