// Normal quality values
var normal = {
 '6': 1,
 '7': 0,
 '9': 1,
 '11': 0,
 '13': 1
};

// Return chord type and extensions in the correct order
function order(type, name) {
  if (type === '' || type === 'M') return name;
  if (type === 'm') return type + name;
  if (type === 'aug') return name + '#5';
  if (type === 'm#5') return 'm' + name + '#5';
  if (type === 'dim') return name === 'b7' ? 'dim7' : 'm' + name + 'b5';
  if (type === 'Mb5') return name + 'b5';
  else return name + type;
}

// Return (if necessary) the sign to prepend an extension
function sign(extension) {
  var num = extension.number().toString()
    , diff = normal[num] - extension.qualityValue();

  if (diff === 1)
    return 'b';
  if (diff === -1)
    return num === '7' ? 'maj' : '#';
  else
    return '';
}


module.exports = exports = function(chord) {
  var root = chord.root, type = chord.type, exts = chord.exts, rest;

  if (!exts.length) // Triad
    rest = type;
  else if (exts.length === 1) { // Tetrad
    var num = exts[0].number();
    var asign = sign(exts[0]);
    var name = (num === 6 || num === 7) ? (asign + num) : ('add' + asign + num);

    rest = order(type, name);
  } else {
    // TODO: Implement naming for higher order chords
    console.log('chord', root, type, exts.toString());
  }


  if (/^[b#]/.test(rest))
    return root + '(' + rest + ')';
  else
    return root + rest;
};
