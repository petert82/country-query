# country-query

A javascript query API for [world-countries][world-countries] data.

## Table of contents

- [API](#api)
- [Thanks](#thanks)
- [License](#license)

## API

### find(by, value)

Finds data for one or more countries matching some search value.

Takes a property name to search by and a value to search for. If the value matches a single country, an object containing that country's data will be returned. If the value matches more than one country, an array of country objects will be returned. If no countries match, or an invalid property name is used, returns `null`.

This function is not case-sensitive, i.e the input values `German`, `german` and `gErMaN` would all match the language `German`.

```js
var CountryQuery = require('country-query');

var austria = CountryQuery.find('cca2', 'AT');
var germany = CountryQuery.find('demonym', 'German');

// austria and germany will both be objects with this structure:
/*
    {
        "name": {
            "common": "Austria",
            "official": "Republic of Austria",
            "native": {
                "bar": {
                    "official": "Republik Österreich",
                    "common": "Österreich"
                }
            }
        },
        "tld": [".at"],
        "cca2": "AT",
        "ccn3": "040",
        "cca3": "AUT",
        "cioc": "AUT",
        "independent": true,
        "status": "officially-assigned",
        "currency": ["EUR"],
        "callingCode": ["43"],
        "capital": ["Vienna"],
        "altSpellings": ["AT", "Osterreich", "Oesterreich"],
        "region": "Europe",
        "subregion": "Western Europe",
        "languages": {
            "bar": "Austro-Bavarian German"
        },
        "translations": {
            "ces": {
                "official": "Rakouská republika",
                "common": "Rakousko"
            },
            "cym": {
                "official": "Gweriniaeth Awstria",
                "common": "Awstria"
            },
            "deu": {
                "official": "Republik Österreich",
                "common": "Österreich"
            },
            // ...snip...
        },
        "latlng": [47.33333333, 13.33333333],
        "demonym": "Austrian",
        "landlocked": true,
        "borders": ["CZE", "DEU", "HUN", "ITA", "LIE", "SVK", "SVN", "CHE"],
        "area": 83871,
        "flag": "🇦🇹"
    }

 */

var euroCountries = CountryQuery.find('currency', 'EUR');

// euroCountries will be an array of country objects
```

Acceptable values for `by` are:

- `tld`
- `currency`
- `callingCode`
- `altSpellings`
- `latlng`
- `borders`
- `name.common`
- `name.official`
- `name.native`
- `translations`
- `languages`
- `cca2`
- `ccn3`
- `cca3`
- `capital`
- `cioc`
- `region`
- `subregion`
- `demonym`
- `landlocked`
- `area`

### findByArea(area)

Find country by its area.

Return value is the same as [find](#findby-value).

### findByAltSpelling(altSpelling)

Find country by alternative spellings of its name.

Return value is the same as [find](#findby-value).

### findByBorders(borders)

Find country by countries that it borders

Return value is the same as [find](#findby-value).

### findByCallingCode(callingCode)

Find country by telephone calling code.

Return value is the same as [find](#findby-value).

### findByCapital(capital)

Find country by its capital city.

Return value is the same as [find](#findby-value).

### findByCca2(cca2)

Find country by 2-letter country code.

Return value is the same as [find](#findby-value).

### findByCca3(cca3)

Find country by 3-letter country code.

Return value is the same as [find](#findby-value).

### findByCcn3(ccn3)

Find country by numeric country code.

Return value is the same as [find](#findby-value).

### findByCioc(cioc)

Find country by 3-letter International Olympic Commitee country code.

Return value is the same as [find](#findby-value).

### findByCurrency(currency)

Find country by currency.

Return value is the same as [find](#findby-value).

### findByDemonym(demonym)

Find country by the demonym used for its citizens.

Return value is the same as [find](#findby-value).

### findByLandlocked(landlocked)

Find country by whether or not it is landlocked.

Return value is the same as [find](#findby-value).

### findByLanguage(language)

Find country by its language.

Return value is the same as [find](#findby-value).

### findByNameCommon(name)

Find country by its common name.

Return value is the same as [find](#findby-value).

### findByNameNative(name)

Find country by its native name.

Return value is the same as [find](#findby-value).

### findByNameOfficial(name)

Find country by its official name.

Return value is the same as [find](#findby-value).

### findByRegion(region)

Find country by the region it is located in.

Return value is the same as [find](#findby-value).

### findBySubregion(subregion)

Find country by subregion it is located in.

Return value is the same as [find](#findby-value).

### findByTld(tld)

Find country by top level domain.

Return value is the same as [find](#findby-value).

### findByTranslation(translation)

Find country by translations of its name.

Return value is the same as [find](#findby-value).

## Thanks

This project would not exist without the work of the contributors to the [world-countries][world-countries] data set.

## License

Copyright (C) 2015, Peter Thompson <peter.thompson@dunelm.org.uk>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

[world-countries]:https://github.com/mledoze/countries