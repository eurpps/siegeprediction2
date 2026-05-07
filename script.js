
window.storeKey = storeKey;
window.clearKey = clearKey;
window.returnKey = returnKey;
window.datafetch = datafetch;
window.update = update;
window.hide = hide;

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
    var platformFamily = (platformType === "xbl" || platformType === "psn") ? "console" : "pc"; 


    fetch('https://siege.eurpps.com/proxy.php?type=stats&nameOnPlatform=' + encodeURIComponent(PlayerName) + '&platformType=' + platformType + '&platform_families=' + platformFamily, {
        method:"GET",
        headers: {
            'api-key': localStorage.getItem('apiKey')
        }
    })
    
    

.then(data => {
    // const text = await response.text();

    // try {
    //     const data = JSON.parse(text);
    //     console.log(data);
    //     const profile =
    data.platform_families_full_profiles[0]
    .board_ids_full_profiles[0]
    .full_profiles[0]
    .profile;
        document.getElementById("kills").innerHTML = profile.kills;
        console.log("successfully update kills")
        
    // } catch(err) {
    //     console.error("Non-JSON response:");
    //     console.log(text);
    // }
})
.catch(err => console.error('Fetch error:', err));


}
function storeKey() {
    
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
function clearKey() {
    localStorage.removeItem("apiKey");
    document.getElementById("output").innerHTML = "No api key present"
    document.getElementById("output").style.color = "red";
}
function returnKey() {
    alert("Your API key is: " + localStorage.getItem("apiKey"));
}
function hide() {
    const tempElement = document.getElementById("temp");
    if (tempElement) {
        tempElement.style.display = "none";
    }
}


