var _ = require('lodash')
var cs = require('world-countries')

var PROP_TYPE_ARRAY = 'array',
  PROP_TYPE_MAP = 'map',
  PROP_TYPE_DEEP_STRING = 'deep_string',
  PROP_TYPE_LANG_KEYED_NAME = 'lang_keyed_name',
  PROP_TYPE_STRING = 'string'

var propTypes = {
  tld: PROP_TYPE_ARRAY,
  currency: PROP_TYPE_ARRAY,
  callingCode: PROP_TYPE_ARRAY,
  altSpellings: PROP_TYPE_ARRAY,
  latlng: PROP_TYPE_ARRAY,
  borders: PROP_TYPE_ARRAY,
  'name.common': PROP_TYPE_DEEP_STRING,
  'name.official': PROP_TYPE_DEEP_STRING,
  'name.native': PROP_TYPE_LANG_KEYED_NAME,
  translations: PROP_TYPE_LANG_KEYED_NAME,
  languages: PROP_TYPE_MAP,
  cca2: PROP_TYPE_STRING,
  ccn3: PROP_TYPE_STRING,
  cca3: PROP_TYPE_STRING,
  cioc: PROP_TYPE_STRING,
  capital: PROP_TYPE_ARRAY,
  region: PROP_TYPE_STRING,
  subregion: PROP_TYPE_STRING,
  demonym: PROP_TYPE_STRING,
  landlocked: PROP_TYPE_STRING,
  area: PROP_TYPE_STRING,
}

var CountryQuery = {
  /**
   * Find country information by some property.
   * @param  {string} by    Name of the property to search by.
   * @param  {mixed}  value The value to search for (case insensitive).
   * @return {mixed}        null, a country object or array of coutnry objects.
   */
  find: function (by, value) {
    var propType = typeof by === 'string' ? propTypes[by] : 'unknown'

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
  },

  /**
   * Find country by its area.
   * @param  {number} area
   * @return {mixed} See #find()
   */
  findByArea: function (area) {
    return this.find('area', area)
  },

  /**
   * Find country by alternative spellings of its name.
   * @param  {string} altSpelling
   * @return {mixed} See #find()
   */
  findByAltSpelling: function (altSpelling) {
    return this.find('altSpellings', altSpelling)
  },

  /**
   * Find country by countries that it borders
   * @param  {string} borders
   * @return {mixed} See #find()
   */
  findByBorders: function (borders) {
    return this.find('borders', borders)
  },

  /**
   * Find country by telephone calling code
   * @param  {string} callingCode
   * @return {mixed} See #find()
   */
  findByCallingCode: function (callingCode) {
    return this.find('callingCode', callingCode)
  },

  /**
   * Find country by its capital city.
   * @param  {string} capital
   * @return {mixed} See #find()
   */
  findByCapital: function (capital) {
    return this.find('capital', capital)
  },

  /**
   * Find country by 2-letter country code.
   * @param  {string} cca2
   * @return {mixed} See #find()
   */
  findByCca2: function (cca2) {
    return this.find('cca2', cca2)
  },

  /**
   * Find country by 3-letter country code.
   * @param  {string} cca3
   * @return {mixed} See #find()
   */
  findByCca3: function (cca3) {
    return this.find('cca3', cca3)
  },

  /**
   * Find country by 3-letter International Olympic Commitee country code.
   * @param  {string} cioc
   * @return {mixed} See #find()
   */
  findByCioc: function (cioc) {
    return this.find('cioc', cioc)
  },

  /**
   * Find country by numeric country code.
   * @param  {string} ccn3
   * @return {mixed} See #find()
   */
  findByCcn3: function (ccn3) {
    return this.find('ccn3', ccn3)
  },

  /**
   * Find country by currency.
   * @param  {string} currency
   * @return {mixed} See #find()
   */
  findByCurrency: function (currency) {
    return this.find('currency', currency)
  },

  /**
   * Find country by the demonym used for its citizens.
   * @param  {string} demonym
   * @return {mixed} See #find()
   */
  findByDemonym: function (demonym) {
    return this.find('demonym', demonym)
  },

  /**
   * Find country by whether or not it is landlocked.
   * @param  {bool} landlocked
   * @return {mixed} See #find()
   */
  findByLandlocked: function (landlocked) {
    return this.find('landlocked', landlocked)
  },

  /**
   * Find country by its language.
   * @param  {string} language
   * @return {mixed} See #find()
   */
  findByLanguage: function (language) {
    return this.find('languages', language)
  },

  /**
   * Find country by its common name.
   * @param  {string} name
   * @return {mixed} See #find()
   */
  findByNameCommon: function (name) {
    return this.find('name.common', name)
  },

  /**
   * Find country by its native name
   * @param  {string} name
   * @return {mixed} See #find()
   */
  findByNameNative: function (name) {
    return this.find('name.native', name)
  },

  /**
   * Find country by its official name.
   * @param  {string} name
   * @return {mixed} See #find()
   */
  findByNameOfficial: function (name) {
    return this.find('name.official', name)
  },

  /**
   * Find country by the region it is located in.
   * @param  {string} region
   * @return {mixed} See #find()
   */
  findByRegion: function (region) {
    return this.find('region', region)
  },

  /**
   * Find country by subregion it is located in.
   * @param  {string} subregion
   * @return {mixed} See #find()
   */
  findBySubregion: function (subregion) {
    return this.find('subregion', subregion)
  },

  /**
   * Find country by top level domain.
   * @param  {string} tld
   * @return {mixed} See #find()
   */
  findByTld: function (tld) {
    return this.find('tld', tld)
  },

  /**
   * Find country by translations of its name.
   * @param  {string} translation
   * @return {mixed} See #find()
   */
  findByTranslation: function (translation) {
    return this.find('translations', translation)
  },
}

