// Repro from #17041

interface Named {
    name: string;
}

function parrot<T extends Named>(obj: T): T {
    return obj;
}


parrot({
    name: "TypeScript",
});

parrot({
    name: "TypeScript",
    age: 5,
});

parrot({
    name: "TypeScript",
    age: function () { },
});

parrot({
    name: "TypeScript",
    sayHello() {
    },
});
