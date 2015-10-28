/********************************************************
*Name: Inverted Index.
*Description: Fast search program
*Author: Babalola Maryam
****************************************************/


	//declaring the class Index
	var Index = function() {};

	/**************************************************
	*
	*Function to read a JSON file and store its content
	*
	***************************************************/
	Index.prototype.readFile = function(filePath){
		var content;
		$.ajax({
			url:filePath,
			async:false,
			dataType: 'json',
			error: function(err){
				console.log("error");
			},
			success: function(data){
				content = data;
			}
		});
		this.content = content;
	};//end of the readFile function

	/**************************************************
	*
	*Function to create an Index of the content of
	*the JSON file
	*
	***************************************************/
	Index.prototype.createIndex = function(filePath){
		var book_content = this.content;
	  this.readFile(filePath);
		var wordCollection = {};
		var wordsInBook;
		//looping throught the objects in the JSON file
		for(var x in book_content){
			for (var y in book_content[x]){
				//Collecting, splitting and storing the words in the JSON file in a variable
		  	wordsInBook = book_content[x][y].split(' ');
				//looping through the words stored in the new variable created
		    for (var i in wordsInBook) {
		    	wordsInBook[i] = wordsInBook[i].toLowerCase().replace(/[.,'':]/g,"");
					//checking through the variable for new words
					if (!wordCollection.hasOwnProperty(wordsInBook[i])){
		         wordCollection[wordsInBook[i]] = [];
		        wordCollection[wordsInBook[i]].push(x);
		      } else {
		        var objkey = wordCollection[wordsInBook[i]];
						//checking if the index of a particular word exist
		        if (objkey.indexOf(x) === -1){
		          wordCollection[wordsInBook[i]].push(x);
		        }//end of if statement
		      }//end of if statement
		    }//end of for loop
		  }//end of for loop
		}//end of for loop
		return wordCollection;
	};//end of funtion createIndex

	/**************************************************
	*
	*Function to return the index created in the
	*createIndex Function
	*
	***************************************************/
	Index.prototype.getIndex = function(filePath){
		return this.createIndex(filePath);
	};//end of getIndex function

	/**************************************************
	*
	*function to search for a term(s) in the collection
	*of words returned by the getIndex Function
	*
	***************************************************/
	Index.prototype.searchIndex = function(term){
		var wordCollection = this.getIndex('books.json');
		var searchWordIndex = [];
		var sterms;
	 			 if (term.indexOf(" ") !== -1){
					sterms = term.split(" ");
			 } else{
					 sterms = term;
			 }
		//looping through the words to be searched for
		 if (typeof sterms === 'string'){
			for(var x in wordCollection){
				if(sterms === x){
					searchWordIndex.push(wordCollection[x]);
				}
			}
		}
		else if (typeof sterms === 'object'){
			for (var i in sterms){
				if(wordCollection.hasOwnProperty(sterms[i])){
					//looping through the collection of words available
					for (var j in wordCollection){
						//comparing the two words
	   				if (sterms[i] === j){
	  					searchWordIndex.push(wordCollection[j]);
							break;
	   				}//end of if statement
	  			}//end of for loop
				}else{
					searchWordIndex.push('Not Available');
					break;
				}
			}
		}//end of for loop
	  return searchWordIndex;
	};//end of funtion searchIndex
