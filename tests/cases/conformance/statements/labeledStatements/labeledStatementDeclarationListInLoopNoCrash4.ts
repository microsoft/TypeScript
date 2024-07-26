// @strict: true
// @target: es5
// @noTypesAndSymbols: true

export class ParseThemeData {
  parseButton(button: any) {
    const {type, size} = button;
    for (let item of type) {
      const fontType = item.type;
      const style = (state: string) => `color: var(--button-${fontType}-${state}-font-color)`;
      this.classFormat(`${style('active')});
    }
    for (let item of size) {
      const fontType = item.type;
      this.classFormat(
        [
          `font-size: var(--button-size-${fontType}-fontSize)`,
          `height: var foo`,
        ].join(';')
      );
    }
  }
}
