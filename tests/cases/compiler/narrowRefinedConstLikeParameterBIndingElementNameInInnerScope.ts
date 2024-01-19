// @strict: true
// @noEmit: true

function ff({ a, b }: { a: string | undefined, b: () => void }) {
  if (a !== undefined) {
    b = () => {
      const x: string = a;
    }
  }
}
