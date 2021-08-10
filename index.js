const semver = require('semver')
const closestSemver = require('semver-closest')
const normalize = require('normalize-version')
const OS = require('./constants/os')
const DEVICE = require('./constants/device')
const tridentVersionMap = require('./constants/tridentVersions')
const chromeWebkitVersionMap = require('./constants/chromeWebkitVersions')
const safariWebkitVersionMap = require('./constants/safariWebkitVersions')
const androidWebkitVersions = require('./constants/androidWebkitVersions')

const ANDROID_FLAVOURS = {
  KITKAT: '4.4.0',
  LOLLIPOP: '5.0',
  MARSHMALLOW: '6.0.0',
  NOUGAT: '7.0',
  OREO: '8.0',
  PIE: '9.0',
  ANDROID_10: '10.0',
  ANDROID_11: '11.0',
  ANDROID_12: '12.0',
}

const windowsPhoneIEVersionMap = {
  '9.0': 7.0,
  '10.0': 8.0,
  '11.0': 8.1,
}

function closestSemverValue(semverString, semverStringMap) {
  const normalSemver = normalize(semverString)
  const normalSemverMap = {}

  Object.keys(semverStringMap).forEach(key => {
    normalSemverMap[normalize(key)] = normalize(semverStringMap[key])
  })
  const normalSemverArray = Object.keys(normalSemverMap)

  const closestKey = closestSemver(normalSemver, normalSemverArray)
  return normalSemverMap[closestKey]
}

const Defaults = {
  ANDROID_VERSION: 'Android 11',
  ANDROID_BUILD_VERSION: 'Unknown',
  ANDROID_PHONE: DEVICE.PIXEL,
  ANDROID_TABLET: DEVICE.PIXEL_C,
  DESKTOP_OS: OS.WINDOWS_10,
  WEBVIEW_CHROME_VERSION: '60.0.0.0',
  IOS_DEVICE: DEVICE.IPHONE,
  IOS_WEBKIT_VERSION: '603.1.30',
  IOS_CHROME_VERSION: '60.0.0.0',
  GOOGLE_BOT_VERSION: '2.1',
  BING_BOT_VERSION: '2.0',
  GECKO_VERSION: '20140303',
  WINDOW_PHONE: DEVICE.LUMIA_630,
  WINDOWS_BUILD_VERSION: '10122',
  EDGE_CHROME_VERSION: '52.0.0.0',
  MAC_OS: OS.MAC_OSX_BIG_SUR,
}

/********************
 *  Google Chrome   *
 /*******************/

function chrome(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ? opt : opt.version,
    4)
  const os = opt.os || Defaults.DESKTOP_OS
  const webkitVersion = closestSemverValue(version, chromeWebkitVersionMap)

  return `Mozilla/5.0 (${os}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Chrome/${version} Safari/${webkitVersion}`
}

chrome.androidPhone = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ? opt : opt.version,
    4)
  const webkitVersion = closestSemverValue(version, chromeWebkitVersionMap)
  const buildVersion = opt.buildVersion || Defaults.ANDROID_BUILD_VERSION
  const androidVersion = opt.androidVersion || Defaults.ANDROID_VERSION
  const device = opt.device || Defaults.ANDROID_PHONE

  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device} Build/${buildVersion};) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Chrome/${version} Mobile Safari/${webkitVersion}`
}

chrome.androidTablet = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ? opt : opt.version,
    4)
  const webkitVersion = closestSemverValue(version, chromeWebkitVersionMap)
  const buildVersion = opt.buildVersion || Defaults.ANDROID_BUILD_VERSION
  const androidVersion = opt.androidVersion || Defaults.ANDROID_VERSION
  const device = opt.device || Defaults.ANDROID_TABLET

  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device} Build/${buildVersion}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Chrome/${version} Safari/${webkitVersion}`
}

chrome.androidWebview = (opt) => {
  const androidVersion = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.androidVersion,
  )
  const chromeVersion = normalize(opt.chromeVersion || Defaults.WEBVIEW_CHROME_VERSION, 4)
  const webkitVersion = closestSemverValue(androidVersion, androidWebkitVersions)
  const buildVersion = opt.buildVersion || Defaults.ANDROID_BUILD_VERSION
  const device = opt.device || Defaults.ANDROID_PHONE

  if (semver.lt(androidVersion, ANDROID_FLAVOURS.KITKAT)) {
    return `Mozilla/5.0 (Linux; U; Android ${androidVersion}; ${device} Build/${buildVersion};) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/4.0 Safari/${webkitVersion}`
  } else if (
    semver.gte(androidVersion, ANDROID_FLAVOURS.KITKAT) &&
    semver.lt(androidVersion, ANDROID_FLAVOURS.MARSHMALLOW)
  ) {
    return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device} Build/${buildVersion};) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/${chromeVersion} Mobile Safari/537.36`
  } else {
    return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device} Build/${buildVersion}; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/${chromeVersion} Mobile Safari/537.36`
  }
}

chrome.chromecast = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
    4)

  return `Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36 CrKey/1.22.79313"`
}

chrome.iOS = (opt) => {
  const iOSVersion = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.iOSVersion,
  )
  const webkitVersion = closestSemverValue(iOSVersion, safariWebkitVersionMap)
  const chromeVersion = normalize(opt.chromeVersion || Defaults.IOS_CHROME_VERSION, 4)
  const device = opt.device || Defaults.IOS_DEVICE
  return `Mozilla/5.0 (${device}; CPU iPhone OS ${iOSVersion.replace(/\./g, '_')} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) CriOS/${chromeVersion} Mobile/14E5239e Safari/602.1`
}

function chromium(opt) {
  return chrome(opt).replace(/Chrome/g, 'Chromium')
}

