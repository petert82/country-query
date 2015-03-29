var expect = require('chai').expect
var CountryQuery = require('../lib/country-query.js')

describe('CountryQuery', function() {
  describe('#find()', function() {
    it('should return an object when finding by uniquely identifiable string properties', function(){
      expect(CountryQuery.find('cca2', 'AW')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('ccn3', '533')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('cca3', 'ABW')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('capital', 'Oranjestad')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('demonym', 'Aruban')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('cca2', 'AT')).to.have.property('cca3', 'AUT')
    })
    
    it('should return an array when finding by non-uniquely identifiable string properties', function() {
      var caribCountries = CountryQuery.find('subregion', 'Caribbean')
      var aruba = CountryQuery.find('cca2', 'AW')
      
      expect(caribCountries).to.be.an('array').and.have.length(28)
      expect(caribCountries).to.include(aruba)
    })
    
    it('should return an object when finding by uniquely identifiable array properties', function() {
      expect(CountryQuery.find('altSpellings', 'AW')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('currency', 'AWG')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('tld', '.aw')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('altSpellings', 'Osterreich')).to.have.property('cca3', 'AUT')
    })
    
    it('should return an array when finding by non-uniquely identifiable array properties', function() {
          var gbpCountries = CountryQuery.find('currency', 'GBP')
          var uk = CountryQuery.find('cca2', 'GB')
          
          expect(gbpCountries).to.be.an('array').and.have.length(5)
          expect(gbpCountries).to.include(uk)
        })
    
    it('should return an object when finding by uniquely identifiable deep string properties', function() {
      expect(CountryQuery.find('name.common', 'Aruba')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('name.official', 'Aruba')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('name.native', 'Aruba')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('translations', 'Aruba')).to.have.property('cca3', 'ABW')
      expect(CountryQuery.find('translations', 'Australie')).to.have.property('cca3', 'AUS')
    })
    
    it('should return an object when finding by uniquely identifiable properties that contain maps', function() {
      expect(CountryQuery.find('languages', 'Galician')).to.have.property('cca3', 'ESP')
      expect(CountryQuery.find('languages', 'Czech')).to.have.property('cca3', 'CZE')
    })
    
    it('should return an array when finding by non-uniquely identifiable properties that contain maps', function() {
      var austBavCountries = CountryQuery.find('languages', 'Austro-Bavarian German'),
          austria = CountryQuery.find('cca2', 'AT'),
          italy = CountryQuery.find('cca2', 'IT')
      
      expect(austBavCountries).to.be.an('array').and.have.length(2)
      expect(austBavCountries).to.include(austria).and.to.include(italy)
    })
    
    it('should return null for searches that return nothing', function() {
      var nullTests = 
        [ {field: 'cca2', value: 'XX'}
        , {field: 'ccn3', value: '000'}
        , {field: 'cca3', value: 'XXX'}
        , {field: 'capital', value: 'XXXXX'}
        , {field: 'demonym', value: 'XXXXXXX'}
      ]
      nullTests.forEach(function(test) {
        expect(CountryQuery.find(test.field, test.value)).to.be.null
      })
    })
    
    it('should return null for non-existent properties', function() {
      var nullTests = 
        [ {field: 'cant-find-me', value: 'XX'}
        , {field: '',             value: 'XX'}
        , {field: null,           value: 'XX'}
        ]
      
      nullTests.forEach(function(test) {
        expect(CountryQuery.find(test.field, test.value)).to.be.null
      })
    })
  })

  describe('#findByX()', function() {
    it('should behave the same as the equivalent plain find', function() {
      var findSingleTests = 
        [ {field: 'altSpellings',  value: 'Oesterreich'              , findFunc: 'findByAltSpelling',  expectCca3: 'AUT'}
        , {field: 'area',          value: 6                          , findFunc: 'findByArea',         expectCca3: 'GIB'}
        , {field: 'callingCode',   value: '355'                      , findFunc: 'findByCallingCode',  expectCca3: 'ALB'}
        , {field: 'capital',       value: 'Guatemala City'           , findFunc: 'findByCapital',      expectCca3: 'GTM'}
        , {field: 'cca2',          value: 'PL'                       , findFunc: 'findByCca2',         expectCca3: 'POL'}
        , {field: 'cca3',          value: 'GNQ'                      , findFunc: 'findByCca3',         expectCca3: 'GNQ'}
        , {field: 'ccn3',          value: '056'                      , findFunc: 'findByCcn3',         expectCca3: 'BEL'}
        , {field: 'demonym',       value: 'Qatari'                   , findFunc: 'findByDemonym',      expectCca3: 'QAT'}
        , {field: 'languages',     value: 'Azerbaijani'              , findFunc: 'findByLanguage',     expectCca3: 'AZE'}
        , {field: 'name.common',   value: 'Argentina'                , findFunc: 'findByNameCommon',   expectCca3: 'ARG'}
        , {field: 'name.official', value: 'Argentine Republic'       , findFunc: 'findByNameOfficial', expectCca3: 'ARG'}
        , {field: 'name.native',   value: "Rep\u00fablica Argentina" , findFunc: 'findByNameNative',   expectCca3: 'ARG'}
        , {field: 'tld',           value: '.ao'                      , findFunc: 'findByTld',          expectCca3: 'AGO'}
        , {field: 'translations',  value: 'Prinsdom Andorra'         , findFunc: 'findByTranslation',  expectCca3: 'AND'}
        ]
      
      findSingleTests.forEach(function(test) {
        var findByXResult = CountryQuery[test.findFunc].call(CountryQuery, test.value)
          , findResult = CountryQuery.find(test.field, test.value)
        
        expect(findByXResult).to.deep.equal(findResult)
        expect(findByXResult).to.have.property('cca3', test.expectCca3)
      })
      
      var findArrayTests = 
        [ {field: 'borders',    value: 'AFG'            , findFunc: 'findByBorders', expectLength: 7}
        , {field: 'currency',   value: 'GBP'            , findFunc: 'findByCurrency', expectLength: 5}
        , {field: 'landlocked', value: true             , findFunc: 'findByLandlocked', expectLength: 45}
        , {field: 'region',     value: 'Africa'         , findFunc: 'findByRegion', expectLength: 59}
        , {field: 'relevance',  value: '0.5'            , findFunc: 'findByRelevance', expectLength: 36}
        , {field: 'subregion',  value: 'Western Africa' , findFunc: 'findBySubregion', expectLength: 17}
        ]
        
      findArrayTests.forEach(function(test) {
        var findByXResult = CountryQuery[test.findFunc].call(CountryQuery, test.value)
          , findResult = CountryQuery.find(test.field, test.value)
          
        expect(findByXResult).to.deep.equal(findResult)
        expect(findByXResult).to.have.length(test.expectLength)
      })
    })
  })
})