# v1.4.1
### Hotfix for v1.4.0
### Fixed
- include issue with advanced radio stream parser
- pth handling issue

<br />

# v1.4.0

### Added
- summary
	- option to disable compact style for the summary
	- allows showing all genres, moods, members & composers in summary rather than limiting each to one line
	- menu > display or click summary to toggle
- nowplaying display
	- image effects
	- user configurable (options > textreader & lyrics tab)
	- use in it's own right or as a fallback
- layout
 	- full overlay preset (menu > layout)
 	- shows text over an album art background
	- configurable. Press CTRL or options > behaviour tab > overlay where there is also an example of usage
- advanced radio stream parser
 	- designed for use with streams that contain the artist name and song title in a non-standard format
 	- user configurable (open in a text editor)
 	- location: ...foo_spider_monkey_panel\package_data\{BA9557CE-7B4B-4E0E-9373-99F511E81252}
 	- won't be overwritten if biography is updated
- language support for menu
	- simplified Chinese
	- traditional Chinese
	- enable: panel properties > 'Language [Menu]...'
- lyrics
	- drop shadow effect (options > textreader & lyrics tab)
	- larger sync line options (options > textreader & lyrics tab)
- customisable playlist interaction for follow selected item
	- default settings should be fine for most users. If required:
		- load delay can now be increased if moving through playlist is laggy (options > advanced tab) [regorxxx]
		- leading item can now be set to use the delay or load immediately (options > advanced tab)

### Changed
- improve support for other scripts wishing to use biography virtual tags
- scripts can now use ```window.NotifyOthers('bio_syncTags', focus)``` when the current track changes. Focus is either false (prefer nowplaying) or true (follow selected track)
	- overrides biography tag settings so that:
		- biography always notifies the tags
		- that the notified tags include a core set of tags
		- that the notified tags include the correct selection mode
- the notification also now has the artist and album name

### Fixed
- rare on_size error
- occasional ActiveX Object error triggered by a site change
- title format regression introduced in 1.3.4 with certain special characters
- workaround for apparent folder locking stopping some film strip images loading during downloading

<br />

# v1.3.6

### Added
- Refresh rate for panel (to delay repaint after successive track focus changes) at properties. Higher values for 'Panel Selection Refresh Rate' may be set to avoid lag while scrolling the library.

<br />

# v1.3.5

### Added
- Shortcut to open image: Alt+Click
- Item properties: file creation date (requires foobar2000 v2)

If updating from **v1.3.4** and you want to display the file creation date in item properties, delete item_properties.json & item_properties_alternative_grouping.json from biography package data: ...package_data\\{BA9557CE-7B4B-4E0E-9373-99F511E81252}, then reload biography

### Fixed
- Issue with setTextType
<br />