/***************
 *   Firefox   *
 /*************/

// @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox

function firefox(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )

  const os = opt.os || Defaults.DESKTOP_OS
  const geckoVersion = geckoVersion || Defaults.GECKO_VERSION
  return semver.lt(version, '30.0.0') ? (
    `Mozilla/5.0 (${os}; rv:${version}) Gecko/${geckoVersion || '20140303'} Firefox/${version}`
  ) : (
    `Mozilla/5.0 (${os}; rv:${version}) Gecko/20100101 Firefox/${version}`
  )
}

firefox.androidPhone = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const buildVersion = opt.buildVersion || Defaults.ANDROID_BUILD_VERSION
  const androidVersion = opt.androidVersion || Defaults.ANDROID_VERSION

  if (semver.lt(version, '41.0.0')) {
    return `Mozilla/5.0 (Android; Build/${buildVersion}; Mobile; rv:${version}) Gecko/${version} Firefox/${version}`
  } else {
    return `Mozilla/5.0 (Android ${androidVersion}; Build/${buildVersion}; Mobile; rv:${version}) Gecko/${version} Firefox/${version}`
  }
}

firefox.androidTablet = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const buildVersion = opt.buildVersion || Defaults.ANDROID_BUILD_VERSION
  const androidVersion = opt.androidVersion || Defaults.ANDROID_VERSION

  if (semver.lt(version, '41.0.0')) {
    return `Mozilla/5.0 (Android; Build/${buildVersion}; Tablet; rv:${version}) Gecko/${version} Firefox/${version}`
  } else {
    return `Mozilla/5.0 (Android ${androidVersion}; Build/${buildVersion}; Tablet; rv:${version}) Gecko/${version} Firefox/${version}`
  }
}

firefox.iOS = (opt) => {
  const iOSVersion = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.iOSVersion,
  )
  const device = opt.device || Defaults.IOS_DEVICE
  return `Mozilla/5.0 (${device}; CPU iPhone OS ${iOSVersion.replace(/\./g, '_')} like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4`
}


/**************
 *   Safari   *
 /************/

function safari(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const webkitVersion = closestSemverValue(version, safariWebkitVersionMap)
  const os = opt.os || Defaults.MAC_OS

  return `Mozilla/5.0 (${os}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/${version} Safari/${webkitVersion}`
}

safari.iOS = (opt) => {
  const iOSVersion = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.iOSVersion,
  )
  const safariVersion = normalize(opt.safariVersion || iOSVersion)
  const webkitVersion = closestSemverValue(safariVersion, safariWebkitVersionMap)
  const device = opt.device || Defaults.IOS_DEVICE

  return `Mozilla/5.0 (${device}; CPU iPhone OS ${iOSVersion.replace(/\./g, '_')} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/${safariVersion} Mobile/14A403 Safari/${webkitVersion}`
}

safari.iOSWebview = (opt) => {
  const iOSVersion = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.iOSVersion,
  )
  const safariVersion = normalize(opt.safariVersion || iOSVersion)
  const webkitVersion = closestSemverValue(safariVersion, safariWebkitVersionMap)
  const device = opt.device || Defaults.IOS_DEVICE

  return `Mozilla/5.0 (${device}; CPU iPhone OS ${iOSVersion.replace(/\./g, '_')} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/${safariVersion} Mobile/14A403 Mobile/${webkitVersion}`
}

//User-Agent: Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile


/***********************
 *  Internet Explorer  *
 /*********************/

function ie(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const tridentVersion = closestSemverValue(version, tridentVersionMap)
  const os = opt.os || Defaults.DESKTOP_OS

  if (semver.gte(version, '11.0.0')) {
    return `Mozilla/5.0 (Windows NT 6.3; Trident/${tridentVersion}; rv:${version}) like Gecko`
  }

  return `Mozilla/5.0 (compatible; MSIE ${version}; ${os}; Trident/${tridentVersion})`
}

ie.windowsPhone = (opt) => {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const tridentVersion = closestSemverValue(version, tridentVersionMap)
  const windowsPhoneVersion = closestSemverValue(version, windowsPhoneIEVersionMap)
  const device = opt.device || Defaults.WINDOW_PHONE

  return `Mozilla/5.0 (compatible; MSIE ${version}; Windows Phone OS ${windowsPhoneVersion}; Trident/${tridentVersion}; IEMobile/${version}; ${device}`
}

/**********************
 *   Microsoft Edge   *
 /********************/

function edge(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : opt.version,
  )
  const os = opt.os || Defaults.DESKTOP_OS
  const windowsBuildVersion = opt.windowsBuildVersion || Defaults.WINDOWS_BUILD_VERSION
  const chromeVersion = normalize(opt.chromeVersion || Defaults.EDGE_CHROME_VERSION, 4)

  return `Mozilla/5.0 (${os};) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36 Edge/${version}.${windowsBuildVersion}`
}

/************************
 *  Search Engine Bots  *
 /**********************/

function googleBot(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : Defaults.GOOGLE_BOT_VERSION,
  )

  return `Mozilla/5.0 (compatible; Googlebot/${version}; +http://www.google.com/bot.html)`
}


function bingBot(opt) {
  const version = normalize(
    (typeof opt === 'number' || typeof opt === 'string') ?
      opt : Defaults.BING_BOT_VERSION,
  )

  return `Mozilla/5.0 (compatible; bingbot/${version}; +http://www.bing.com/bingbot.htm)`
}

function yahooBot() {
  return `Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)`
}

module.exports =  {
  chrome,
  chromium,
  firefox,
  safari,
  ie,
  edge,
  googleBot,
  bingBot,
  yahooBot,
}
