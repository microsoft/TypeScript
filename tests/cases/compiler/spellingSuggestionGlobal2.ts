export {}
declare global { const x: any }
const globals = { x: true }
global.x // should suggest `globals` (GH#42209)
