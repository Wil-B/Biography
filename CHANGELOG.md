# v1.3.0
### Release highlights
Wikipedia + lyrics + flags
### Added
- Wikipedia (multi-language)
- Lyrics (synced & unsynced) :: view lyrics in more interesting ways (textreader & lyrics tab)
- Textreader
- Improved support for track reviews
- Classical music extension (title format tab)
- Flags option (artist country: headings tab)
- Auto-managed cache with configurable storage time: (requires use of default cache: download tab)
- Configurable partial match level (miscellaneous tab)
- Choice of summary items (display tab)
- More colour highlight choices, e.g. summary on & heading + heading line off works well (display tab)
- Per panel server settings option (advanced tab)
- Assets\licences for other software used by biography

### Changed
- Improvements to tagger (tagger tab + see release notes below)
- Settings are now stored in package_data folder
    - Biography.cfg should be copied automatically (original is retained for back-compatibility with v1.2.0, else it can be deleted)
    - Language & language fallback settings will be reset, as a consequence of adding multi-language support for Wikipedia (download tab)
- Removed the ability to auto-update from old versions (v1.1.3 or earlier)

### Fix
- Wine stabilisation: biography should no longer give errors in Wine, but some limitations remain:
    - Paste from clipboard may not work. It's rarely used. The only use is to create custom biographies & album reviews that can be created in a text editor anyway (include 'Custom Biography' or 'Custom Review', respectively, at end to stop overwriting)
    - Recycler may not work. It's rarely used. If used, the console gives an alternative
    - Options dialog may not load: menu now indicates there was a problem & console explains what can be done instead

### Release notes
#### Tagger
###### Last.fm
- a whitelist is now used to filter out non-genres that can be present
- statistics are now written as a multivalue tag: playcount (scrobbles), listeners & a combined score (1-100). Scores rank the long-term popularity of artists and albums on a 1-100 scale using accumulated last.fm playcount (scrobbles) and listeners

```View by score: possible view for library tree: $nodisplay{$sub(9999,$meta(Artist Statistics Last.fm,5[score]))}[$meta(Artist Statistics Last.fm,5[score]) - ]%artist%|$nodisplay{$sub(9999,$meta(Album Statistics Last.fm,5[score]))}[$meta(Album Statistics Last.fm,5[score]) - ]$if2(%album%,εXtra)|[[%discnumber%.]%tracknumber%. ][%track artist% - ]%title%```

- Additionally, Find & Play can write track statistics to tag, where that data is more relevant. See the Find & Play [changelog](https://github.com/Wil-B/Find-and-Play/blob/main/CHANGELOG.md#track-popularity-tagger) for an example of a fully comprehensive popularity view

###### Wikipedia
- added option to tag genres

#### Text
Handling has been reworked to accommodate new sources. Use 'lock to selected source' (menu > sources > text) if you don't want auto-fallback. If both album & track reviews are displayed, there is now an auto-optimise album+track option (display tab). It avoids duplicating genres, moods & themes and shortens long wikipedia album reviews to improve navigation.

#### Wikipedia
- the following tags are supported: musicbrainz_XXXXid and MusicBrainz XXXX Id; where XXXX is artist, releasegroup (release group for latter) or work


#### Auto-optimise album+track (display tab)
This applies when both album & track reviews are displayed. It avoids duplicating genres, and where present, moods & themes. It also shortens long wikipedia album reviews to improve navigation.

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
