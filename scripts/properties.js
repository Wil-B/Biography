﻿'use strict';

class PanelProperty {
	constructor(name, default_value) {
		this.name = name;
		this.default_value = default_value;
		this.value = ppt.get(this.name, default_value);
	}

	// Methods

	get() {
		return this.value;
	}
	set(new_value) {
		if (this.value !== new_value) {
			ppt.set(this.name, new_value);
			this.value = new_value;
		}
	}
}

class PanelProperties {
	constructor() { // this.name_list = {}; debug
	}

	// Methods

	init(type, properties, thisArg) {
		switch (type) {
			case 'auto':
				properties.forEach(v => { // this.validate(v); debug
					this.add(v);
				});
				break;
			case 'manual':
				properties.forEach(v => thisArg[v[2]] = this.get(v[0], v[1]));
				break;
		}
	}

	validate(item) {

		if (!$.isArray(item) || item.length !== 3 || typeof item[2] !== 'string') {
			throw ('invalid property: requires array: [string, any, string]');
		}

		if (item[2] === 'add') {
			throw ('property_id: ' + item[2] + '\nThis id is reserved');
		}

		if (this[item[2]] != null || this[item[2] + '_internal'] != null) {
			throw ('property_id: ' + item[2] + '\nThis id is already occupied');
		}

		if (this.name_list[item[0]] != null) {
			throw ('property_name: ' + item[0] + '\nThis name is already occupied');
		}
	}

	add(item) {
		// this.name_list[item[0]] = 1; debug
		this[item[2] + '_internal'] = new PanelProperty(item[0], item[1]);

		Object.defineProperty(this, item[2], {
			get() {
				return this[item[2] + '_internal'].get();
			},
			set(new_value) {
				this[item[2] + '_internal'].set(new_value);
			}
		});
	}

	get(name, default_value) {
		return window.GetProperty(name, default_value);
	} // initialisation

	set(name, new_value) {
		return window.SetProperty(name, new_value);
	}

	toggle(name) {
		this[name] = !this[name];
	}
}