/**
 * Searches properties that contain array values.
 * @param  {string} prop  Name of the prop to search by
 * @param  {mixed}  value Value to find
 * @return {mixed}        See filteredToResult
 */
function findByArrayProp(prop, value) {
  var searchVal = lowerCaseIfNeeded(value)
  var filtered = _.filter(cs, function (c) {
    var propArray = _.map(c[prop], lowerCaseIfNeeded)

    return _.includes(propArray, searchVal)
  })

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
  var searchVal = lowerCaseIfNeeded(value)
  var filtered = _.filter(cs, function (v) {
    return lowerCaseIfNeeded(_.get(v, propPath)) === searchVal
  })

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
  var searchVal = lowerCaseIfNeeded(value)
  // "propPath": {
  //   "nld": { "official": "Aruba", "common": "Aruba"},
  //   "pap": {"official": "Aruba", "common": "Aruba"}
  // }
  var filtered = _.filter(cs, function (v) {
    var nameObj = _.get(v, propPath)

    for (var langKey in nameObj) {
      if (
        lowerCaseIfNeeded(nameObj[langKey].official) === searchVal ||
        lowerCaseIfNeeded(nameObj[langKey].common) === searchVal
      ) {
        return true
      }
    }

    return false
  })

  return filteredToResult(filtered)
}

/**
 * Searches properties that contain a key/value map.
 * @param  {string} prop  A property name
 * @param  {mixed}  value Value to find
 * @return {mixed}        See filteredToResult
 */
function findByMapProp(prop, value) {
  var searchVal = lowerCaseIfNeeded(value)
  var filtered = _.filter(cs, function (c) {
    return _(c[prop])
      .values()
      .some(function (v) {
        return lowerCaseIfNeeded(v) === searchVal
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
  var searchVal = lowerCaseIfNeeded(value)
  var filtered = _.filter(cs, function (c) {
    var comp = lowerCaseIfNeeded(c[prop])
    return comp === searchVal
  })

  return filteredToResult(filtered)
}

/**
 * Converts a value to lower case if necessary (i.e. if it is a string).
 * @param  {mixed} value Value to (possible) lower-case
 * @return {mixed}       Lower-cased string, if `value` is a string, or unchanged `value`, otherwise.
 */
function lowerCaseIfNeeded(value) {
  return typeof value === 'string' ? value.toLowerCase() : value
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
