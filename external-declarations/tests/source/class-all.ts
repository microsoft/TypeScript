export class Person {
    age: number = 1;
    greet(): void {
        console.log("Hi")
    }

    overloaded(a: number): number;
    overloaded(a: string): string;
    overloaded(a: any): any{
        return a;
    }

    get ageAccessor(): number {
        return this.age;
    }
    set ageAccessor(value: number) {
        this.age = value;
    }
}