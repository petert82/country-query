# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.1.1] - 2019-11-02
### Fixed
- Correct example country object in readme.

## [1.1.0] - 2019-11-02
### Changed
- Updated to version 2.1.0 of world-countries data (Thanks [fiid](https://github.com/fiid)!).

## [1.0.2] - 2019-11-02
### Changed
- Updated to version 4.17.15 of lodash (Thanks [fiid](https://github.com/fiid)!).

## [1.0.1] - 2017-05-21
### Changed
- Added `findByCioc()` to the docs in the readme.

## [1.0.0] - 2017-05-21
### Changed
- `find()` and all `findByX()` functions are now case-insensitive.

## [0.3.0] - 2016-06-02
### Added
- Added `findByCioc()` function (Thanks [zakjan](https://github.com/zakjan)!).

### Changed
- Updated to version 1.7.8 of the world-countries data.

### Removed
- Removed `findByRelevance()` function as the `relevance` parameter no longer exists in the world-countries data.

## [0.2.0] - 2015-03-29
### Added
- Add various `#findByX()` functions, to better expose the _things_ that countries can be found by.

## [0.1.1] - 2015-03-22
### Fixed
- Fix finding values inside name objects.
  
## [0.1.0] - 2015-03-22
### Added
- Initial version with only `#find()` function.