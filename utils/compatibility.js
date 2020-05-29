export function isWebview() {
  const standalone = window.navigator.standalone
  const userAgent = window.navigator.userAgent.toLowerCase()
  const safari = /safari/.test(userAgent)
  const ios = /iphone|ipod|ipad/.test(userAgent)

  const isAndroidWebview = /wv/gi.test(navigator.userAgent)
  const isIosWebview = ios && !standalone && !safari

  return isAndroidWebview || isIosWebview
}
