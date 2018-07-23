# User Agent Generator
[![Travis](https://img.shields.io/travis/pastelsky/useragent-generator.svg)]()
[![npm](https://img.shields.io/npm/v/useragent-generator.svg)]()

<img  align="right" src="https://github.com/pastelsky/useragent-generator/blob/master/logo.png" height="210px" width="auto" />

Easily generate accurate user-agent strings for popular browsers.

## Installing
```bash
npm install useragent-generator
```

## Usage
``` js
const ua = require('useragent-generator')
// ...
```

## Table of Contents

**Chrome**
  - [`ua.chrome(options)`](#uachromeoptions)
  - [`ua.chrome.androidPhone(options)`](#uachromeandroidphoneoptions)
  - [`ua.chrome.androidTablet(options)`](#uachromeandroidphoneoptions)
  - [`ua.chrome.iOS(options)`](#uachromeiosoptions)
  - [`ua.chrome.androidWebview(options)`](#uachromeandroidwebviewoptions)
  - [`ua.chrome.chromecast(options)`](#uachromechromecastoptions)
  
**Chromium**
  - [`ua.chromium(options)`](#uachromiumoptions)

**Firefox**
  - [`ua.firefox(options)`](#firefox)
  - [`ua.firefox.androidPhone(options)`](#uafirefoxandroidphoneoptions)
  - [`ua.firefox.androidTablet(options)`](#uafirefoxandroidphoneoptions)
  - [`ua.firefox.iOS(options)`](#uafirefoxiosoptions)

**Safari**
  - [`ua.safari(options)`](#uasafarioptions)
  - [`ua.safari.iOS(options)`](#uasafariiosoptions)
  - [`ua.safari.iOSWebview(options)`](#uasafariwebviewoptions)

**Internet Explorer**
  - [`ua.ie(options)`](#uaieoptions)
  - [`ua.ie.windowsPhone(options)`](#uaiewindowsphoneoptions)

**Microsoft Edge**
  - [`ua.edge(options)`](#uaedgeoptions)

**Search Engines**
  - [`ua.googleBot(options)`](#uagooglebotoptions--googlebot)
  - [`ua.bingBot(options)`](#uabingbotoptions--bingbot)
  - [`ua.yahooBot()`](#uayahoobot--yahoobot)

## Chrome

### `ua.chrome(options)`

##### Examples
```js
ua.chrome(60)
ua.chrome('61.0.0')
ua.chrome({ version: '61.0.0', os: 'Windows NT 6.3' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.os` | string | `Windows NT 6.4` (Windows 10)  |


### `ua.chrome.androidPhone(options)` / `ua.chrome.androidTablet(options)`

##### Examples
```js
ua.chrome.androidPhone(60)
ua.chrome.androidPhone('61.0.0')
ua.chrome.androidPhone({ version: '61.0.0', androidVersion: '6.2.1', device: 'Nexus 6' })

ua.chrome.androidTablet(60)
ua.chrome.androidTablet('61.0.0')
ua.chrome.androidTablet({ version: '61.0.0', androidVersion: '6.2.1', device: 'SM-T210' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.androidVersion` | string | `7.0.0` (Nougat)  |
| `options.device` | string | `Pixel` (Phone) / `Pixel C` (Tablet) |
 
### `ua.chrome.iOS(options)`

##### Examples
```js
ua.chrome.iOS(10) // iOS version
ua.chrome.iOS('10.0.1') // iOS version
ua.chrome.iOS({ iOSVersion: '10.0.1', iOSVersion: '62.1.0', device: 'iPad' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.iOSVersion` | string | — |
| `options.chromeVersion` | string | `60.0.0.0` |
| `options.device` | string | `iPhone` |

### `ua.chrome.androidWebview(options)`

##### Examples
```js
ua.chrome.androidWebview(4) // Android OS version
ua.chrome.androidWebview('4.4') // Android OS version
ua.chrome.androidWebview({ androidVersion: '5.0.0', chromeVersion: '60.1.0', device: 'Nexus 6' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.androidVersion` | string | — |
| `options.chromeVersion` | string | `60.0.0.0` (applicable only for Android 4.4 (Kitkat) and above) |
| `options.device` | string | `Pixel` |

### `ua.chrome.chromecast(options)`

##### Example
```js
ua.chrome.chromecast(62) 
ua.chrome.chromecast('62.1.0') // Android OS version
ua.chrome.chromecast({ version: '62.1.0' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |

## Chromium
### `ua.chromium(options)`

Same as `ua.chrome`

## Firefox

### `ua.firefox(options)`

##### Examples
```js
ua.firefox(52) 
ua.firefox('52.4') 
ua.firefox({ version: '53.4.1', os: 'Windows NT 6.3' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.os` | string | `Windows NT 6.4` (Windows 10)  |

### `ua.firefox.androidPhone(options)` / `ua.firefox.androidTablet(options)`

##### Examples
```js
ua.firefox.androidPhone(52)
ua.firefox.androidPhone('52.4')
ua.firefox.androidPhone({ version: '52.4.1', androidVersion: '6.2.1', device: 'Nexus 6' })

ua.chrome.androidTablet(60)
ua.chrome.androidTablet('61.0.0')
ua.chrome.androidTablet({ version: '52.4.1', androidVersion: '6.2.1', device: 'SM-T210' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.androidVersion` | string | `7.0.0` (Nougat)  |
| `options.device` | string | `Pixel` (Phone) / `Pixel C` (Tablet) |

### `ua.firefox.iOS(options)`

##### Examples
```js
ua.firefox.iOS(10) // iOS version
ua.firefox.iOS('10.0.1') // iOS version
ua.firefox.iOS({ iOSVersion: '10.0.1', device: 'iPad' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.iOSVersion` | string | — |
| `options.device` | string | `iPhone` |

## Safari

### `ua.safari(options)`

##### Examples
```js
ua.safari(10) 
ua.safari('10.1.0') 
ua.safari({ version: '10.3.1', os: 'Macintosh; Intel Mac OS X 10_11' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.os` | string | `Macintosh; Intel Mac OS X 10_11` (Mac OS X El Capitan)  |


### `ua.safari.iOS(options)`

##### Examples
```js
ua.safari.iOS(10) // iOS version
ua.safari.iOS('10.0.1') // iOS version
ua.safari.iOS({ iOSVersion: '10.0.1', safariVersion: '10.3.0', device: 'iPad' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.iOSVersion` | string | — |
| `options.safariVersion` | string | (equal to `iOSversion`) |
| `options.device` | string | `iPhone` |

### `ua.safari.iOSWebview(options)`

##### Examples
```js
ua.safari.iOSWebview(10) // iOS version
ua.safari.iOSWebview('10.0.1') // iOS version
ua.safari.iOSWebview({ iOSVersion: '10.0.1', safariVersion: '10.3.0', device: 'iPad' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.iOSVersion` | string | — |
| `options.safariVersion` | string | (equal to `iOSversion`) |
| `options.device` | string | `iPhone` |

## Internet Explorer

### `ua.ie(options)`

##### Examples
```js
ua.ie(9) 
ua.ie('9.0.1') 
ua.ie({ version: '9.0.1', os: 'Windows NT 6.3' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.os` | string | `Windows NT 6.4` (Windows 10)  |

### `ua.ie.windowsPhone(options)`

##### Examples
```js
ua.ie(9) 
ua.ie('9.0.1') 
ua.ie({ version: '9.0.1', os: 'Lumia 625' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.device` | string | `Lumia 630` |

## Microsoft Edge

### `ua.edge(options)`

##### Examples
```js
ua.edge(12) 
ua.edge('12.0.1') 
ua.edge({ version: '12.0.1', chromeVersion: '62.0.1', os: 'Windows NT 6.3' })
```

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string | — |
| `options.chromeVersion` | string | `52.0.0.0` |
| `options.os` | string | `Windows NT 6.4` (Windows 10)  |

### Search Engines

##### Examples
``` js
ua.googleBot()
ua.bingBot()
ua.yahooBot()

ua.googleBot('2.0')
ua.bingBot('2.1')
```

### `ua.googleBot(options)` — GoogleBot

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string (optional) | '2.1' |

### `ua.bingBot(options)` — BingBot

| Param | Type | Default Value |
| --- | --- | --- |
| `options.version` | string (optional) | '2.0' |

### `ua.yahooBot()` — YahooBot



