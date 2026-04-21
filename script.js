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
    var platformFamily = (platformType === "xbox" || platformType === "playstation") ? "console" : "pc"; 


    fetch('https://siege.eurpps.com/proxy.php?type=stats&nameOnPlatform=' + encodeURIComponent(PlayerName) + '&platformType=' + platformType + '&platform_families=' + platformFamily, {
        method:"GET",
        headers: {
            'api-key': localStorage.getItem('apiKey')
        }
    })
    
    
    
    .then(response => response.json())
    .then(data => {
        const profile = data.platform_families_full_profiles[0].board_ids_full_profiles[0].find(b => b.board_id === "ranked").full_profiles[0].profile;
        document.getElementById("kills").innerHTML = profile.kills;
    })
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