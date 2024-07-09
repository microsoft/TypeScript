export default function foo(value: number): number
export default function foo(value: string): string
export default function foo(value: string | number): string | number {
    return 1
}
declare class Foo {}
export default Foo
export default interface Bar {}
