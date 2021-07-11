// @see https://developers.whatismybrowser.com/useragents/explore/operating_system_name/

module.exports = {
  WINDOWS_10: 'Windows NT 6.4',
  WINDOWS_8_1: 'Windows NT 6.3',
  WINDOWS_8: 'Windows NT 6.2',
  WINDOWS_8_RT: 'Windows NT 6.2; ARM;',
  WINDOWS_7: 'Windows NT 6.1',

  // TODO: Need to separate out the architecture and add it based on the deduced value of the process
  LINUX: 'X11; Linux x86_64',

  UBUNTU: 'X11; Ubuntu;',

  // TODO: Need to separate out the architecture and add it based on the deduced value of the process
  MAC_OSX_BIG_SUR: 'Macintosh; Intel Mac OS X 11',
  MAC_OSX_CATALINA: 'Macintosh; Intel Mac OS X 10_15',
  MAC_OSX_MOJAVE: 'Macintosh; Intel Mac OS X 10_14',
  MAC_OSX_HIGH_SIERRA: 'Macintosh; Intel Mac OS X 10_13',
  MAC_OSX_SIERRA: 'Macintosh; Intel Mac OS X 10_12',
  MAC_OSX_EL_CAPITAN: 'Macintosh; Intel Mac OS X 10_11',
  MAC_OSX_YOSEMITE: 'Macintosh; Intel Mac OS X 10_10',

  // TODO: Need to separate out the architecture and add it based on the deduced value of the process
  CHROME_OS: 'X11; CrOS x86_64'
}
