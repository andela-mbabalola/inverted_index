/****************************************************************
*Name: Inverted Index Test.
*Description: To test the Inverted Index program's functionality
*Author: Babalola Maryam
*****************************************************************/

describe("Tests the inverted index", function() {
  var newIndex = new Index();

  describe ("A suite to Read Book Data", function() {
    newIndex.readFile('books.json');
    var jsonFile = newIndex.content;
    it("reads a JSON file and assert that it is not empty", function() {
      expect(jsonFile).not.toBe([]);
      expect(jsonFile.length).not.toBe([0]);
    });

    var jsonFileContent = [];
    function jsonFileToArr() {
      for (var i in jsonFile) {
        for (var j in jsonFile[i]) {
          jsonFileContent.push(jsonFile[i][j]);
            return jsonFileContent;
        }
      }
    }
    function isString(data) {
      return typeOf(data) === 'string';
    }
     it("ensures objects in json array contains strings", function() {
    expect(jsonFileContent.every(isString)).toEqual(true);
    });
  });

  describe ("A suite to Populate Index", function() {
    newIndex.getIndex('books.json');
    var getIndex = newIndex.wordCollection;

    var getIndexArr = [];
    for (var i in getIndex) {
      getIndexArr.push(i);
    }

    it("verifies an index is created once the JSON file has been read", function() {
      expect(getIndex).toBeDefined();
      expect(getIndexArr.length).toBeGreaterThan([0]);
    });


    it("verifies that the index maps the keys to the correct object", function() {
      expect(getIndex.lord).toEqual([1]);
      expect(getIndex.rabbit).toEqual([0]);
      expect(getIndex.alliance).toEqual([1]);
      expect(getIndex.alice).toEqual([0]);
      expect(getIndex.of).toEqual([0, 1]);
      expect(getIndex.a).toEqual([0, 1]);
    });
  });

  describe ("A suite to Search Index", function() {
    it("should return true", function() {
      expect(newIndex.searchIndex).toEqual(jasmine.any(Function));
    });

    it("verifies searching an index returns array of indices of correct object", function() {
       expect(newIndex.searchIndex('wonderland')).toEqual([[0]]);
       expect(newIndex.searchIndex('dwarf')).toEqual([[1]]);
       expect(newIndex.searchIndex('hi')).toEqual([]);
       expect(newIndex.searchIndex('lord')).toEqual([[1]]);
       expect(newIndex.searchIndex('a')).toEqual([[0, 1]]);
      expect(newIndex.searchIndex('of')).toEqual([[0,1]]);
    });

    it("can handle varied number of search terms", function() {
      expect(newIndex.searchIndex('alice in wonderland')).toEqual([[0],[0],[0]]);
      expect(newIndex.searchIndex('lord of the rings')).toEqual([[1],[0, 1],[1],[1]]);
      expect(newIndex.searchIndex('man a rabbit hole')).toEqual([[1],[0, 1],[0],[0]]);
    });

    it("ensures search can handle an array of words", function() {
      expect(newIndex.searchIndex(['alice', 'in', 'wonderland'])).toEqual([[0],[0],[0]]);
      expect(newIndex.searchIndex(['lord', 'of', 'the', 'rings'])).toEqual([[1],[0, 1],[1],[1]]);
      expect(newIndex.searchIndex(['an', 'unusual', 'alliance', 'of', 'man'])).toEqual([[1],[1],[1],[0, 1],[1]]);
    });
  });
});
