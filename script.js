const BASE = 'https://api.r6data.eu';
const proxied = url => 'https://corsproxy.io/?url=' + encodeURIComponent(url);

const RANK_NAMES = [
  'Unranked',
  'Copper V','Copper IV','Copper III','Copper II','Copper I',
  'Bronze V','Bronze IV','Bronze III','Bronze II','Bronze I',
  'Silver V','Silver IV','Silver III','Silver II','Silver I',
  'Gold V','Gold IV','Gold III','Gold II','Gold I',
  'Platinum V','Platinum IV','Platinum III','Platinum II','Platinum I',
  'Emerald V','Emerald IV','Emerald III','Emerald II','Emerald I',
  'Diamond V','Diamond IV','Diamond III','Diamond II','Diamond I',
  'Champion'
];
function datafetch() {
    var PlayerName = document.getElementById("username").value;
    var platformType = document.getElementById("platform").value;
    let platformfamily
    if (platformType == "xbox" || platformType == "playstation") {
        platformfamily = 'console';
    } else {
        platformfamily = "pc";
    }
    fetch(proxied('https://api.r6data.eu/api/stats?type=stats&nameOnPlatform=' + PlayerName + '&platformType=' + platformType + '&platform_families=' + platformfamily, {
        headers: {
            'api-key': '51af0875495505ea6ade106cca14a7b640e407a786aaa925e93aea61333161d473c40235af0851c9d83edfb48e1d4033ff9c9d5ae95828511ff6686b93b4a1d7'
        }
  }))

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Fetch error:', err));
}
function storekey() {
    
    var input = document.getElementById("input").value;
    localStorage.setItem("apiKey", input);
    if (localStorage.getItem("apiKey").length > 0) {
        document.getElementById("output").innerHTML = "Saved"
        document.getElementById("output").style.color = "green";
    }
    else {
        document.getElementById("output").innerHTML = "Error: No key entered"
        document.getElementById("output").style.color = "red";
    }
}
function update(){
    if (localStorage.getItem("apiKey").length > 0) {
        document.getElementById("output").innerHTML = "Saved"
        document.getElementById("output").style.color = "green";
    }
    else {
        document.getElementById("output").innerHTML = "Error: No key entered"
        document.getElementById("output").style.color = "red";
    }
}
function clearkey() {
    localStorage.removeItem("apiKey");
    document.getElementById("output").innerHTML = "No api key present"
    document.getElementById("output").style.color = "red";
}
function returnkey() {
    alert("Your API key is: " + localStorage.getItem("apiKey"));
}
