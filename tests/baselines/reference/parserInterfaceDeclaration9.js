//// [parserInterfaceDeclaration9.ts]
interface I1 {
    get foo(): number,
    set foo(value: number),
}

interface I2 {
    get foo(): number;
    set foo(value: number);
}

interface I3 {
    get foo(): number
    set foo(value: number)
}


//// [parserInterfaceDeclaration9.js]
