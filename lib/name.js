module.exports = exports = function(chord) {
  var root = chord.root, type = chord.type, exts = chord.exts,
      normal = {
        '6': 1,
        '7': 0,
        '9': 1,
        '11': 0,
        '13': 1
      };

  function sign(extension) {
    var num = extension.number().toString();

    if ((normal[num] - extension.qualityValue()) === 1)
      return 'b';
    if ((normal[num] - extension.qualityValue()) === -1)
      return num === '7' ? 'maj' : '#';
    else
      return '';
  }

  function order(type, name) {
    if (type === 'M') return name;
    if (type === 'm') return type + name;
    if (type === 'aug' || type === 'm#5') return type + '#5';
    if (type === 'dim' || type === 'Mb5') return type + 'b5';
    else return name + type;
  }

  // Simple case: Chord only consists of a triad
  if (!exts.length)
    return root + type;
  else if (exts.length === 1) {
    var num = exts[0].number();
    if (num === 6 || num === 7)
      return root + order(type, sign(exts[0]) + num);
    else
      return root + order(type, 'add' + num);
  }
}
