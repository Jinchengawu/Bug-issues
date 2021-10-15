//getrand
export function rand (max) {
  return Math.floor(Math.random() * max)
}
//getRandwords 获取随机字符串
export function getRandwords (ls = 8) {
  var chars = ''
  var passwords = []
  var passwordUnique = true
  var quantity = 1
  chars += '0123456789'
  chars += 'abcdefghijklmnopqrstuvwxyz'
  chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  while (passwords.length < quantity) {
    var _chars = chars.split('')
    var password = ''
    for (var i = 0, l = ls; i < l; i++) {
      if (_chars.length < 1) break

      var idx = rand(_chars.length)
      password += _chars[idx]
      if (passwordUnique) _chars.splice(idx, 1)
    }
    if (passwords.indexOf(password) === -1) passwords.push(password)
  }
  return passwords.join('\n')
}