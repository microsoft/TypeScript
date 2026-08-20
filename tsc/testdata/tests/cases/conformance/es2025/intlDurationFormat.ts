// @target: esnext
// @lib: es2024,es2025.intl
// @noemit: true
// @strict: true

new Intl.DurationFormat('en').format({
  years: 1,
  hours: 20,
  minutes: 15,
  seconds: 35
});
