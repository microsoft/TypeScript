declare function foo(x: (y: string) => (y2: number) => void);

// Contextually type the parameter even if there is a return annotation
foo((y): (y2: number) => void => {
    var z = y.charAt(0); // Should be string
    return null;
});

foo((y: string) => {
    return y2 => {
        var z = y2.toFixed(); // Should be string
        return 0;
    };
});