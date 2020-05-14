'use strict';

const removeArray = (array, name) => {
  const index = array.indexOf(name);
  if (index > -1) array.splice(index, 1);
  return array;
};

module.exports = {
  removeArray,
};

// (function () {
//   const list = [ 'a', 'b', 'c' ];
//
//   console.info(removeArray(list, 'a'), list);
// })();
