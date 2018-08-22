## LocalStorageX

LocalStorageX is a polyfill for the W3C localStorage API backed by a more reliable storage mechanism. 

For one, It resolves the painful behaviour of iOS WKWebView that deletes localStorage data, without warning, and as it sees fit - making implementations using the standard localStorage API break. 

At its foundation it uses the localForage project (https://github.com/localForage/localForage) 

### Supports
- Browsers (Desktop Chrome, Android Chrome, iOS Safari)
- Cordova (Android, iOS)

### Install
```
npm i localstoragex
```

## Use
LocalStorageX exports a singleton (static) class. Thus no instantiation is required. 

```
import { storage } from "LocalStorageX"; 

...

await storage.init(); 
window.localStorage.override();  //true

...

```

## Build 
```
npm run build
```

## Link 
```
npm run link
```

## Test 
```
npm run test
```

## Contributing
Submit a PR or log an issue



## Changelog

### 0.0.6
- Attempts to reload localstoragex in the event of a localforage error due to e.g. clearing browser / app cache while app is running

### 0.0.4 - 0.0.5
- Loads current localStorage (if any) into localstoragex on init
- Init only yields once device (cordova) or document (web) is ready

### 0.0.1 - 0.0.3 
- Initial 

