MarvelController = function MarvelController() {
    var marvelService = new MarvelService()

    //Private
    function getCharacters() {
        marvelService.getCharacters(drawMarvel)
    }
    function getMyTeam() {
        marvelService.getMyTeam(drawMyTeam)
    }
    function resetTeam() {
        marvelService.resetTeam(resetTeam)
    }

    function drawMarvel(arr) {
        console.log(arr)
        var template = ''
        var marvelElem = document.getElementById("marvel-characters")
        for (var i = 0; i < arr.length; i++) {
            var char = arr[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            template += `
            <div class="col-4 character">
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

    function drawMyTeam(myTeam) {
        console.log(myTeam)
        var myTeamTemplate = ''
        var myTeamElem = document.getElementById("myTeam")
        for (var i = 0; i < myTeam.length; i++) {
            var char = myTeam[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            myTeamTemplate += `
            <div class="col-4 character">
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
    this.addToTeam = function addToTeam(marvelId) {
        marvelService.addToTeam(marvelId)
        getMyTeam()
    }

    //passes id number to service.
    this.removeFromTeam = function removeFromTeam(removeId) {
        marvelService.removeFromTeam(removeId)
        getMyTeam()
    }
    this.resetTeam = function resetTeam(str) {
        marvelService.resetTeam(str)
        getMyTeam()
    }

    resetTeam()
    getCharacters()
}