var expect = require('chai').expect
var CountryQuery = require('../lib/country-query.js')

describe('CountryQuery', function(){
  describe('#find()', function(){
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
      var austBavCountries= CountryQuery.find('languages', 'Austro-Bavarian German'),
          austria = CountryQuery.find('cca2', 'AT'),
          italy = CountryQuery.find('cca2', 'IT')
      
      expect(austBavCountries).to.be.an('array').and.have.length(2)
      expect(austBavCountries).to.include(austria).and.to.include(italy)
    })
    
    it('should return null for searches that return nothing', function() {
      expect(CountryQuery.find('cca2', 'XX')).to.be.null
      expect(CountryQuery.find('ccn3', '000')).to.be.null
      expect(CountryQuery.find('cca3', 'XXX')).to.be.null
      expect(CountryQuery.find('capital', 'XXXXX')).to.be.null
      expect(CountryQuery.find('demonym', 'XXXXXXX')).to.be.null
    })
    
    it('should return null for non-existent properties', function() {
      expect(CountryQuery.find('cant-find-me', 'XX')).to.be.null
      expect(CountryQuery.find('', 'XX')).to.be.null
      expect(CountryQuery.find(null, 'XX')).to.be.null
    })
  })
})