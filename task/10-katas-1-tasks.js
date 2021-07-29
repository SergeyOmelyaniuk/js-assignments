/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints(sides = ['N', 'E', 'S', 'W']) {
  const mainPoints = [],
    halfPoints = [],
    quarterPoints = [];

  const update = (array, newArr) => {
    array.forEach((item, index, arr) => {
      newArr.push(item);
      const element = index === arr.length - 1 ? arr[0] : arr[index + 1];
      const point = index % 2 ? element + item : item + element;
      newArr.push(point);
    });
  };

  update(sides, mainPoints);
  update(mainPoints, halfPoints);

  halfPoints.map((item, index, arr) => {
    let element;
    quarterPoints.push(item);
    switch (index % 4) {
    case 0:
      element = arr[index + 4] || arr[0];
      quarterPoints.push(item + 'b' + element);
      break;
    case 1:
      quarterPoints.push(arr[index + 1] + 'b' + arr[index - 1]);
      break;
    case 2:
      element = arr[index + 2] || arr[0];
      quarterPoints.push(item + 'b' + element);
      break;
    default:
      element = arr[index + 1] || arr[0];
      quarterPoints.push(element + 'b' + arr[index - 3]);
    }
  });
  return quarterPoints.map((item, index) => {
    return {
      abbreviation: item,
      azimuth: (360 / quarterPoints.length) * index
    };
  });
}

/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear
 * at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
  const current = [str];
  const result = [];

  while (current.length > 0) {
    str = current.shift();
    const overlap = str.match(/{([^{}]+)}/, 'igm');

    if (overlap) {
      for (const value of overlap[1].split(',')) {
        current.push(str.replace(overlap[0], value));
      }
    } else if (result.indexOf(str) < 0) {
      result.push(str);
      yield str;
    }
  }
}

/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient
 * of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  let count = 0;
  const result = Array.from({ length: n }, () => Array.from({ length: n }, (item, index) => index));
  let time = 0;
  let side = 0;
  let j;
  while (side < n) {
    let i;
    j = side;
    for (i = 0; i <= side; i++) {
      if (time % 2 === 0) {
        result[j][i] = count++;
      } else {
        result[i][j] = count++;
      }
      j--;
    }
    time++;
    side++;
  }
  side--;
  while (side > 0) {
    let i = n - 1;
    let j = n - side;
    for (i; i >= n - side; i--) {
      if (time % 2 === 0) {
        result[i][j] = count++;
      } else {
        result[j][i] = count++;
      }
      j++;
    }
    side--;
    time++;
  }
  return result;
}

/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row
 *  (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
  let bool = false;

  class TreeNode {
    constructor({ value, stock, parent }) {
      this.value = value;
      this.stock = stock;
      this.descendants = [];
      this.parent = parent;
    }

    findValidChildren() {
      return this.stock.filter(item => {
        if (item.includes(this.value[1])) {
          if (item.indexOf(this.value[1]) === 1) {
            this.stock.splice(this.stock.indexOf(item), 1, item.reverse());
          }
          return true;
        }
      });
    }

    pushValidChildren() {
      if (!this) {
        return;
      }
      const children = this.findValidChildren();

      if (children.length === 0 && this.stock.length !== 0) {
        if (!this.parent) {
          return;
        }
        this.parent.descendants.splice(this.parent.descendants[0], 1);
        this.pushValidChildren.call(this.parent.descendants[0]);
      }
      children.forEach(item => {
        this.descendants.push(
          new TreeNode(
            {
              value: item,
              stock: this.stock.filter(i => i !== item),
              parent: this
            }));
      });

      if (this.stock.length === 0) {
        bool = true;
      } else {
        if (this.descendants[0]) {
          (this.descendants[0].pushValidChildren());
        }
      }
    }
  }

  const rootValue = dominoes[0];
  const rootNode = new TreeNode(
    {
      value: rootValue,
      stock: dominoes.filter(i => i !== rootValue),
      parent: null
    });

  rootNode.pushValidChildren();
  return bool;
}

/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end
 *     integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to
 *     more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
  let result = '';
  result += nums[0];

  for (let i = 1; i < nums.length; i++) {
    const previous = nums[i - 1];
    const current = nums[i];
    const next = nums[i + 1];

    const diffPrev = ((current - previous) === 1);
    const diffNext = ((next - current) === 1);

    if (i === 1 && !diffPrev) {
      result += `,`;
    }

    if (diffPrev && !diffNext) {
      const separator = ((current - nums[i - 2]) === 2) ? '-' : ',';
      result += `${separator}${current}`;
      if (i !== nums.length - 1) {
        result += `,`;
      }
    }

    if (!diffPrev && !diffNext) {
      result += `${current}`;
      if (i !== nums.length - 1) {
        result += `,`;
      }
    }

    if (!diffPrev && diffNext) {
      result += `${current}`;
    }
  }

  return result;
}

module.exports = {
  createCompassPoints: createCompassPoints,
  expandBraces: expandBraces,
  getZigZagMatrix: getZigZagMatrix,
  canDominoesMakeRow: canDominoesMakeRow,
  extractRanges: extractRanges
};
