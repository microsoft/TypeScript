export {}
declare global { const x: any }
global.x // should not suggest `global` (GH#42209)
