const assert = require('assert');
const {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  timespanToHumanString,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition
} = require('../task/06-conditions-n-loops-tasks');

it.optional = require('../extensions/it-optional');

describe('06-conditions-n-loops-tasks', () => {
  it('getFizzBuzz should return the output value according specification', () => {
    [
      1, 2, 4, 7, 8, 11, 13, 14, 16, 17, 19, 22, 23, 26, 28, 29, 31, 32, 34,
      37, 38, 41, 43, 44, 47, 49, 52, 53, 56, 58, 59, 61, 62, 64, 67, 68, 71,
      73, 74, 76, 77, 79, 82, 83, 86, 88, 89, 91, 92, 94, 97, 98
    ].forEach(num => {
      const actual = getFizzBuzz(num);
      assert.equal(
        actual,
        num,
        `getFizzBuzz shoud return ${num} for ${num}, but actually ${actual}`
      );
    });

    [
      3, 6, 9, 12, 18, 21, 24, 27,
      33, 36, 39, 42, 48, 51, 54, 57,
      63, 66, 69, 72, 78, 81, 84, 87,
      93, 96, 99
    ].forEach(num => {
      const actual = getFizzBuzz(num);
      assert.equal(
        actual,
        'Fizz',
        `getFizzBuzz shoud return 'Fizz' for ${num}, but actually ${actual}`
      );
    });

    [
      5, 10, 20, 25, 35, 40, 50, 55, 65, 70, 80, 85, 95, 100
    ].forEach(num => {
      const actual = getFizzBuzz(num);
      assert.equal(
        actual,
        'Buzz',
        `getFizzBuzz shoud return 'Buzz' for ${num}, but actually ${actual}`
      );
    });

    [
      15, 30, 45, 60, 75, 90
    ].forEach(num => {
      const actual = getFizzBuzz(num);
      assert.equal(
        actual,
        'FizzBuzz',
        `getFizzBuzz shoud return 'FizzBuzz' for ${num}, but actually ${actual}`
      );
    });

    assert.linesOfCode(getFizzBuzz, 8);
  });


  it('getFactorial should return the functorial of given number', () => {
    [
      { n: 1, expected: 1 },
      { n: 5, expected: 120 },
      { n: 10, expected: 3628800 }
    ].forEach(data => {
      const actual = getFactorial(data.n);
      assert.equal(
        actual,
        data.expected,
        `${data.n}! = ${data.expected}, but actual ${actual}`
      );
    });

    assert.linesOfCode(getFactorial, 5);
  });


  it('getSumBetweenNumbers should return the sum inside the specified interval', () => {
    [
      { n1: 1, n2: 2, expected: 3 },
      { n1: 5, n2: 10, expected: 45 },
      { n1: -1, n2: 1, expected: 0 }
    ].forEach(data => {
      const actual = getSumBetweenNumbers(data.n1, data.n2);
      assert.equal(
        actual,
        data.expected,
        `Sum of [${data.n1},${data.n2}] = ${data.expected}, but actual ${actual}`
      );
    });

    assert.linesOfCode(getSumBetweenNumbers, 1);
  });


  it('isTriangle should check if triangle can be built', () => {
    [
      { sides: [1, 2, 3], expected: false },
      { sides: [3, 4, 5], expected: true },
      { sides: [10, 1, 1], expected: false },
      { sides: [10, 10, 10], expected: true }
    ].forEach(data => {
      [[0, 1, 2], [0, 2, 1], [1, 2, 0], [1, 0, 2], [2, 0, 1], [2, 1, 0]].forEach(idx => {
        const actual = isTriangle(
          data.sides[idx[0]],
          data.sides[idx[1]],
          data.sides[idx[2]]
        );
        assert.equal(
          actual,
          data.expected,
          `Triangle from [${data.sides.toString()}]: expected ${data.expected} but actual ${actual}`
        );
      });
    });

    assert.linesOfCode(isTriangle, 3);
  });


  it('doRectanglesOverlap should return true if rectangles overlap', () => {
    [
      {
        rect1: {
          top: 0, left: 0, width: 10, height: 10
        },
        rect2: {
          top: 5, left: 5, width: 10, height: 10
        },
        expected: true
      }, {
        rect1: {
          top: 10, left: 10, width: 10, height: 10
        },
        rect2: {
          top: 5, left: 5, width: 15, height: 15
        },
        expected: true
      }, {
        rect1: {
          top: 10, left: 10, width: 50, height: 5
        },
        rect2: {
          top: 5, left: 5, width: 10, height: 50
        },
        expected: true
      }, {
        rect1: {
          top: 0, left: 0, width: 90, height: 90
        },
        rect2: {
          top: 25, left: 25, width: 10, height: 10
        },
        expected: true
      }, {
        rect1: {
          top: 5, left: 5, width: 20, height: 20
        },
        rect2: {
          top: 5, left: 5, width: 40, height: 10
        },
        expected: true
      }, {
        rect1: {
          top: 5, left: 5, width: 20, height: 20
        },
        rect2: {
          top: 30, left: 5, width: 40, height: 10
        },
        expected: false
      }, {
        rect1: {
          top: 0, left: 0, width: 90, height: 90
        },
        rect2: {
          top: 25, left: 100, width: 10, height: 10
        },
        expected: false
      }
    ].forEach(data => {
      assert.equal(
        doRectanglesOverlap(data.rect1, data.rect2),
        data.expected,
        `doRectanglesOverlap(\n   ${JSON.stringify(data.rect1)},\n   ${JSON.stringify(data.rect2)}\n): expected ${data.expected}`
      );
    });

    assert.linesOfCode(doRectanglesOverlap, 9, 6);
  });


  it('isInsideCircle should return true if point lies inside of the specified circle', () => {
    [
      {
        circle: { center: { x: 0, y: 0 }, radius: 10 },
        point: { x: 0, y: 0 },
        expected: true
      }, {
        circle: { center: { x: 5, y: 5 }, radius: 6 },
        point: { x: 5, y: 10.99 },
        expected: true
      }, {
        circle: { center: { x: 0, y: 0 }, radius: 10 },
        point: { x: 0, y: 10 },
        expected: false
      }, {
        circle: { center: { x: 5, y: 5 }, radius: 6 },
        point: { x: 0, y: 0 },
        expected: false
      }, {
        circle: { center: { x: 2, y: 2 }, radius: 1 },
        point: { x: 2.8, y: 2.8 },
        expected: false
      }, {
        circle: { center: { x: 2, y: 2 }, radius: 4 },
        point: { x: -1, y: -1 },
        expected: false
      }, {
        circle: { center: { x: 2, y: 2 }, radius: 4 },
        point: { x: 2, y: 6.1 },
        expected: false
      }
    ].forEach(data => {
      assert.equal(
        isInsideCircle(data.circle, data.point),
        data.expected,
        `isInsideCircle(\n   ${JSON.stringify(data.circle)},\n   ${JSON.stringify(data.point)}\n): expected ${data.expected}`
      );
    });

    assert.linesOfCode(isInsideCircle, 2);
  });


  it('findFirstSingleChar should return the first unrepeated char from string', () => {
    [
      { str: 'The quick brown fox jumps over the lazy dog', expected: 'T' },
      { str: 'abracadabra', expected: 'c' },
      { str: 'entente', expected: null }
    ].forEach(data => {
      const actual = findFirstSingleChar(data.str);
      assert.equal(
        actual,
        data.expected,
        `First single char of '${data.str}' = '${data.expected}', but actual '${actual}'`
      );
    });

    assert.linesOfCode(findFirstSingleChar, 6);
  });


  it('getIntervalString should return the string representation of math interval', () => {
    [
      {
        a: 0,
        b: 1,
        isStartIncluded: true,
        isEndIncluded: true,
        expected: '[0, 1]'
      }, {
        a: 0,
        b: 1,
        isStartIncluded: true,
        isEndIncluded: false,
        expected: '[0, 1)'
      }, {
        a: 0,
        b: 1,
        isStartIncluded: false,
        isEndIncluded: true,
        expected: '(0, 1]'
      }, {
        a: 0,
        b: 1,
        isStartIncluded: false,
        isEndIncluded: false,
        expected: '(0, 1)'
      }, {
        a: 5,
        b: 3,
        isStartIncluded: true,
        isEndIncluded: true,
        expected: '[3, 5]'
      }
    ].forEach(data => {
      const actual = getIntervalString(data.a, data.b, data.isStartIncluded, data.isEndIncluded);
      assert.equal(
        actual,
        data.expected,
        `getIntervalString(${data.a}, ${data.b}, ${data.isStartIncluded}, ${data.isEndIncluded}) shoud return '${data.expected}', but actually '${actual}'`
      );
    });

    assert.linesOfCode(getIntervalString, 6);
  });


  it('reverseString should return the specified string in reverse order', () => {
    [
      { str: 'The quick brown fox jumps over the lazy dog', expected: 'god yzal eht revo spmuj xof nworb kciuq ehT' },
      { str: 'abracadabra', expected: 'arbadacarba' },
      { str: 'rotator', expected: 'rotator' },
      { str: 'noon', expected: 'noon' }
    ].forEach(data => {
      const actual = reverseString(data.str);
      assert.equal(
        actual,
        data.expected,
        `Reversed '${data.str}' = '${data.expected}', but actual '${actual}'`
      );
    });

    assert.linesOfCode(reverseString, 1);
  });


  it('reverseInteger should return the specified number in reverse order', () => {
    [
      { num: 12345, expected: 54321 },
      { num: 1111, expected: 1111 },
      { num: 87354, expected: 45378 },
      { num: 34143, expected: 34143 }
    ].forEach(data => {
      const actual = reverseInteger(data.num);
      assert.equal(
        actual,
        data.expected,
        `Reversed ${data.num} = ${data.expected}, but actual ${actual}`
      );
    });

    assert.linesOfCode(reverseInteger, 1);
  });


  it('isCreditCardNumber should validate CCN', () => {
    [
      79927398713,
      4012888888881881,
      5123456789012346,
      378282246310005,
      371449635398431,
      378734493671000,
      5610591081018250,
      30569309025904,
      38520000023237,
      6011111111111117,
      6011000990139424,
      3530111333300000,
      3566002020360505,
      5555555555554444,
      5105105105105100,
      4111111111111111,
      4012888888881881,
      4222222222222,
      5019717010103742,
      6331101999990016,
      54891243456789010
    ].forEach(ccn => {
      assert(
        isCreditCardNumber(ccn),
        `CCN ${ccn} is valid, but actually not`
      );
    });


    [
      4571234567890111,
      5436468789016589,
      4916123456789012,
      371449635398430,
      9112893456789010
    ].forEach(ccn => {
      assert(
        isCreditCardNumber(ccn) === false,
        `CCN ${ccn} is not valid, but actually yes`
      );
    });
  });


  it('getDigitalRoot should return the cyclic sum of all digits', () => {
    [
      { num: 12345, expected: 6 },
      { num: 23456, expected: 2 },
      { num: 10000, expected: 1 },
      { num: 165536, expected: 8 }
    ].forEach(data => {
      const actual = getDigitalRoot(data.num);
      assert.equal(
        actual,
        data.expected,
        `GetDigitalRoot(${data.num}) = ${data.expected}, but actual ${actual}`
      );
    });

    assert.linesOfCode(getDigitalRoot, 2);
  });


  it('isBracketsBalanced should check the balanced brackets', () => {
    [
      '[]', '[[][][[]]]', '[[][]]', '', '<>', '{}', '()', '<()>', '{<>}', '[{}]',
      '[{(<()[]{}<>>)}]', '{}<>()[]', '{<>}{()}[[]](())'
    ].forEach(str => {
      assert(
        isBracketsBalanced(str),
        `'${str}' has balanced brackets, but actually not`
      );
    });


    [
      '[[]', '][', '[][][][][[]', '{)', '<]', '(}', '[{]}', '{<}>', '{{[(])}}', '{}()[]<',
      '{', '(', '[', '({}[]<>(((())))', '{{[]}}>'
    ].forEach(str => {
      assert(
        isBracketsBalanced(str) === false,
        `'${str}' has unbalanced brackets, but actually yes`
      );
    });

    assert.linesOfCode(isBracketsBalanced, 13);
  });


  it('toNaryString should return the n-ary string representation of number', () => {
    [
      { num: 1024, n: 2, expected: '10000000000' },
      { num: 6561, n: 3, expected: '100000000' },
      { num: 365, n: 2, expected: '101101101' },
      { num: 365, n: 3, expected: '111112' },
      { num: 365, n: 4, expected: '11231' },
      { num: 365, n: 5, expected: '2430' },
      { num: 365, n: 6, expected: '1405' },
      { num: 365, n: 7, expected: '1031' },
      { num: 365, n: 9, expected: '445' },
      { num: 365, n: 10, expected: '365' }
    ].forEach(data => {
      const actual = toNaryString(data.num, data.n);
      assert.equal(
        actual,
        data.expected,
        `${data.num} with radix ${data.n} = ${data.expected}, but actual ${actual}`
      );
    });

    assert.linesOfCode(toNaryString, 7);
  });


  it('getCommonDirectoryPath should return the n-ary string representation of number', () => {
    [
      {
        pathes: ['/web/images/image1.png', '/web/images/image2.png'],
        expected: '/web/images/'
      }, {
        pathes: ['/web/assets/style.css', '/web/scripts/app.js', 'home/setting.conf'],
        expected: ''
      }, {
        pathes: ['/web/assets/style.css', '/.bin/mocha', '/read.me'],
        expected: '/'
      }, {
        pathes: ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'],
        expected: '/'
      }
    ].forEach(data => {
      const actual = getCommonDirectoryPath(data.pathes, data.n);
      assert.equal(
        actual,
        data.expected,
        `Common directory path fo [${data.pathes}] = ${data.expected}, but actual ${actual}`
      );
    });
  });


  it('getMatrixProduct should return the product of two specified matrices', () => {
    [
      {
        m1: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ],
        m2: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ],
        expected: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]
      }, {
        m1: [
          [1, 2, 3]
        ],
        m2: [
          [4],
          [5],
          [6]
        ],
        expected: [[32]]
      }
    ].forEach(data => {
      const actual = getMatrixProduct(data.m1, data.m2);
      assert.deepEqual(
        actual,
        data.expected,
        `Product of [${data.m1}] x [${data.m2}] = [${data.expected}], but actual ${actual}`
      );
    });

    assert.linesOfCode(getMatrixProduct, 12);
  });

  it('timespanToHumanString should return the human string representation of datetime period', () => {
    [
      {
        startDate: '2000-01-01 01:00:00.100',
        endDate: '2000-01-01 01:00:00.200',
        expected: 'a few seconds ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:00:30.000',
        expected: 'a few seconds ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:00:45.000',
        expected: 'a few seconds ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:00:45.001',
        expected: 'a minute ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:01:00.000',
        expected: 'a minute ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:01:30.000',
        expected: 'a minute ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:01:30.001',
        expected: '2 minutes ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:05:30.000',
        expected: '5 minutes ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:45:00.000',
        expected: '45 minutes ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 01:45:00.001',
        expected: 'an hour ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 02:00:00.000',
        expected: 'an hour ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 02:30:00.000',
        expected: 'an hour ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 02:30:00.001',
        expected: '2 hours ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 05:30:00.000',
        expected: '4 hours ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 05:30:00.001',
        expected: '5 hours ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 23:00:00.000',
        expected: '22 hours ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-01 23:00:00.001',
        expected: 'a day ago'
      }, {
        startDate: '2000-01-01 01:00:00.000',
        endDate: '2000-01-02 01:00:00.000',
        expected: 'a day ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-01-02 12:00:00.000',
        expected: 'a day ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-01-02 12:00:00.001',
        expected: '2 days ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-01-05 12:00:00.000',
        expected: '4 days ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-01-26 00:00:00.000',
        expected: '25 days ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-01-26 00:00:00.001',
        expected: 'a month ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-02-01 00:00:00.000',
        expected: 'a month ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-02-15 00:00:00.000',
        expected: 'a month ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-02-16 00:00:00.000',
        expected: '2 months ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-05-20 00:00:00.000',
        expected: '5 months ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-12-10 00:00:00.000',
        expected: '11 months ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2000-12-12 00:00:00.000',
        expected: 'a year ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2001-02-15 00:00:00.001',
        expected: 'a year ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2001-06-01 00:00:00.001',
        expected: 'a year ago'
      }, {
        startDate: '2000-01-01 00:00:00.000',
        endDate: '2015-02-15 00:00:00.001',
        expected: '15 years ago'
      }
    ].forEach(data => {
      const actual = timespanToHumanString(new Date(data.startDate), new Date(data.endDate));
      assert.equal(
        actual,
        data.expected,
        `timespanToHumanString('${data.startDate}', '${data.endDate}') shoud return '${data.expected}', but actually '${actual}'`
      );
    });
  });


  it('evaluateTicTacToePosition should return the winner if defined', () => {
    const X = 'X';
    const O = '0';

    function positionToSting(position) {
      let result = '';
      for (let i = 0; i < 3; i++) {
        result += '-------------\n| ';
        for (let j = 0; j < 3; j++) {
          result += `${position[i][j] ? position[i][j] : ' '} | `;
        }
        result += '\n';
      }
      result += '-------------';
      return result;
    }

    [[
      [X, X, X],
      [O, O],
      [O, , ]
    ], [
      [, O, O],
      [X, X, X],
      [O, , O]
    ], [
      [, , O],
      [O, , O],
      [X, X, X]
    ], [
      [X, , O],
      [X, , O],
      [X, O]
    ], [
      [O, X, O],
      [X, X, O],
      [O, X]
    ], [
      [O, O, X],
      [X, O, X],
      [O, X, X]
    ], [
      [X, O, O],
      [X, X, O],
      [O, X, X]
    ], [
      [O, O, X],
      [X, X, O],
      [X, , O]
    ]
    ].forEach(data => {
      const actual = evaluateTicTacToePosition(data);
      assert.equal(
        actual,
        X,
        `Position: \n${positionToSting(data)}\n  The winner is X, but actually '${actual}'`
      );
    });

    [[
      [O, O, O],
      [, X, X],
      [X, , ]
    ], [
      [X, X],
      [O, O, O],
      [X, , X]
    ], [
      [, , ],
      [X, , X],
      [O, O, O]
    ], [
      [O, , X],
      [O, X, X],
      [O, X]
    ], [
      [X, O, X],
      [X, O, O],
      [O, O, X]
    ], [
      [X, X, O],
      [X, O, O],
      [, X, O]
    ], [
      [O, X, X],
      [X, O, X],
      [O, X, O]
    ], [
      [X, X, O],
      [X, O, X],
      [O, , X]
    ]
    ].forEach(data => {
      const actual = evaluateTicTacToePosition(data);
      assert.equal(
        actual,
        O,
        `Position: \n${positionToSting(data)}\n  The winner is O, but actually '${actual}'`
      );
    });

    [[
      [, , ],
      [, , ],
      [, , ]
    ], [
      [X, , ],
      [O, O],
      [, , X]
    ], [
      [X, O, X],
      [X, O, X],
      [O, X, O]
    ], [
      [X, O, X],
      [O, X, X],
      [O, X, O]
    ], [
      [X, O, X],
      [O, , O],
      [X, O, X]
    ]
    ].forEach(data => {
      const actual = evaluateTicTacToePosition(data);
      assert.equal(
        actual,
        undefined,
        `Position: \n${positionToSting(data)}\n  The winner is undefined, but actually '${actual}'`
      );
    });
  });
});