let properties = [
	['Album History', JSON.stringify([]), 'albumHistory'],
	['Artist History', JSON.stringify([]), 'artistHistory'],
	['Artist View', false, 'artistView'],

	['Bio & Rev Same Style', true, 'sameStyle'],
	['Button LookUp', 2, 'lookUp'],

	['Classical Music Mode', false, 'classicalMusicMode'],
	['Classical Music Mode Album Fallback', false, 'classicalAlbFallback'],
	['Colour Swap', false, 'swapCol'],

	['Cover Border [Dual Mode]', false, 'covBorderDual'],
	['Cover Border [Image Only]', false, 'covBorderImgOnly'],
	['Cover Load All', false, 'loadCovAllFb'],
	['Cover Selection', JSON.stringify([0, 1, 2, 3, 4]), 'loadCovSelFb'],
	['Cover Load Folder', false, 'loadCovFolder'],
	['Cover Reflection [Dual Mode]', false, 'covReflDual'],
	['Cover Reflection [Image Only]', false, 'covReflImgOnly'],
	['Cover Shadow [Dual Mode]', false, 'covShadowDual'],
	['Cover Shadow [Image Only]', false, 'covShadowImgOnly'],
	['Cover Style [Dual Mode] Regular-0 Auto-Fill-1 Circular-2', 0, 'covStyleDual'],
	['Cover Style [Image Only] Regular-0 Auto-Fill-1 Circular-2', 0, 'covStyleImgOnly'],
	['Cover Type', 0, 'covType'],

	['Custom Colour Background', '4,39,68', 'bg'],
	['Custom Colour Film Active Item Frame', '29, 62, 99, 208', 'frame'],
	['Custom Colour Heading Button', '121,194,255', 'headingBtn'],
	['Custom Colour Heading Text', '121,194,255', 'headingText'],
	['Custom Colour Line', '12,21,31', 'line'],
	['Custom Colour Overlay Fill', 'rgb(64-0-0)', 'rectOv'],
	['Custom Colour Overlay Border', '0,255,255', 'rectOvBor'],
	['Custom Colour Rating Stars', '255,190,0', 'stars'],
	['Custom Colour Summary', '128,228,0', 'summary'],
	['Custom Colour Text', '171,171,190', 'text'],
	['Custom Colour Text Highlight', '121,194,255', 'text_h'],
	['Custom Colour Transparent Fill', '0,0,0,0.06', 'bgTrans'],

	['Custom Colour Background Use', false, 'bgUse'],
	['Custom Colour Film Active Item Frame Use', false, 'frameUse'],
	['Custom Colour Heading Button Use', false, 'headingBtnUse'],
	['Custom Colour Heading Text Use', false, 'headingTextUse'],
	['Custom Colour Line Use', false, 'lineUse'],
	['Custom Colour Overlay Fill Use', false, 'rectOvUse'],
	['Custom Colour Overlay Border Use', false, 'rectOvBorUse'],
	['Custom Colour Rating Stars Use', false, 'starsUse'],
	['Custom Colour Summary Use', false, 'summaryUse'],
	['Custom Colour Text Use', false, 'textUse'],
	['Custom Colour Text Highlight Use', false, 'text_hUse'],
	['Custom Colour Transparent Fill Use', false, 'bgTransUse'],

	['Custom Font', 'Segoe UI,16,0', 'custFont'],
	['Custom Font Heading', 'Segoe UI,18,2', 'custHeadFont'],

	['Custom Font Use', false, 'custFontUse'],
	['Custom Font Heading Use', false, 'custHeadFontUse'],

	['Custom Font Scroll Icon', 'Segoe UI Symbol', 'butCustIconFont'],
	['Cycle Item', false, 'cycItem'],
	['Cycle Photo', true, 'cycPhoto'],
	['Cycle Picture', true, 'cycPic'],
	['Cycle Time Item', 45, 'cycTimeItem'],
	['Cycle Time Picture', 15, 'cycTimePic'],

	['Double-Click Toggle', false, 'dblClickToggle'],
	['Expand Lists', true, 'expandLists'],
	['Fallback Text Biography: Heading|No Heading', 'Nothing Found|There is no biography to display', 'bioFallbackText'],
	['Fallback Text Review: Heading|No Heading', 'Nothing Found|There is no review to display', 'revFallbackText'],

	['Filmstrip Autofit', true, 'filmStripAutofit'],
	['Filmstrip Cover Regular-0 Auto-Fill-1 Circular-2', 1, 'filmCoverStyle'],
	['Filmstrip Margin', 0, 'filmStripMargin'],
	['Filmstrip Overlay Image', false, 'filmStripOverlay'],
	['Filmstrip Photo Regular-0 Auto-Fill-1 Circular-2', 2, 'filmPhotoStyle'],
	['Filmstrip Pos', 3, 'filmStripPos'],
	['Filmstrip Size 0-1', 0.15, 'filmStripSize'],
	['Filmstrip Show', true, 'showFilmStrip'],
	['Filmstrip Show Auto', true, 'autoFilm'],
	['Filmstrip Use Image Padding', 0, 'filmImagePadding'],
	['Filmstrip Use Text Padding', 0, 'filmTextPadding'],

	['Font Size', 16, 'baseFontSize'],
	['Freestyle Custom', JSON.stringify([]), 'styleFree'],

	['Heading Hide-0 Show-1', 1, 'heading'],
	['Heading Always Full Width', false, 'fullWidthHeading'],
	['Heading BtnName Biography [AllMusic]', 'allmusic', 'amBioBtn'],
	['Heading BtnName Biography [Last.fm]', 'last.fm', 'lfmBioBtn'],
	['Heading BtnName Biography [Wikipedia]', 'wikipedia', 'wikiBioBtn'],
	['Heading BtnName Review [AllMusic]', 'allmusic', 'amRevBtn'],
	['Heading BtnName Review [Last.fm]', 'last.fm', 'lfmRevBtn'],
	['Heading BtnName Review [Wikipedia]', 'wikipedia', 'wikiRevBtn'],
	['Heading Button Hide-0 Left-1 Right-2', 2, 'src'],
	['Heading Center', false, 'hdCenter'],
	['Heading Button Position Left-0 Right-1 Center-2', 0, 'hdPos'],
	['Heading Button Show', true, 'hdBtnShow'],
	['Heading Button Show Label', 1, 'hdShowBtnLabel'],
	['Heading Flag Artist View', true, 'bioFlagShow'],
	['Heading Flag Album View', false, 'revFlagShow'],
	['Heading Line Hide-0 Bottom-1 Center-2', 1, 'hdLine'],
	['Heading Padding Button', 0, 'hdBtnPad'],
	['Heading Padding Bottom Line', 0, 'hdLinePad'],
	['Heading Padding', 0, 'hdPad'],
	['Heading Position', 0, 'hdRight'],
	['Heading Show Button Background', true, 'hdShowBtnBg'],
	['Heading Show Button Red Lfm', false, 'hdShowRedLfm'],
	['Heading Show Title', true, 'hdShowTitle'],
	['Heading Style', 2, 'headFontStyle'],
	['Heading Title Format Album Review', '$if2(%BIO_ALBUMARTIST%,Artist Unknown) - $if2(%BIO_ALBUM%,Album Unknown)', 'revHeading'],
	['Heading Title Format Biography', '$if2(%BIO_ARTIST%,Artist Unknown)', 'bioHeading'],
	['Heading Title Format Track Review', '> $if2(%BIO_ARTIST%,Artist Unknown) - $if2(%BIO_TITLE%,Title Unknown)', 'trkHeading'],
	['Heading Title Format Lyrics', '$if2(%BIO_ARTIST%,Artist Unknown) - $if2(%BIO_TITLE%,Title Unknown)', 'lyricHeading'],

	['Highlight Heading Button', false, 'highlightHdBtn'],
	['Highlight Heading Text', true, 'highlightHdText'],
	['Highlight Heading Line', true, 'highlightHdLine'],
	['Highlight Image Border', false, 'highlightImgBor'],
	['Highlight Overlay Border', true, 'highlightOvBor'],
	['Highlight Rating Stars', true, 'highlightStars'],
	['Highlight Subheadings', true, 'highlightSubHd'],
	['Highlight Summary Text', false, 'highlightSummary'],
	['Highlight Text', false, 'highlightText'],

	['Image Align Auto', true, 'alignAuto'],
	['Image Align With Text', false, 'textAlign'],
	['Image Alignment Horizontal', 1, 'alignH'],
	['Image Alignment Vertical', 1, 'alignV'],
	['Image Auto Enlarge', false, 'autoEnlarge'],
	['Image Blur Background Auto-Fill', false, 'blurAutofill'],
	['Image Blur Background Level (%)', 90, 'blurTemp'],
	['Image Blur Background Opacity (%)', 30, 'blurAlpha'],
	['Image Blur Background Always Use Front Cover', false, 'covBlur'],
	['Image Counter', false, 'imgCounter'],
	['Image Filter Lastfm', false, 'imgFilterLfm'],
	['Image Filter Size Max Size', 12000, 'imgFilterMaxSz'],
	['Image Filter Size Max Size Enabled', false, 'imgFilterMaxSzEnabled'],
	['Image Filter Size Min Number', 3, 'imgFilterMinNo'],
	['Image Filter Size Min Px', 500, 'imgFilterMinPx'],
	['Image Filter Size Min Px Enabled', false, 'imgFilterMinPxEnabled'],
	['Image Filter Size Min Size', 50, 'imgFilterMinSz'],
	['Image Filter Size Min Size Enabled', false, 'imgFilterMinSzEnabled'],
	['Image Filter Size Width & Height', true, 'imgFilterBothPx'],
	['Image Only', false, 'img_only'],
	['Image Reflection Type', 0, 'imgReflType'],
	['Image Seeker', true, 'imgSeeker'],
	['Image Seeker Show', 0, 'imgSeekerShow'],
	['Image Seeker Disabled', false, 'imgSeekerDisabled'],
	['Image Seeker Dot Style', 1, 'imgSeekerDots'],
	['Image Smooth Transition', false, 'imgSmoothTrans'],
	['Image Smooth Transition Level (%)', 92, 'transLevel'],

	['Layout', 0, 'style'],
	['Layout Bio Mode', 0, 'bioMode'],
	['Layout Bio', 0, 'bioStyle'],
	['Layout Image Size 0-1', 0.65, 'rel_imgs'],
	['Layout Margin Between Image & Text', 20, 'gap'],
	['Layout Margin Image Left', 20, 'borL'],
	['Layout Margin Image Right', 20, 'borR'],
	['Layout Margin Image Top', 0, 'borT'],
	['Layout Margin Image Bottom', 0, 'borB'],
	['Layout Margin Text Left', 20, 'textL'],
	['Layout Margin Text Right', 20, 'textR'],
	['Layout Margin Text Top', 20, 'textT'],
	['Layout Margin Text Bottom', 20, 'textB'],
	['Layout Padding Between Thumbnails', 0, 'thumbNailGap'],
	['Layout Rev Mode', 0, 'revMode'],
	['Layout Rev', 0, 'revStyle'],

	['Line Padding', 0, 'textPad'],
	['Lock Bio', false, 'lockBio'],
	['Lock Rev', false, 'lockRev'],
	['Lock Auto', false, 'autoLock'],

	['Menu Show Inactivate', 0, 'menuShowInactivate'],
	['Menu Show Paste', 1, 'menuShowPaste'],
	['Menu Show Playlists', 0, 'menuShowPlaylists'],
	['Menu Show Missing Data', 0, 'menuShowMissingData'],
	['Menu Show Tagger', 1, 'menuShowTagger'],
	['Multi Server', false, 'multiServer'],

	['Overlay', JSON.stringify({
		'name': 'Overlay',
		'imL': 0,
		'imR': 0,
		'imT': 0,
		'imB': 0,
		'txL': 0,
		'txR': 0,
		'txT': 0.632,
		'txB': 0
	}), 'styleOverlay'],
	['Overlay Border Width (px)', 1, 'overlayBorderWidth'],
	['Overlay Gradient (%)', 10, 'overlayGradient'],
	['Overlay Strength (%)', 84.5, 'overlayStrength'],
	['Overlay Type', 0, 'typeOverlay'],
	['Panel Active', true, 'panelActive'],

	['Photo Border [Dual Mode]', false, 'artBorderDual'],
	['Photo Border [Image Only]', false, 'artBorderImgOnly'],
	['Photo Reflection [Dual Mode]', false, 'artReflDual'],
	['Photo Reflection [Image Only]', false, 'artReflImgOnly'],
	['Photo Shadow [Dual Mode]', false, 'artShadowDual'],
	['Photo Shadow [Image Only]', false, 'artShadowImgOnly'],
	['Photo Style [Dual Mode] Regular-0 Auto-Fill-1 Circular-2', 0, 'artStyleDual'],
	['Photo Style [Image Only] Regular-0 Auto-Fill-1 Circular-2', 0, 'artStyleImgOnly'],

	['Prefer Focus', false, 'focus'],
	['Rating Position Prefer Heading-0 Text-1', 0, 'star'],
	['Rating Show AllMusic', true, 'amRating'],
	['Rating Show Last.fm', true, 'lfmRating'],
	['Rating Text Name AllMusic', 'Album rating', 'allmusic_name'],
	['Rating Text Name Last.fm', 'Album rating', 'lastfm_name'],
	['Rating Text Position Auto-0 Embed-1 Own Line-2', 0, 'ratingTextPos'],

	['Reflection Gradient (%)', 10, 'reflGradient'],
	['Reflection Size (%)', 100, 'reflSize'],
	['Reflection Strength (%)', 14.5, 'reflStrength'],

	['Scrollbar Height Prefer Full', false, 'sbarFullHeight'],
	['Scroll Step 0-10 (0 = Page)', 3, 'scrollStep'],
	['Scroll Smooth Duration 0-5000 msec (Max)', 500, 'durationScroll'],
	['Scroll Touch Flick Duration 0-5000 msec (Max)', 3000, 'durationTouchFlick'],
	['Scroll Touch Flick Distance 0-10', 0.8, 'flickDistance'],
	['Scroll: Smooth Scroll', true, 'smooth'],
	['Scrollbar Arrow Custom Icon', '\uE0A0', 'arrowSymbol'],
	['Scrollbar Arrow Custom Icon: Vertical Offset (%)', -24, 'sbarButPad'],
	['Scrollbar Arrow Width', Math.round(11 * $.scale), 'sbarArrowWidth'],
	['Scrollbar Button Type', 0, 'sbarButType'],
	['Scrollbar Colour Grey-0 Blend-1', 1, 'sbarCol'],
	['Scrollbar Grip MinHeight', Math.round(20 * $.scale), 'sbarGripHeight'],
	['Scrollbar Padding', 0, 'sbarPad'],
	['Scrollbar Narrow Bar Width (0 = Auto)', 0, 'narrowSbarWidth'],
	['Scrollbar Show', 1, 'sbarShow'],
	['Scrollbar Type Default-0 Styled-1 Windows-2', 0, 'sbarType'],
	['Scrollbar Width', Math.round(11 * $.scale), 'sbarWidth'],
	['Scrollbar Width Bar', 11, 'sbarBase_w'],
	['Scrollbar Windows Metrics', false, 'sbarWinMetrics'],

	['Server Name', 'biography', 'serverName'],

	['Show Album History', true, 'showAlbumHistory'],
	['Show Artist History', true, 'showArtistHistory'],
	['Show More Tags', true, 'showMoreTags'],
	['Show Similar Artists', true, 'showSimilarArtists'],
	['Show Top Albums', true, 'showTopAlbums'],

	['Source Bio 0-Am 1-Lfm 2-Wiki 3-Text', 1, 'sourcebio'],
	['Source Rev 0-Am 1-Lfm 2-Wiki 3-Text', 1, 'sourcerev'],

	['Statistics Show Last.fm Metacritic Score', true, 'score'],
	['Statistics Show Last.fm Scrobbles & Listeners', true, 'stats'],

	['Subheading [Track Review] Title Format', '> $if2(%BIO_ARTIST%,Artist Unknown) - $if2(%BIO_TITLE%,Title Unknown)', 'trackSubHeading'],
	['Subheading Source Hide-0 Show-1', 0, 'sourceHeading'],
	['Subheading Source Style', 4, 'sourceStyle'],
	['Subheading Track Hide-0 Auto-1 Show-2', 1, 'trackHeading'],
	['Subheading Track Style', 4, 'trackStyle'],
	['Subheading Wikipedia Style', 5, 'wikiStyle'],

	['Summary Dates', true, 'summaryDate'],
	['Summary Genres', true, 'summaryGenre'],
	['Summary Locale', true, 'summaryLocale'],
	['Summary Other', true, 'summaryOther'],
	['Summary Popular Now', true, 'summaryPopNow'],
	['Summary Latest Release', true, 'summaryLatest'],
	['Summary Show', true, 'summaryShow'],
	['Summary Style', 0, 'summaryStyle'],
	['Text Album + Track Auto Optimise', true, 'albTrackAuto'],
	['Text Align Always Top', false, 'topAlign'],
	['Text Only', false, 'text_only'],

	['Text Reader Enable', false, 'txtReaderEnable'],
	['Text Reader Lyrics Fade Height', 0, 'lyricsFadeHeight'],
	['Text Reader Lyrics Font Style', 1, 'lyricsFontStyle'],
	['Text Reader Lyrics Scroll Max Method', 0, 'lyricsScrollMaxMethod'],
	['Text Reader Lyrics Scroll Time Max', 500, 'lyricsScrollTimeMax'],
	['Text Reader Lyrics Scroll Time Average', 750, 'lyricsScrollTimeAvg'],
	['Text Reader Scroll Synced Lyrics', true, 'scrollSynced'],
	['Text Reader Scroll Unsynced Lyrics', false, 'scrollUnsynced'],
	['Text Reader Source 0 Name', 'lyrics', 'nmTxtReader0'],
	['Text Reader Source 1 Name', 'lyrics', 'nmTxtReader1'],
	['Text Reader Source 2 Name', 'lyrics', 'nmTxtReader2'],
	['Text Reader Source 3 Name', '', 'nmTxtReader3'],
	['Text Reader Source 4 Name', '', 'nmTxtReader4'],
	['Text Reader Source 5 Name', '', 'nmTxtReader5'],
	['Text Reader Source 6 Name', '', 'nmTxtReader6'],
	['Text Reader Source 7 Name', '', 'nmTxtReader7'],
	['Text Reader Source 1 (field or full path)', '%profile%\\lyrics\\%BIO_ARTIST% - %BIO_TITLE%.lrc', 'pthTxtReader0'],
	['Text Reader Source 2 (field or full path)', '$if3(%lyrics%,%syncedlyrics%,%unsynced lyrics%,%unsyncedlyrics%)', 'pthTxtReader1'],
	['Text Reader Source 3 (field or full path)', '%profile%\\lyrics\\%BIO_ARTIST% - %BIO_TITLE%.txt', 'pthTxtReader2'],
	['Text Reader Source 4 (field or full path)', '', 'pthTxtReader3'],
	['Text Reader Source 5 (field or full path)', '%profile%\\lyrics\\%BIO_ARTIST% - %BIO_TITLE%.lrc', 'pthTxtReader4'],
	['Text Reader Source 6 (field or full path)', '$if3(%lyrics%,%syncedlyrics%,%unsynced lyrics%,%unsyncedlyrics%)', 'pthTxtReader5'],
	['Text Reader Source 7 (field or full path)', '%profile%\\lyrics\\%BIO_ARTIST% - %BIO_TITLE%.txt', 'pthTxtReader6'],
	['Text Reader Source 8 (field or full path)', '', 'pthTxtReader7'],
	['Text Reader Source 1 Lyrics', true, 'lyricsTxtReader0'],
	['Text Reader Source 2 Lyrics', true, 'lyricsTxtReader1'],
	['Text Reader Source 3 Lyrics', true, 'lyricsTxtReader2'],
	['Text Reader Source 4 Lyrics', false, 'lyricsTxtReader3'],
	['Text Reader Source 5 Lyrics', true, 'lyricsTxtReader4'],
	['Text Reader Source 6 Lyrics', true, 'lyricsTxtReader5'],
	['Text Reader Source 7 Lyrics', true, 'lyricsTxtReader6'],
	['Text Reader Source 8 Lyrics', false, 'lyricsTxtReader7'],
	['Text Reader Synchronise With Lyrics Download', false, 'syncTxtReaderLyrics'],

	['Theme', 0, 'theme'],
	['Touch Control', false, 'touchControl'],
	['Track Review', 0, 'inclTrackRev'],
	['Touch Step 1-10', 1, 'touchStep'],
	['Zoom Font Size (%)', 100, 'zoomFont'],
	['Zoom Heading Font Size (%)', 115, 'zoomHead'],
	['Zoom Button Heading Size (%)', 100, 'zoomHeadBtn'],
	['Zoom Button LookUp Size (%)', 100, 'zoomLookUpBtn'],
	['Zoom Tooltip (%)', 100, 'zoomTooltip']
];

