const {dialog} = require('electron').remote;
const os = require('os');
const fs = require('fs');
var installDir = os.homedir() + "/.GDevelop" ;
document.getElementById('dirIndication').innerHTML = installDir ;
if(!fs.existsSync(installDir)) {
fs.mkdirSync(installDir);
console.log("Directory created" + installDir);
}

var path ;
function setDirectory() {
    alert("You are going to change the installation directory.");
     path = dialog.showOpenDialog({defaultPath:installDir, properties: ['openDirectory', 'multiSelections'] });
    path.then((value) => {
        console.log(value.filePaths[0]);
        installDir = value.filePaths[0];
        document.getElementById('dirIndication').innerHTML = installDir ;
    })
}