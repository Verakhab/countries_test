export default class City {
    constructor(data) {
        this.name = data.name;
        this.topLevelDomain = data.topLevelDomain;
        this.alpha2Code = data.alpha2Code;
        this.alpha3Code = data.alpha3Code;
        this.callingCodes = data.callingCodes;
        this.capital = data.capital;
        this.altSpellings = data.altSpellings;
        this.subregion = data.subregion;
        this.region = data.region;
        this.population = data.population;
        this.latlng = data.latlng;
        this.demonym = data.demonym;
        this.area = data.area;
        this.timezones = data.timezone;
        this.borders = data.borders;
        this.nativeName = data.nativeName;
        this.numericCode = data.numericCode;
        this.flags = data.flags;
        this.currencies = data.currencies;
        this.languages = data.languages;
        this.translations = data.translations;
        this.flag = data.flag;
        this.regionalBlocs = data.regionalBlocs;
        this.cioc = data.cioc;
        this.independent = data.independent;
        this.bordersCountriesName = data.bordersCountriesName ? data.bordersCountriesName : [];
    }
}