# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

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