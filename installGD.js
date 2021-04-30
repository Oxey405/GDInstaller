const { session } = require('electron').remote;
const child = require('child_process');

var checkcutgd = document.getElementById('checkShortcut');
var checkDownload = document.getElementById('checkDownload');
var checkLaunch = document.getElementById('checkLaunch');
var step = 0;
function installation() {
    alert("Installation starting");
    if (checkcutgd.className == "checked") {
        //Ask for sudo permissions
        var sudo = require('sudo-prompt');
        var options = {
            name: 'GDInstaller'
        };
        //Desktop entry creation
        var desktopEntry = `[Desktop Entry]\r\nType=Application\r\nName=GDevelop5\r\nComment=GDevelop is an open-source, cross-platform game engine designed for eve>\r\nIcon=${document.getElementById('dirIndication').innerHTML}/GDlogo.png\r\nExec=${document.getElementById('dirIndication').innerHTML}/gdevelop5.AppImage\r\nTerminal=false\r\nStartupNotify=false\r\nCategories=Applications\r\nKeywords=GDevelop`;
        sudo.exec(`echo "${desktopEntry}" >> /usr/share/applications/gd5.desktop`, options,
            function (error, stdout, stderr) {
                //if there is no error... next step
                if (error == undefined) { step = 1; return; }
                //if error then alert the user
                if (error.message.toString() == "User did not grant permission.") {
                    dialog.showMessageBox({ message: "Error : \r\nYou didn't grant the permissions to create a desktop entry. \r\n please try again and grant the permissions \r\n (If the problem happen even if you granted the permissions please contact us on github) \r\n Error Code : NO_SUDO_PERM_INSTALLGD", type: "error", title: "Permissions error" });
                }
                step = 1;
                if (error) throw error;

            }
        );
        const http = require('https'); // or 'https' for https:// URLs
        const fs = require('fs');

        const file = fs.createWriteStream(document.getElementById('dirIndication').innerHTML + "/GDlogo.png");
        const request = http.get("https://i.postimg.cc/59FgFt34/gd-logo-notxt.png", function (response) {
            response.pipe(file);
        });
    }


    if (checkDownload.className == "checked" && step == 1) {
        console.log("Downloading...");
        console.log(document.getElementById('dirIndication').innerHTML + "/");
    }
    //if not tick just go to next
    if (checkDownload.className == "uncheck" && step == 1) {
        step = 2;
    }
    if (checkLaunch.className == "uncheck" && step == 1) {
        step = 2;
    }


    console.log("This line is before the text to check");
    if (checkLaunch.className == "checked" && step >= 2) {
        var executable = document.getElementById('dirIndication').innerHTML + "/gdevelop5.AppImage";
        console.log("Launching GDevelop (" + executable + ")");
        //asking for permission to chmod the executable
        var sudo = require('sudo-prompt');
        var options = {
            name: 'GDInstaller'
        };
        child.exec('chmod +x ' + executable, (error, stdout, stderr) => {
            //aucune erreur donnée ici
        });
        child.exec(executable, (error, stdout, stderr) => {
            step = 3;
            if (error) {
                throw error;
            }
            console.log(stdout);
        });

    }
}
//handling download
session.defaultSession.on("will-download", function (event, downloadItem, webContent) {

    downloadItem.setSavePath(document.getElementById('dirIndication').innerHTML + "/gdevelop5.AppImage");
    //on download done
    downloadItem.on('done', function (event, state) {
        step = 2;
        //notification
        const downloadFinished = new Notification('GDInstaller : Download finished', {
            body: 'The download is completed !'
        })
        if (checkLaunch.className == "checked") {
            var executable = document.getElementById('dirIndication').innerHTML + "/gdevelop5.AppImage";
            //moving the executable from tempdir to installation directory
            var oldPath = os.tmpdir() + "/.GDInstall/gdevelop5.AppImage";
            var newPath = document.getElementById('dirIndication').innerHTML + "/gdevelop5.AppImage";

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!');
                console.log("Launching GDevelop (" + executable + ")");
                //asking for permission to chmod the executable
                child.exec('chmod +x ' + executable, (error, stdout, stderr) => {
                    //aucune erreur donnée ici
                });
                child.exec(executable, (error, stdout, stderr) => {
                    step = 3;
                    if (error) {
                        throw error;
                    }
                    console.log(stdout);
                });
            })



        }

    }
    );
    //doing the gauge of download
    downloadItem.on('updated', function (event, state) {
        if (state === 'progressing') {
            var installation = document.getElementById('downloading...');
            let percentage = downloadItem.getReceivedBytes() / downloadItem.getTotalBytes();
            percent = percentage * 100;
            percent = parseFloat(percent.toFixed(2));
            document.getElementById('steps').value = percent;
            // console.log(downloadItem);
        }
        //on error when downloading
        if (state === "interrupted") {
            const DwnldCantGet = new Notification('GDinstaller : Download informations', {
                body: 'GDInstaller is unable to get files from the server... check your connexion'
            })
        }
    });


});