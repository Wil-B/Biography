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
	- Notify tags of current track to other Spider Monkey Panels.
	- Add ability to write `last.fm listeners` (artist & album).
	- View by listeners: example patterns for library viewers:

Library tree:

```$nodisplay{$sub(999999999,$replace([%Artist Listeners Last.fm%],',',,.,, ,)) - %artist%}[%Artist Listeners Last.fm% - ]%artist%|%album%|[[%discnumber%.]%tracknumber%. ][%track artist% - ]%title%```

Album list:

```[$replace(%Artist Listeners Last.fm%,',',,.,, ,) - ] %artist%|%album%|[[%discnumber%.]%tracknumber%. ][%track artist% - ]%title%```

### Other enhancements and fixes
- Blend theme: optimised default
- Cover cycler: now fully supports embedded images
- Cover cycler: can select on menu which cover sources to cycle
- Look up button can now either be top left or in heading
- Photo download: improved accessibility to settings (options > photo)
- Save: reviews and biographies can now all be saved in the same folder
- Sleep time: optimised time between consecutive internet calls in response to focus and metadb changes (aims to stop freezes reported by one user)
- Smooth scroll: enhanced smoothness when using scrollbar
- Tagger: fixed rare handling issue with certain exotic characters
- UNC paths: sorted handling
