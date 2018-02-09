MarvelService = function MarvelService() {
    var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
    var baseUrl = 'http://gateway.marvel.com/v1/public/'

    var marvelCharacters = []
    var myTeam = []



    //removes hero from the team.
    this.removeFromTeam = function removeFromTeam(removeId) {
        for (let i = 0; i < myTeam.length; i++) {
            const character = myTeam[i];
            if (removeId == character.id)
                myTeam.splice(i, 1)
        }
    }

    this.addToTeam = function addToTeam(marvelId) {
        //checks myTeam for character id. If it is there, alert message is given and function ended.
        for (let i = 0; i < myTeam.length; i++) {
            const character = myTeam[i];
            if (marvelId == character.id) {
                alert("HERO ALREADY ON YOUR TEAM!")
                return
            }
        }
        //matches id that was passed to it with an character array and pushes to my team.
        for (let i = 0; i < marvelCharacters.length; i++) {
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
    this.getMyTeam = function getMyTeam(callWhenDone) {
        callWhenDone(myTeam)
    }

    this.getCharacters = function (callWhenDone) {
        var data = localStorage.getItem('MarvelData')
        if (data) {
            marvelCharacters = JSON.parse(data);
            return callWhenDone(marvelCharacters)
        }
        $.get(baseUrl + 'characters' + key, function (response) {
            localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
            marvelCharacters = response.data.results;
            callWhenDone(marvelCharacters)
        })
    }

}