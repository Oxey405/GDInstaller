var asBeenPlayed = false ;
if(!asBeenPlayed) {
    var sound = new Audio ('gd5_intro.wav');
sound.play();
var asBeenPlayed = true ;
}


var checkcutgd = document.getElementById('checkShortcut');
function checkShortcut() {
// if(checkcutgd.className == "uncheck") {
// checkcutgd.className = "checked";
// return ;
// }
// if(checkcutgd.className == "checked") {
//     checkcutgd.className = "uncheck";
//     return;
//     }
}
var checkDownload = document.getElementById('checkDownload');
function checkDl() {
if(checkDownload.className == "uncheck") {
    checkDownload.className = "checked";
    var installation = document.getElementById('install');
    var dlURL = 'https://github.com/4ian/GDevelop/releases/download/v5.0.0-beta108/GDevelop-5-5.0.0-beta108.AppImage';
    installation.setAttribute('download', '');
    installation.setAttribute('href',dlURL);
return ;
}
if(checkDownload.className == "checked") {
    var installation = document.getElementById('install');
    installation.removeAttribute('download');
    installation.removeAttribute('href');
    checkDownload.className = "uncheck";
    return;
    }
}
var checkLaunch = document.getElementById('checkLaunch');
function checkStart() {
if(checkLaunch.className == "uncheck") {
    checkLaunch.className = "checked";
return ;
}
if(checkLaunch.className == "checked") {
    checkLaunch.className = "uncheck";
    return;
    }
}