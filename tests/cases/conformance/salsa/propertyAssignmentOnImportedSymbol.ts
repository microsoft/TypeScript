// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: mod1.js
export var hurk = {}
// @Filename: bug24658.js
import { hurk } from './mod1'
hurk.expando = 4
