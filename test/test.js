const assert = require('chai').assert
const expect = require('chai').expect
const app = require('../index');

describe('21dayCodingChallenge', () => {
  describe('countRows', () => {
    it('Should return the number of rows', () => {
      assert.equal(app.countRows(), 10);
    });
  });

  describe('countColumns', () => {
    it('Should return the number of columns', () => {
      assert.equal(app.countColumns(), 10);
    });
  });

  describe('gridSize', () => {
    it('Should return the size of the grid as a string', () => {
      assert.typeOf(app.gridSize(), 'string');
    });
    it('Should return 10 x 10', () => {
      assert.deepEqual(app.gridSize(), '10 x 10');
    });
  });

  describe('totalCells', () => {
    it('Should return total count of cells in grid', () => {
      assert.equal(app.totalCells(), 100);
    });
  });

  describe('convertColumn', () => {
    it('Should convert column to index of array', () => {
      assert.equal(app.convertColumn('A1'), 0);
    });
  });

  describe('isRock', () => {
    it('Should return true if cell contents are ^', () => {
      assert.equal(app.isRock('D1'), true)
    })
    it('Should return false if cell contents are not ^', () => {
      assert.equal(app.isRock('E1'), false)
    })
  })

  describe('isCurrent', () => {
    it('Should return true if cell contents are ~', () => {
      assert.equal(app.isCurrent('E2'), true)
    })
    it('Should return false if cell contents are not ~', () => {
      assert.equal(app.isCurrent('E3'), false)
    })
  })

  describe('isShip', () => {
    it('Should return true if cell contents are v', () => {
      assert.equal(app.isShip('C2'), true)
    })
    it('Should return false if cell contents are not v', () => {
      assert.equal(app.isShip('C4'), false)
    })
  })

  describe('lightRow', () => {
    it('Should return contents of row as Array', () => {
      assert.isArray(app.lightRow(1))
    })
    it('Should return contents of row', () => {
      expect(app.lightRow(1)).to.deep.equal(["", "", "", "^", "", "", "", "", "", ""])
    })
  })

  describe('lightColumn', () => {
    it('Should return contents of column as Array', () => {
      assert.isArray(app.lightColumn('A'), 'Column is not an array')
    })
    it('Should return contents of column', () => {
      expect(app.lightColumn('B')).to.deep.equal(["", "", "v", "", "", "", "", "^", "^", "^"], "Did not contain expect contents")
    })
  })

  describe('lightCell', () => {
    it('Should return contents of selected cell D1', () => {
      assert.equal(app.lightCell('D1'), '^')
    })
    it('Should return false if column doesnt exist', () => {
      assert.equal(app.lightCell('K1'), false)
    })
    it('Should return false if row doesnt exist', () => {
      assert.equal(app.lightCell('J11'), false)
    })
  })

  describe('allRocks', () => {
    it('Should return cell locations with rocks ^', () => {
      assert.deepEqual(app.allRocks(), ['D1', 'E3', 'F3', 'E4', 'F4', 'B8', 'H8', 'B9', 'B10'])
    })
  })

  describe('allCurrents', () => {
    it('Should return call locations with strong currents ~', () => {
      assert.deepEqual(app.allCurrents(), ['E2', 'C8', 'D8', 'D9', 'E9', 'E10', 'F10'])
    })
  })

  describe('allShips', () => {
    it('Should return call locations with ships v', () => {
      assert.deepEqual(app.allShips(), ['C2', 'B3', 'I5'])
    })
  })

  describe('firstRock', () => {
    it('Should return the coordinates of the first rock', () => {
      assert.equal(app.firstRock(), 'D1')
    })
  })

  describe('firstCurrent', () => {
    it('Should return the coordinates of the first current', () => {
      assert.equal(app.firstCurrent(), 'E2')
    })
  })

  describe('shipReport', () => {
    it('Should return an array of the coordinates of the ship furthest to the west (left) and east (right) of your GRID', () => {
      assert.deepEqual(app.shipReport(), ['B3', 'I5'])
    })
  })

  describe('howDangerous', () => {
    it('Should return 0 for cell doesnt exist', () => {
      assert.equal(app.howDangerous('Z1'), 0)
    })

    it('Should return 0 for no danger', () => {
      assert.equal(app.howDangerous('A1'), 0)
    })

    it('Shoud return how dangerous a cell is. Currents will return 50.', () => {
      assert.equal(app.howDangerous('E2'), 50)
    })

    it('Should return how dangerous a cell is. Rocks will return 100', () => {
      assert.equal(app.howDangerous('E3'), 100)
    })
  })

  describe('percentageReport', () => {
    it('Should return an array [%rocks,%currents]', () => {
      assert.deepEqual(app.percentageReport(), [9.00, 7.00])
    })
  })

  describe('safetyReport', () => {
    it('Should return the grid with the dangers replaces by % Dangerous.', () => {
      assert.deepEqual(app.safetyReport(),
        [['0', '0', '0', '100', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '50', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '100', '100', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '100', '100', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '100', '50', '50', '0', '0', '0', '100', '0', '0'],
        ['0', '100', '0', '50', '50', '0', '0', '0', '0', '0'],
        ['0', '100', '0', '0', '50', '50', '0', '0', '0', '0']])
    })
  })

  describe('calcDistance', () => {
    it('Should return the distance between two points on same row', () => {
      assert.equal(app.calcDistance('A1', 'J1'), 9)
    })
    it('Should return the distance between two points on same column', () => {
      assert.equal(app.calcDistance('A1', 'A10'), 9)
    })
    it('Should return the distance between two points diagonal', () => {
      assert.equal(app.calcDistance('A1', 'J10'), 12.73)
    })
  })
  

})
