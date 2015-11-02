/********************************************************
*Name: Inverted Index.
*Description: Fast search program (Checkpoint One)
*Author: Babalola Maryam
****************************************************/

//declaring the class Index
var Index = function() {};

/**
 * [function to read a JSON file and store its content]
 * @param  {[Path]} filePath [location of the file to be read]
 * @return {[object]}          [content of the file read]
 */
Index.prototype.readFile = function(filePath) {
  var content;
  $.ajax({
    url:filePath,
    async:false,
    dataType: 'json',
    error: function(err) {
      console.log("error");
    },
    success: function(data) {
      content = data;
    }
  });
  this.content = content;
};//end of the readFile function

/**
 * [function to create an Index of the content of the JSON file]
 * @param  {[Path]} filePath [location of the file to be read]
 * @return {[object]}          [unique words in the file read with their index]
 */
Index.prototype.createIndex = function(filePath) {
  this.readFile(filePath);
  var wordCollection = {};
  var wordsInBook;
  var bookContent = this.content;
  //looping throught the objects in the JSON file
  for(var x in bookContent) {
    for (var y in bookContent[x]) {
      //Collecting, splitting and storing the words in the JSON file in a variable
      wordsInBook = bookContent[x][y].split(' ');
      for (var i in wordsInBook) {
        wordsInBook[i] = wordsInBook[i].toLowerCase().replace(/[.,'':]/g,"");
        //checking through the variable for new words
        if (!wordCollection.hasOwnProperty(wordsInBook[i])) {
           wordCollection[wordsInBook[i]] = [];
          wordCollection[wordsInBook[i]].push(+x);
        } else {
          var objkey = wordCollection[wordsInBook[i]];
          //checking if the index of a particular word exist
          if (objkey.indexOf(+x) === -1) {
            wordCollection[wordsInBook[i]].push(+x);
          }
        }
      }
    }
  }
  this.wordCollection = wordCollection;
};//end of funtion createIndex

/**
 * [function to return the index created in the createIndex Function]
 * @param  {[Path]} filePath [location of the file to be read]
 * @return {[Object]}          [unique words in the file read with their index]
 */
Index.prototype.getIndex = function(filePath) {
  this.createIndex(filePath);
  return this.wordCollection;
};//end of getIndex function

/**
 * [function to search for a term(s) in the collection of words returned by the getIndex Function]
 * @param  {[term]} term [Word(s) to be searched for in the collection]
 * @return {[Object]}      [the word and its index]
 */
Index.prototype.searchIndex = function(term) {
  var wordCollection = this.wordCollection;
  var searchWordIndex = [];
  var sterms;
   if (term.indexOf(" ") !== -1) {
    sterms = term.split(" ");
  } else {
    sterms = term;
  }

  if (typeof sterms === 'string') {
    for(var x in wordCollection) {
      if(sterms === x) {
        searchWordIndex.push(wordCollection[x]);
      }
    }
  }
  else if (typeof sterms === 'object') {
    for (var i in sterms) {
      if(wordCollection.hasOwnProperty(sterms[i])) {
        //looping through the collection of words available
        for (var j in wordCollection) {
          if (sterms[i] === j) {
            searchWordIndex.push(wordCollection[j]);
            break;
          }
        }
      }else {
        searchWordIndex.push('Not Available');
        break;
      }
    }
  }
  return searchWordIndex;
};//end of funtion searchIndex
