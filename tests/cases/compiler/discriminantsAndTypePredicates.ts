// Repro from #10145

interface A { type: 'A' }
interface B { type: 'B' }

function isA(x: A | B): x is A { return x.type === 'A'; }
function isB(x: A | B): x is B { return x.type === 'B'; }

function foo1(x: A | B): any {
    x;  // A | B
    if (isA(x)) {
        return x;  // A
    }
    x;  // B
    if (isB(x)) {
        return x;  // B
    }
    x;  // never
}

function foo2(x: A | B): any {
    x;  // A | B
    if (x.type === 'A') {
        return x;  // A
    }
    x;  // B
    if (x.type === 'B') {
        return x;  // B
    }
    x;  // never
}

// Repro from #30557

interface TypeA {
    Name: "TypeA";
    Value1: "Cool stuff!";
}

interface TypeB {
    Name: "TypeB";
    Value2: 0;
}

type Type = TypeA | TypeB;

declare function isType(x: unknown): x is Type;

function WorksProperly(data: Type) {
    if (data.Name === "TypeA") {
	// TypeA
	const value1 = data.Value1;
    }
}

function DoesNotWork(data: unknown) {
    if (isType(data)) {
	if (data.Name === "TypeA") {
	    // TypeA
	    const value1 = data.Value1;
	}
    }
}

function narrowToNever(data: Type): "Cool stuff!" | 0 {
    if (data.Name === "TypeA") {
        return data.Value1;
    }
    if (data.Name === "TypeB") {
        return data.Value2;
    }
    return data;
}

function narrowToNeverUnknown(data: unknown): "Cool stuff!" | 0 {
    if (isType(data)) {
        if (data.Name === "TypeA") {
            return data.Value1;
        }
        if (data.Name === "TypeB") {
            return data.Value2;
        }
        return data;
    }
}
