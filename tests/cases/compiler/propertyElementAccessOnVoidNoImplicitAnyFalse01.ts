// @noImplicitAny: false

let result = [1, 2, 3, 4].forEach(x => {
    console.log(x);
});

if (Math.random()) {
    result["hello"] = "foo";
    result.world = "foo";
}
else {
    console.log(result["hello"]);
    console.log(result.world);
}