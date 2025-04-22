// Test for #61606

const result: boolean[] = [];
class Test {
    n: 42 | "" = 42 as any;
    foo(): void {
        if (this.n === "") {
            return;
        }
        for (let i = 0; i < 1; i++) {
            const localN = this.n;
            const localN_alias = localN;
            result[localN_alias] = true;
        }
    }
}
