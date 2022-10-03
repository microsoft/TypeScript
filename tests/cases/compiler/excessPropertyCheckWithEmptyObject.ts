// Repro from #14910

// Excess property error expected here
Object.defineProperty(window, "prop", { value: "v1.0.0", readonly: false });

interface A { x?: string }

// Excess property error expected here
let a: A & ThisType<any> = { y: 10 };

interface Empty {}

// Excess property error expected here
let x: Empty & { x: number } = { y: "hello" };
