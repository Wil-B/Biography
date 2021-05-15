# Biography

[![CodeFactor](https://www.codefactor.io/repository/github/wil-b/smp-scripts/badge?s=e31aef34da666a7f881d60c035843654ee451e7d)](https://www.codefactor.io/repository/github/wil-b/smp-scripts)

 Feature rich biography plug-in for foobar2000
 
 <img src="https://user-images.githubusercontent.com/35600752/118341123-deb0c700-b515-11eb-9496-4b4cc728c659.png" width=66%>

### FEATURES
- downloads and displays artist photos, biographies and reviews from last.fm and allmusic
- main artist, similar artists, contributing artists, performers and composers etc
- main album and top albums
- history
- layout presets: top, left, right, bottom and overlay. Fully customisable with freestyle layouts
- themes: user interface, dark, blend and light
- custom colours and fonts
- filmstrip: top, left, right, bottom or hidden
- image+text, image only or text only
- drag resizing of image and filmstrip (press Ctrl while panel has focus)
- custom title format for field remapping and save locations
- and more...

### REQUIREMENTS:
- [foobar2000](https://www.foobar2000.org)
- [Spider Monkey Panel 1.4.1+](https://www.foobar2000.org/components)
- IE9 or later
- [FontAwesome](https://github.com/FortAwesome/Font-Awesome/blob/fa-4/fonts/fontawesome-webfont.ttf?raw=true)

IMPORTANT: If updating from v1.1.3, and you wish to retain panel settings, export panel properties before installing the new version. Import them after installation. The new version no longer uses biography.ini. It's left in place for back compatibility with v1.1.3, otherwise it can be deleted. Settings therein are automatically imported into the new version.

### INSTALLATION
This version has to be installed as package.
1) Add a spider monkey panel to foobar2000.
1) Right click the spider monkey panel while pressing the windows key + shift. Choose configure panel.
2) On the script tab choose package.
3) Click the import button and import the library tree package.

##### Troubleshooting
Please note that the package manager is a new feature of spider monkey panel. If you experience issues with the spider monkey panel installer follow the guide below.

<i>Portable foobar2000 installs</i>
1) Create a new package first. Call it, e.g. test, & delete it afterwards. This should create a missing folder which then allows Biography to be installed.
2) Try using the development build of spider monkey panel which has the required bug fix.

<i>Standard foobar2000 installs</i>

You'll need to install the package manually or wait for fixed spider monkey panel release. For completeness the below covers portable installs as well.
To do a manual install, create the following path in YOUR_FOOBAR_PROFILE_PATH: foo_spider_monkey_panel\packages\\{BA9557CE-7B4B-4E0E-9373-99F511E81252}.
You need to end up with the following master folder:
- For standard installations of any version of foobar2000: .\foobar2000\foo_spider_monkey_panel\packages\\{BA9557CE-7B4B-4E0E-9373-99F511E81252}
- For portable installations of foobar2000 v1.6 or later: .\foobar2000\profile\foo_spider_monkey_panel\packages\\{BA9557CE-7B4B-4E0E-9373-99F511E81252}
- For portable installations of foobar2000 1.5 or earlier: .\foobar2000\foo_spider_monkey_panel\packages\\{BA9557CE-7B4B-4E0E-9373-99F511E81252}

Extract the Biography.zip. Copy the content, ie. the assets folder, the scripts folder and the two files, main.js and package.json, into the above folder.

