// @target: esnext

new Intl.DateTimeFormat().formatToParts().find((val) => val.type === 'fractionalSecond')