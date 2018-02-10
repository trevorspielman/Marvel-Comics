MarvelController = function MarvelController() { //this function runs second
    var marvelService = new MarvelService()
    
    //Private //this section runs fourth
    function getCharacters() {
        marvelService.getCharacters(drawMarvel) //this runs fifth because of the draw at the bottom of the page
    } //this is seventh if there isn't local storage, 8th if there is.
    function getMyTeam() {
        marvelService.getMyTeam(drawMyTeam)
    }
    function resetTeam() {
        marvelService.resetTeam(resetTeam)
    }

    function drawMarvel(arr) { // this runs 10th after the callback function
        console.log(arr)
        var template = ''
        var marvelElem = document.getElementById("marvel-characters")
        for (var i = 0; i < arr.length; i++) { //this runs 11th + i (runs for every character)
            var char = arr[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            template += `
            <div class="col-4 cards">
            <img src="${char.thumbnail.path + '.' + char.thumbnail.extension}" alt="">
            <h4><b>Name:</b> ${char.name}</h4>
            <p><b>Description:</b> ${char.description}</p>
            <p><b>Comic Appearances:</b>${char.comics.available}</p>
            <button class="btn btn-success" onclick="app.controllers.marvelCtrl.addToTeam(${char.id})">Add to Team</button>
        </div>
            `
        }
        marvelElem.innerHTML = template
    }

    function drawMyTeam(myTeam) { //this is 17th and 21st
        console.log(myTeam)
        var myTeamTemplate = ''
        var myTeamElem = document.getElementById("myTeam")
        for (var i = 0; i < myTeam.length; i++) {
            var char = myTeam[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            myTeamTemplate += `
            <div class="col-4 cards">
            <img src="${char.thumbnail.path + '.' + char.thumbnail.extension}" alt="">
            <h4><b>Name:</b> ${char.name}</h4>
            <p><b>Description:</b> ${char.description}</p>
            <p><b>Comic Appearances:</b>${char.comics.available}</p>
            <button class="btn btn-success" onclick="app.controllers.marvelCtrl.removeFromTeam(${char.id})">Remove from Team</button>
        </div>
            `
        }
        myTeamElem.innerHTML = myTeamTemplate
    }

    function resetTeam(resetTeam) {
        var resetTemplate = ''
        var resetElem = document.getElementById("reset")
        resetTemplate += `
            <button class="btn btn-danger" onclick="app.controllers.marvelCtrl.resetTeam('reset')">RESET TEAM</button>
        </div>
            `
        resetElem.innerHTML = resetTemplate
    }



    //Public
    //passes id number to service.
    this.addToTeam = function addToTeam(marvelId) { //this runs 11th after a click is provided. Won't run until then
        marvelService.addToTeam(marvelId) //this is 14th
        getMyTeam() //this is 16th
    }

    //passes id number to service.
    this.removeFromTeam = function removeFromTeam(removeId) { //18th (onclick)
        marvelService.removeFromTeam(removeId)
        getMyTeam() //19th
    }
    this.resetTeam = function resetTeam(str) {
        marvelService.resetTeam(str)
        getMyTeam()
    }

    resetTeam()
    getCharacters() //this runs 8th
}