# GDInstaller
# About :
GDinstaller is an optional installer of GDevelop 5 for linux.
This software is under GPL-v3.0-or-later. Made by Oxey405.
## Builds
[![Build Status](https://travis-ci.com/Oxey405/GDInstaller.svg?branch=master)](https://travis-ci.com/Oxey405/GDInstaller)
## Project architecture
There is not really any architecture but here is a tour of all the important files.

check.js -> File that handle checkboxes and installation settings.

installGD.js -> File that handle the installation by itself.

installDir.js -> file to handle installation directory of GDevelop.

index.html -> (I really need to explain how electon works ?)

index.js -> main script. Handle electronJS.

gd5-intro.wav -> sound on programm startup

gd-logo.png -> logo of GDevelop (with text)

gd-logo-notxt.png -> logo of GDevelop (without text)

style.css -> the style of the app.

# How to contribute
You want to contribute ? Follow these steps :
(be sure you know git and electron.js before contributing. also linux is recommanded for devs but not mandatory)
(be sure that you have some code editor like Visual Studio code and npm + nodejs installed with Prettier for vs code)
### Step 01 :
create a fork of this repo.
### Step 02
open a terminal, choose a folder to code and type `git pull https://github.com/Oxey405/GDInstaller.git`
or download the zip and unzip the code !
### Step 03
Modify the code that you want to change
### Step 04
add a new remote named fork with `git remote add fork [URL_OF_YOUR_FORK_REPO]`
### Step 05
create a new branch on your fork with `git switch fork` and `git branch [NAME_OF_BRANCH]`
### Step 06
add all the changed files to the head of your git by doing `git add .`
### Step 07
commit your changes with `git commit -m "USEFULL_COMMENT_OF_WHAT_YOU_DID"`
### Step 08
Push your changes to your fork with `git push fork [NAME_OF_BRANCH]`
### Step 09
Go to your github fork webpage and change to the branch you created
### Step 10
Click on "Pull request"
### Step 11
Wait for us to look if your changes doesn't break anything
### Step 12
If we found errors, we told you and you fix it and restart the process
If no we merge your branch in the master branch and you have succesfully contributed to GDInstaller.