const ppt = new PanelProperties;
ppt.init('auto', properties);
properties = undefined;

const oldProperties = [
'Allmusic Alb',
'Allmusic Bio',
'Both Bio',
'Both Rev',
'Heading',
'Heading Title Format Album Review [AllMusic]', 'Heading Title Format Album Review [Last.fm]', 'Heading Title Format Biography [AllMusic]', 'Heading Title Format Biography [Last.fm]', 'Heading Title Format Track Review [AllMusic]', 'Heading Title Format Track Review [Last.fm]', 
'Layout Dual Image+Text',
'Image Seeker Dots',
'Subheading [Source] Text Biography [AllMusic]: Heading|No Heading',
'Subheading [Source] Text Biography [Last.fm]: Heading|No Heading',
'Subheading [Source] Text Biography [Wikipedia]: Heading|No Heading',
'Subheading [Source] Text Review [AllMusic]: Heading|No Heading',
'Subheading [Source] Text Review [Last.fm]: Heading|No Heading',
'Subheading [Source] Text Review [Wikipedia]: Heading|No Heading',

'Subheading [Track Review] Title Format [AllMusic]', 'Subheading [Track Review] Title Format [Last.fm]', 'Subheading Source Hide-0 Auto-1 Show-2','Summary First', 'Tagger Last.fm Genre Find>Replace', 'Tagger Last.fm Genre Number Clean Up', 'Tagger Last.fm Genre Run Find>Replace', 'Tagger Last.fm Genre Strip Artist+Album Names'];
oldProperties.forEach(v => window.SetProperty(v, null));
ppt.lockRev = ppt.lockBio;