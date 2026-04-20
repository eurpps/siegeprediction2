const BASE = 'https://api.r6data.eu';


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
    var platformFamily
    if (platformType == "xbox" || platformType == "playstation") {
        platformFamily = 'console';
    } else {
        platformFamily = "pc";
    }
    fetch('https://api.r6data.eu/api/stats?type=stats&nameOnPlatform=' + PlayerName + '&platformType=' + platformType + '&platform_families=' + platformFamily, {
        headers: {
            'api-key': localStorage.getItem('apiKey')
        }
  })
    console.log('https://api.r6data.eu/api/stats?type=stats&nameOnPlatform=' + PlayerName + '&platformType=' + platformType + '&platform_families=' + platformFamily, {
        headers: {
            'api-key': localStorage.getItem('apiKey')
        }
  })

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
    if (localStorage.getItem("apiKey")) {
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
function hide() {
    document.getElementById("temp").style.display = "none";
}