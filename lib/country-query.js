var _ = require('lodash')
_.mixin(require('lodash-deep'))
var cs = require('world-countries')

var PROP_TYPE_ARRAY = 'array',
    PROP_TYPE_MAP = 'map',
    PROP_TYPE_DEEP_STRING = 'deep_string',
    PROP_TYPE_LANG_KEYED_NAME = 'lang_keyed_name',
    PROP_TYPE_STRING = 'string'

var propTypes = {
  'tld': PROP_TYPE_ARRAY,
  'currency': PROP_TYPE_ARRAY,
  'callingCode': PROP_TYPE_ARRAY,
  'altSpellings': PROP_TYPE_ARRAY,
  'latlng': PROP_TYPE_ARRAY,
  'borders': PROP_TYPE_ARRAY,
  'name.common': PROP_TYPE_DEEP_STRING,
  'name.official': PROP_TYPE_DEEP_STRING,
  'name.native': PROP_TYPE_LANG_KEYED_NAME,
  'translations': PROP_TYPE_LANG_KEYED_NAME,
  'languages': PROP_TYPE_MAP,
  'cca2': PROP_TYPE_STRING,
  'ccn3': PROP_TYPE_STRING,
  'cca3': PROP_TYPE_STRING,
  'capital': PROP_TYPE_STRING,
  'relevance': PROP_TYPE_STRING,
  'region': PROP_TYPE_STRING,
  'subregion': PROP_TYPE_STRING,
  'demonym': PROP_TYPE_STRING,
  'landlocked': PROP_TYPE_STRING,
  'area': PROP_TYPE_STRING,
}

var CountryQuery = {
  
  /**
   * Find country information by some property.
   * @param  {string} by    Name of the property to search by.
   * @param  {mixed}  value The value to search for.
   * @return {mixed}        null, a country object or array of coutnry objects.
   */
  find: function(by, value) {
    var propType = typeof by === 'string' ? propTypes[by] : 'unknown';
    
    switch (propType) {
      case PROP_TYPE_ARRAY:
        return findByArrayProp(by, value)
      
      case PROP_TYPE_DEEP_STRING:
        return findByDeepStringProp(by, value)
      
      case PROP_TYPE_LANG_KEYED_NAME:
        return findByLangKeyedName(by, value)
      
      case PROP_TYPE_MAP:
        return findByMapProp(by, value)
      
      case PROP_TYPE_STRING:
        return findByStringProp(by, value)
    }
    return null
  }
};

/**
 * Searches properties that contain array values.
 * @param  {string} prop  Name of the prop to search by
 * @param  {mixed}  value Value to find
 * @return {mixed}        See filteredToResult
 */
function findByArrayProp(prop, value) {
  var filtered = _.filter(cs, function(c) {
    return _.includes(c[prop], value)
  });
  
  return filteredToResult(filtered)
}

/**
 * Searches properties that contain strings but are nested inside another
 * property (e.g. 'name.common').
 * @param  {string} propPath A property path
 * @param  {string} value    Value to find
 * @return {mixed}           See filteredToResult
 */
function findByDeepStringProp(propPath, value) {
  var filtered = _.filter(cs, function(v) {
    return _.deepGet(v, propPath) === value
  });
  
  return filteredToResult(filtered)
}

/**
 * Searches properties that contain a list of names keyed by language code:
 * 
 *   {
 *     "nld": { "official": "Aruba", "common": "Aruba"},
 *     "pap": {"official": "Aruba", "common": "Aruba"}
 *   }
 * 
 * @param  {string} propPath A property path
 * @param  {string} value    The name to find
 * @return {mixed}           See filteredToResult
 */
function findByLangKeyedName(propPath, value) {
  // "propPath": {
  //   "nld": { "official": "Aruba", "common": "Aruba"},
  //   "pap": {"official": "Aruba", "common": "Aruba"}
  // }
  var filtered = _.filter(cs, function(v) {
    var nameObj = _.deepGet(v, propPath)
    return _.some(nameObj, {official: value}) || _.some(nameObj, {common: value});
  });
  
  return filteredToResult(filtered)
}

/**
 * Searches properties that contain a key/value map.
 * @param  {string} prop  A property name
 * @param  {mixed}  value Value to find
 * @return {mixed}        See filteredToResult
 */
function findByMapProp(prop, value) {
  var filtered = _.filter(cs, function(c) {
    return _(c[prop]).values().some(function(v) {
      return v === value 
    })
  })
  
  return filteredToResult(filtered)
}

/**
 * Searches properties that contain string values.
 * @param  {string} prop  Name of the prop to search by
 * @param  {mixed}  value Value to find
 * @return {mixed}        See filteredToResult
 */
function findByStringProp(prop, value) {
  var filtered = _.filter(cs, prop, value)
  
  return filteredToResult(filtered)
}

/**
 * Takes a filtered array as returned by lodash and returns the appropriate 
 * value for returning from Countries.find()
 * @param  {array} filtered 
 * @return {mixed}          null when filtered is empty, an object when filtered
 *                          only contains 1 result or the whole of 'filtered'
 *                          otherwise
 */
function filteredToResult(filtered) {
  switch (filtered.length) {
    case 0:
    return null
    
    case 1:
    return _.first(filtered)
    
    default:
    return filtered
  }
}

module.exports = CountryQuery