var SMConsumer  =  require('source-map').SourceMapConsumer;

/**
 * @name mappingsFromMap
 * @function
 * @param map {Object} the JSON.parse()'ed map
 * @return {Array} array of mappings
 */
module.exports = function (map) {
  var consumer = new SMConsumer(map);
  var mappings = [];

  consumer.eachMapping(function (mapping) {
    // only set source if we have original position to handle edgecase (see inline-source-map tests)
    mappings.push({
      original: mapping.originalColumn != null ? {
        column: mapping.originalColumn
      , line: mapping.originalLine
      } : undefined
    , generated: {
        column: mapping.generatedColumn
      , line: mapping.generatedLine
      }
    , source: mapping.originalColumn != null ? mapping.source : undefined
    , name: mapping.name
    });
  });

  return mappings;
}
