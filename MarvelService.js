MarvelService = function MarvelService() { //this function runs third
    var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
    var baseUrl = 'http://gateway.marvel.com/v1/public/'

    var marvelCharacters = []
    var myTeam = []



    //removes hero from the team.
    this.removeFromTeam = function removeFromTeam(removeId) { //19th
        for (let i = 0; i < myTeam.length; i++) {
            const character = myTeam[i];
            if (removeId == character.id)
                myTeam.splice(i, 1)
        }
    }

    this.addToTeam = function addToTeam(marvelId) { // this runs 12th being fed from the controller after the click
        //checks myTeam for character id. If it is there, alert message is given and function ended.
        for (let i = 0; i < myTeam.length; i++) {
            const character = myTeam[i];
            if (marvelId == character.id) {
                alert("HERO ALREADY ON YOUR TEAM!")
                return
            }
        }
        //matches id that was passed to it with an character array and pushes to my team.
        for (let i = 0; i < marvelCharacters.length; i++) { // this is 13th
            const character = marvelCharacters[i];
            if (marvelId == character.id && myTeam.length < 6) {
                myTeam.push(character)
            }
        }
    }

    this.resetTeam = function resetTeam(str){
        if (str == 'reset') {
            myTeam = []
        }
    }

    //returns myTeam back to the Controller
    this.getMyTeam = function getMyTeam(callWhenDone) { // this runs 15th and 20th
        callWhenDone(myTeam)
    }

    
    this.getCharacters = function (callWhenDone) { //this runs sixth because of the call from the controller
        var data = localStorage.getItem('MarvelData')
        if (data) { //this runs seventh(a)
            marvelCharacters = JSON.parse(data);
            return callWhenDone(marvelCharacters)
        }
        $.get(baseUrl + 'characters' + key, function (response) { //this runs 9th depending on if the data is in local storage or not
            localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
            marvelCharacters = response.data.results;
            callWhenDone(marvelCharacters) 
        })
    }

}