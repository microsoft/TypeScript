// @declaration: true
export enum MouseButton {
	LEFT_BUTTON = 1,
	RIGHT_BUTTON = 2,
	MIDDLE_BUTTON = 4,
	XBUTTON1_BUTTON = 5,
	XBUTTON2_BUTTON = 6,
	NO_BUTTON = 0,
}

export const DOMMouseButton = {
	'-1': MouseButton.NO_BUTTON,
	"0": MouseButton.LEFT_BUTTON,
	"1": MouseButton.MIDDLE_BUTTON,
	"2": MouseButton.RIGHT_BUTTON,
	"3": MouseButton.XBUTTON1_BUTTON,
	"4": MouseButton.XBUTTON2_BUTTON,
};