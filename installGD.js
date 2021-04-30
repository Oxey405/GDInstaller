const { session } = require('electron').remote;
var checkcutgd = document.getElementById('checkShortcut');
var checkDownload = document.getElementById('checkDownload');
var checkLaunch = document.getElementById('checkLaunch');
function installation() {
    alert("Installation starting");
    if (checkcutgd.className == "checked") {
        var sudo = require('sudo-prompt');
        var options = {
            name: 'GDInstaller'
        };
        //Oh my gosh what an epic string variable !
        var desktopEntry = `[Desktop Entry]\r\nType=Application\r\nName=GDevelop5\r\nComment=GDevelop is an open-source, cross-platform game engine designed for eve>\r\nIcon=${document.getElementById('dirIndication').innerHTML}/GDlogo.png\r\nExec=${document.getElementById('dirIndication').innerHTML}/gdevelop5.AppImage\r\nTerminal=false\r\nStartupNotify=false\r\nCategories=Applications\r\nKeywords=GDevelop`;
        sudo.exec(`echo "${desktopEntry}" >> /usr/share/applications/gd5.desktop`, options,
            function (error, stdout, stderr) {
                console.error(error.message.toString());
                if(error.message.toString() == "User did not grant permission.") {
                    dialog.showMessageBox({message:"Error : \r\nYou didn't grant the permissions to create a desktop entry. \r\n please try again and grant the permissions \r\n (If the problem happen even if you granted the permissions please contact us on github) \r\n Error Code : NO_SUDO_PERM_INSTALLGD", type:"error",title:"Permissions error"});
                }
                if (error) throw error;
                console.log('stdout: ' + stdout);
            }
        );
        const http = require('https'); // or 'https' for https:// URLs
        const fs = require('fs');

        const file = fs.createWriteStream(document.getElementById('dirIndication').innerHTML+"/GDlogo.png");
        const request = http.get("https://i.postimg.cc/59FgFt34/gd-logo-notxt.png", function (response) {
            response.pipe(file);
        });
    }


    if (checkDownload.className == "checked") {
        console.log("Downloading...");
        console.log(document.getElementById('dirIndication').innerHTML + "/");
    }


    if (checkLaunch.className == "checked") {

    }
}
session.defaultSession.on("will-download", function (event, downloadItem, webContent) {

    downloadItem.setSavePath(document.getElementById('dirIndication').innerHTML + "/gdevelop5.AppImage");

    downloadItem.on('done', function (event, state) {

        const downloadFinished = new Notification('GDInstaller : Download finished', {
            body: 'The download is completed !'
        })
        var oldPath = os.tmpdir() + "/.GDInstall";
        var newPath = document.getElementById('dirIndication').innerHTML;

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    }
    );

    downloadItem.on('updated', function (event, state) {
        if (state === 'progressing') {
            var installation = document.getElementById('downloading...');
            let percentage = downloadItem.getReceivedBytes() / downloadItem.getTotalBytes();
            percent = percentage * 100;
            percent = parseFloat(percent.toFixed(2));
            document.getElementById('steps').value = percent;
            // console.log(downloadItem);
        }
        if (state === "interrupted") {
            const DwnldCantGet = new Notification('GDinstaller : Download informations', {
                body: 'GDInstaller is unable to get files from the server... check your connexion'
            })
        }
    });


});