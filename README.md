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
                    "official": "Republik \u00d6sterreich",
                    "common": "\u00d6sterreich"
                }
            }
        },
        "tld": [".at"],
        "cca2": "AT",
        "ccn3": "040",
        "cca3": "AUT",
        "currency": ["EUR"],
        "callingCode": ["43"],
        "capital": "Vienna",
        "altSpellings": ["AT", "Osterreich", "Oesterreich"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Western Europe",
        "languages": {
            "bar": "Austro-Bavarian German"
        },
        "translations": {
            "cym": {"official": "Republic of Austria", "common": "Awstria"},
            "deu": {"official": "Republik \u00d6sterreich", "common": "\u00d6sterreich"},
            // ...snip...
        },
        "latlng": [47.33333333, 13.33333333],
        "demonym": "Austrian",
        "landlocked": true,
        "borders": ["CZE", "DEU", "HUN", "ITA", "LIE", "SVK", "SVN", "CHE"],
        "area": 83871
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
- `relevance`
- `region`
- `subregion`
- `demonym`
- `landlocked`
- `area`

## Thanks

This project would not exist without the work of the contributors to the [world-countries][world-countries] data set.

## License

Copyright (C) 2015, Peter Thompson <peter.thompson@dunelm.org.uk>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

[world-countries]:https://github.com/mledoze/countries