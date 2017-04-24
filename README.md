# Intrinio
Unofficial NodeJS SDK for Intrinio

## Installation
```
npm i --save intrinio
```

## Usage


### Vanilla Javascript
```
var Intrinio = require('intrinio');

var intrinio = new Intrinio(username, password);
```

### ES6 / Typescript
```
import Intrinio from 'intrinio';

const intrinio = new Intrinio(username, password);
```


## API Reference


### queryCompanies
```
// signature
queryCompanies(query, options?)

// example
intrinio.queryCompanies('GOO', { page_size: 10 })
  .then(data => console.log('Data is ', data))
  .catch(e => console.log('Error getting data ', e));
```
Query companies
- **query**: the query (string)
- **options**: optional options (object)

### getCompanyByTicker
```
// signature
getCompanyByTicker(ticker: string, options?)

// example
intrinio.getCompanyByTicker('GOOGL')
  .then(data => console.log(data))
  .catch(e => console.log(e));
```
Get company profile by ticker
- **ticker**: company's ticker (string)
- **options**: optional options (object)

### watchPrices
```
// signature
watchPrices(ticker, options?, interval?)

// example
let watch = intrinio.watchPrices('GOOGL').subscribe(data => console.log('Got new data for GOOGL', data));

// call .unsubscribe to stop watching price
watch.unsubscribe();
```
Watch price for a ticker.
- **ticker**: company's ticker (string)
- **options**: optional options (object)
- **interval**: number of milliseconds between each check (number), defaults to `10000`

### getSecurityById
```
getSecurityById(id, options?)
```

### querySecurities
```
querySecurities(query, options?)
```