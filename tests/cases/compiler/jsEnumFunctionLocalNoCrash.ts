// @noEmit: true
// @checkJs: true
// @allowJs: true
// @filename: index.js
function defineCommonExtensionSymbols(apiPrivate) {
    /** @enum {string} */
    apiPrivate.Events = {
      ButtonClicked: 'button-clicked-',
      PanelObjectSelected: 'panel-objectSelected-',
      NetworkRequestFinished: 'network-request-finished',
      OpenResource: 'open-resource',
      PanelSearch: 'panel-search-',
      RecordingStarted: 'trace-recording-started-',
      RecordingStopped: 'trace-recording-stopped-',
      ResourceAdded: 'resource-added',
      ResourceContentCommitted: 'resource-content-committed',
      ViewShown: 'view-shown-',
      ViewHidden: 'view-hidden-'
    };
}
