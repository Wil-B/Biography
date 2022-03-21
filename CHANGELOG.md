# v1.3.0
### Release highlights
Wikipedia + lyrics + flags
### Added
- Wikipedia (multi-language)
- Lyrics :: view lyrics in more interesting ways (textreader & lyrics tab)
	<!-- - Lyrics (synced & unsynced) :: view lyrics in more interesting ways (textreader & lyrics tab) -->
	<!-- - view lyrics in more interesting ways (textreader & lyrics tab) -->
	<!-- - highlight transition and fade effects -->
	<!-- - supports lyrics offset + on-the-fly adjustment (mouse wheel - not saved) -->
	<!-- - ultra-smooth scrolling with highlight transition effect, fade effect and offset support -->
	<!-- - ultra-smooth scrolling + highlight transition effect + fade effect + offset handling -->
- Textreader
- Improved support for track reviews
- Classical music extension (title format tab)
- Flags option (artist country: headings tab)
- More colour highlight choices, _e.g. summary on with heading and heading line off works well_ (display tab)
- Auto-managed cache with configurable storage time: (requires use of default cache: download tab)
- Configurable partial match level (miscellaneous tab)<!-- 
Choice of summary items (display tab) -->
- Per panel server settings option (advanced tab)
- Assets\licences for other software used by biography

### Changed
- Summary
	- new items
	- choice of items displayed
	- choose from genre, dates, locale, popular/latest, other [mood, members, composers, last.fm listeners, lengths] - depending on source (display tab)
	<!-- - custom colour option (custom tab). Heading (normally highlight colour), text & summary colours can now all be independently set -->
	<!--- font style now configurable (display tab) -->
- Custom colours and font styles
	- heading (normally highlight colour), summary & text can now all be independently set (custom, display & headings tabs)
- Improvements to tagger (tagger tab + see release notes below)
- Reinstated the image seeker bar & improved the image seeker positioning with certain layout styles
- Settings are now stored in package_data folder
    - Biography.cfg should be copied automatically (original is retained for back-compatibility with v1.2.0, else it can be deleted)
    - Language & language fallback settings will be reset, as a consequence of adding multi-language support for Wikipedia (download tab)
- Removed the ability to auto-update from old versions (v1.1.3 or earlier)

### Fix
- Wine stabilisation: biography should no longer give errors in Wine, but some limitations remain:
    - Paste from clipboard may not work. It's rarely used. The only use is to create custom biographies & album reviews that can be created in a text editor anyway (include 'Custom Biography' or 'Custom Review', respectively, at end to stop overwriting)
    - Recycler may not work. It's rarely used. If used, the console gives an alternative
    - Options dialog may not load: menu now indicates there was a problem & console explains what can be done instead
- Blocked unnecessary on_size calls from Panel Stack Splitter with certain of its layout methods

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
<!-- - Searches are integrated with MusicBrainz
- MusicBrainz provides all the biography links
- MusicBrainz is tried first for review links, but isn't comprehensive, and there is a fallback to a direct search of Wikipedia
- Genres can be in native language or limited to English (latter fallback to MusicBrainz)
- Optionally musicbrainz_XXXXid and MusicBrainz XXXX Id tags are supported where XXXX is artist, releasegroup (release group for latter) or work -->
- Searches optionally support musicbrainz_XXXXid and MusicBrainz XXXX Id tags. XXXX can be artist, releasegroup (release group for latter) or work
- Generally such tags shouldn't be needed. They may be useful if names differ to site names, e.g. classical works (compositions) can be variously named
<!-- - Rarely will such tags offer any benefit. Best use case may be where there are naming differences, e.g. classical works (compositions) have various naming methods
searches support the following tags: musicbrainz_XXXXid and MusicBrainz XXXX Id; where XXXX is artist, releasegroup (release group for latter) or work -->

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