# v1.3.4
### Added
- Item properties. See screenshots at end of [README](https://github.com/Wil-B/Biography/blob/main/README.md#item-properties)
- %storage_folder%
	- returns the Spider Monkey Panel package_data\storage folder for biography. See release notes below for more info

### Changed
- Tagger
    - last.fm genre whitelist is now updated automatically
    - usage of last.fm genre whitelist is now optional (tagger tab)

### Fixed
- Occasional issues with the options dialog not opening due to the feature checker wrongly reporting Spider Monkey Panel Show HTML Dialog as unsupported. In such cases there is now a confirm to guard against false negatives. Additionally, there is a manual setting in the first panel property
- v1.3.2 regression: image cache issue

### Release notes
- %storage_folder%
	- returns the Spider Monkey Panel package_data\storage folder for biography, e.g.
		- C:\\...\foobar2000\foo_spider_monkey_panel\package_data\{BA9557CE-7B4B-4E0E-9373-99F511E81252} [standard install]
		- Z:\foobar2000\profile\foo_spider_monkey_panel\package_data\{BA9557CE-7B4B-4E0E-9373-99F511E81252} [portable install]
	- alternative to %profile% which returns the foobar2000 profile folder, e.g.
		- C:\\...\foobar2000 [standard install]
		- Z:\foobar2000\profile [portable install]
	- %storage_folder%, like %profile%, is for use as the first item of a path. See the textreader & lyrics tab for an example
<br />

# v1.3.3
### Changed
- Improved image seeker behaviour when enlarge image on hover is enabled

### Fixed
- Display of allmusic rating now respects the show album rating setting
- Last.fm biography: issue when certain web content isn't found

<br />

# v1.3.2
### Changed
- Improved load sub-menu
    - now distinguishes between biographies & reviews
    - simplified for users not requiring track reviews, as the review type options aren't shown by default
    - to show those options, enable menu > sources > text > show track review options...

### Fixed
- Regression: review album art fallback image not loading (issue introduced in v1.3.1)
- Regression: set language not working (issue introduced in v1.3.1)
- Track review availability check not working in some languages
- Rare filmstrip draw issues

<br />

# v1.3.1
### Added
- Wildcard support to textreader & lyric source patterns (filename & extension)
- Amalgamate sources option for biographies and reviews (menu > sources > text)
	- lyrics can be included as plain text
	- to improve navigation & display, "auto-optimise if multiple items shown", is enabled by default (display tab)
		- shortens long Wikipedia items
		- removes duplicated types like genres & moods if album + track are both shown
- Alternative load folder for artist photos (set in photo tab [or in biography.cfg: foCycPhoto])
- Tooltip to show clipped heading text
- Tagger: option to disable confirmation popup (tagger tab)
- Checks to test if ShowHtmlDialog is supported, with fallback to an alternative where possible (thx to regor)
- Per panel stub images (panel properties: "Stub..."). Only needed if stubs set in fb2k preferences > display aren't sufficient
- Menu configure that opens Spider Monkey Panel configuration (right click + shift)

### Changed
- Source switching:
	- reworked so more informative: context menu now shows names, with unavailable grayed, rather than next / previous
	- heading still allows quick change with a single click and offers simple cycling through sources
- Made lyric scrolling smoother, especially when overlayed over large images
- Look-up button is now available with text reader

### Fixed
- Bug in per panel server creation
- Flags draw issue
- Issues with Wikipedia
- Resize when filmStrip overlays image area
- utils.ReadTextFile error on locked items
- Text reader properties: missing default values + changed to better names:
	- <b>this fix will reset most textreader & lyrics settings to default</b>
	- <b>export panel properties, before updating, if you need a record</b>
- Miscellaneous fixes

<br />

# v1.3.0
### Release highlights
Wikipedia + lyrics + flags
### Added
- New sources
	- Wikipedia (multi-language)
	- Lyrics :: view lyrics in more interesting ways (textreader & lyrics tab)
	- Textreader
	- More track review sites
	- Classical music extension (title format tab)†
- Country flags option (headings tab)
- More colour highlight choices, _e.g. summary on with heading and line off works well_ (display tab)
- More custom colours and font styles
- More summary items with choice of genre, dates, locale, popular/latest, other [mood, members, composers, last.fm listeners, lengths] - depending on source (display tab)
- New random colour dark theme (display tab)
- Auto-managed cache with configurable storage time†: (requires use of default cache: download tab)
- Configurable partial match level (miscellaneous tab)
- Per panel server settings option (advanced tab)†
- Assets\licences for other software used by biography

###### † new beta feature

### Changed
- Filmstrip can now overlay the image area (enable: menu\layout\filmstrip): might work best with image auto-fill depending on the layout
- Tagger: various improvements (tagger tab + see release notes below)
- Image seeker
	- reinstated bar method
	- improved positioning with certain layout styles
- Settings
	- now stored in package_data folder
	- biography.cfg should be copied automatically (original is retained for back-compatibility with v1.2.0, else it can be deleted)
	- language & language fallback settings will be reset, as a consequence of adding multi-language support for Wikipedia (download tab)
	- removed the ability to auto-update from old versions (v1.1.3 or earlier)

### Fix
- Wine stabilisation: biography should no longer give errors in Wine, but some limitations remain:
    - paste from clipboard may not work. It can be fixed by installing [this version of Spider Monkey Panel (v1.6.2-dev+7c0928bf)](https://github.com/Wil-B/Find-and-Play/files/8575143/foo_spider_monkey_panel.zip) which includes marc2k3's utils.GetClipboardText/utils.SetClipboardText (thx to marc2k3)
    - recycler may not work. It's rarely used. If used, the console gives an alternative
    - options dialog may not load: menu now indicates there was a problem & console explains what can be done instead
- Blocked unnecessary on_size calls from Panel Stack Splitter with certain of its layout methods
- Miscellaneous fixes

### Release notes
#### Tagger
###### Last.fm
- a whitelist is now used to filter out non-genres that can be present
- statistics are now written as a multivalue tag: playcount (scrobbles), listeners & a combined score (1-100). Scores rank the long-term popularity of artists and albums on a 1-100 scale using accumulated last.fm playcount (scrobbles) and listeners

```View by score: possible view for library tree: $nodisplay{$sub(9999,$meta(Artist Statistics Last.fm,5[score]))}[$meta(Artist Statistics Last.fm,5[score]) - ]%artist%|$nodisplay{$sub(9999,$meta(Album Statistics Last.fm,5[score]))}[$meta(Album Statistics Last.fm,5[score]) - ]$if2(%album%,εXtra)|[[%discnumber%.]%tracknumber%. ][%track artist% - ]%title%```

- Additionally, Find & Play can write track statistics to tag, where that data is more relevant. See the Find & Play [changelog](https://github.com/Wil-B/Find-and-Play/blob/main/CHANGELOG.md#track-popularity-tagger) for an example of a fully comprehensive popularity view

###### Wikipedia
- added option to tag genres

#### Wikipedia biographies and reviews
- Searches optionally support musicbrainz_XXXXid and MusicBrainz XXXX Id tags
- XXXX can be artist, releasegroup (release group for latter) or work
- Generally such tags shouldn't be needed. They may be useful if names differ to site names, e.g. classical works (compositions) can be variously named

<br />

# v1.2.0
### Added
- New options dialog
- Filmstrip
	- Supports circular as well as normal images
	- Click filmstrip to load main image
	- Middle click filmstrip to ensure main image visible in filmstrip
	- Enable/disable: menu > display
- Image size filter
	- Configurable
	- Can be used to exclude large images or small images or those below a certain pixel size
	- Enable/configure: options > image
- Ability to expand lists
	- Enable/disable: options > display
- Extra tagger options
	- Notify tags of current track to other Spider Monkey Panels
	- Add ability to write `last.fm listeners` (artist & album)

### Other enhancements and fixes
- Blend theme: optimised default
- Cover cycler: now fully supports embedded images
- Cover cycler: can select on menu which cover sources to cycle
- Look up button can now either be top left or in heading
- Photo download: improved accessibility to settings (options > photo)
- Refactored code
- Save: reviews and biographies can now all be saved in the same folder
- Sleep time: optimised time between consecutive internet calls
- Smooth scroll: enhanced smoothness when using scrollbar
- Tagger: fixed rare handling issue with certain exotic characters
- UNC paths: sorted handling
