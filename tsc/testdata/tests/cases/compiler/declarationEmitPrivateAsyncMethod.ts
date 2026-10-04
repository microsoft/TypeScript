// @declaration: true
// @filename: a.ts
export class C {
    /**
     * Non Async function
     */
    private a(): void {
    }

    /**
     * Async function
     */
    private async b(): Promise<void> {
    }
}
