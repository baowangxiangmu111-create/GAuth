// 三语切换：?lang= 指定 > 浏览器语言（中文 / 法语，其余英文）。不支持脚本时三种语言全部显示。
(function () {
  var LANGS = ['zh-CN', 'en', 'fr']
  function pick() {
    var q = new URLSearchParams(location.search).get('lang')
    if (q) {
      q = q.toLowerCase()
      if (q.indexOf('zh') === 0) return 'zh-CN'
      if (q.indexOf('fr') === 0) return 'fr'
      if (q.indexOf('en') === 0) return 'en'
    }
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase()
      if (l.indexOf('zh') === 0) return 'zh-CN'
      if (l.indexOf('fr') === 0) return 'fr'
      if (l.indexOf('en') === 0) return 'en'
    }
    return 'en'
  }
  function apply(lang) {
    var shown
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var on = el.getAttribute('data-lang') === lang
      el.hidden = !on
      if (on) shown = el
    })
    document.querySelectorAll('[data-set]').forEach(function (a) {
      if (a.getAttribute('data-set') === lang) a.setAttribute('aria-current', 'true')
      else a.removeAttribute('aria-current')
    })
    document.documentElement.lang = lang
    if (shown && shown.getAttribute('data-title')) document.title = shown.getAttribute('data-title')
    // 站内链接带上当前语言，跳到另一页时保持一致
    document.querySelectorAll('a[data-keep]').forEach(function (a) {
      a.href = a.getAttribute('data-keep') + '?lang=' + lang
    })
  }
  var lang = pick()
  if (LANGS.indexOf(lang) < 0) lang = 'en'
  apply(lang)
  document.querySelectorAll('[data-set]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault()
      var l = a.getAttribute('data-set')
      history.replaceState(null, '', '?lang=' + l)
      apply(l)
    })
  })
})()
