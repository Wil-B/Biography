'use strict';

class Text {
	constructor() {
		const DT_CENTER = 0x00000001;
		const DT_RIGHT = 0x00000002;
		const DT_VCENTER = 0x00000004;
		const DT_WORDBREAK = 0x00000010;
		const DT_SINGLELINE = 0x00000020;
		const DT_CALCRECT = 0x00000400;
		const DT_NOCLIP = 0x00000100;
		const DT_NOPREFIX = 0x00000800;
		const DT_WORD_ELLIPSIS = 0x00040000;
		this.album = '';
		this.albumartist = '';
		this.artist = '';
		this.composition = '';
		this.countryCodes = `${cfg.storageFolder}country_code.json`;
		this.cur_artist = '';
		this.calc = true;
		this.cc = DT_CENTER | DT_VCENTER | DT_SINGLELINE | DT_NOPREFIX | DT_WORD_ELLIPSIS;
		this.font = {main: ''}
		this.get = 1;
		this.heading = '';
		this.l = DT_NOPREFIX;
		this.lc = DT_VCENTER | DT_SINGLELINE | DT_NOPREFIX | DT_WORD_ELLIPSIS;
		this.c = [this.lc, DT_RIGHT | this.lc];
		this.ncc = DT_CENTER | DT_VCENTER | DT_NOCLIP | DT_WORDBREAK | DT_CALCRECT | DT_NOPREFIX | DT_WORD_ELLIPSIS;
		this.na = '';
		this.newText = false;
		this.repaint = true;
		this.textUpdate = 0;
		this.track = '';
		this.trackartist = '';

		this.topTags = ['Tags', 'Tags', 'Tags', 'Tags', 'Tag', '\u30bf\u30b0', 'Tagi', 'Tags', '\u0422\u0435\u0433\u0438', 'Taggar', 'Etiketler', '\u6807\u7b7e'];

		ppt.sourceHeading = $.clamp(ppt.sourceHeading, 0, 1);
		ppt.trackHeading = $.clamp(ppt.trackHeading, 0, 2);

		this.bio = {
			allmusic: false,
			am: '',
			am_w: {
				hd: 0,
				nohd: 0
			},
			arr: [],
			born: 'Born: |Geburtstag: |Fecha de nacimiento: |N\\u00e9\\(e\\) le: |Data di nascita: |\\u751f\\u5e74\\u6708\\u65e5: |Urodzony: |Data de nascimento: |\\u0413\\u043e\\u0434 \\u0440\\u043e\\u0436\\u0434\\u0435\\u043d\\u0438\\u044f: |F\\u00f6dd: |Do\\u011fum tarihi: |\\u51fa\\u751f: ',
			bornIn: 'Born In: |Geboren in: |Lugar de nacimiento: |N\\u00e9\\(e\\) en: |Luogo di nascita: |\\u51fa\\u8eab\\u5730: |Urodzony w: |Local de nascimento: |\\u041c\\u0435\\u0441\\u0442\\u043e \\u0440\\u043e\\u0436\\u0434\\u0435\\u043d\\u0438\\u044f: |F\\u00f6dd: |Do\\u011fum yeri: |\\u751f\\u4e8e: ',
			cur: '',
			died: 'Died: |Gestorben: |Fallecido: |D\\u00e9c\\u00e9d\\u00e9(e) le: |Data di morte: |\\u6ca1\\u5e74: |Zmar\\u0142: |Data de falecimento: |\\u0414\\u0430\\u0442\\u0430 \\u0441\\u043c\\u0435\\u0440\\u0442\\u0438: |D\\u00f6d: |\\u00d6l\\u00fcm tarihi: |\\u901d\\u4e16:',
			fallbackText: ppt.bioFallbackText.split('|'),
			flag: null,
			flagCode: '',
			foundedIn: 'Founded In: |Gegr\\u00fcndet: |Formado en: |Fond\\u00e9 en: |Luogo di fondazione: |\\u51fa\\u8eab\\u5730: |Za\\u0142o\\u017cono w: |Local de funda\\u00e7\\u00e3o: |\\u041c\\u0435\\u0441\\u0442\\u043e \\u043e\\u0441\\u043d\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f: |Grundat \\u00e5r: |Kuruldu\\u011fu tarih: |\\u521b\\u5efa\\u4e8e: ',
			lang: ['biography', 'Biografie', 'biograf\u00eda', 'biographie', 'biografia', '\u4f1d\u8a18', 'biografia', 'biografia', '\u0431\u0438\u043e\u0433\u0440\u0430\u0444\u0438\u044f', 'biografi', 'ya\u015fam \u00f6yk\u00fcs\u00fc', '\u4f20\u8bb0'],
			latestRelease: 'Latest Release: |Letzte Ver\\u00f6ffentlichung: |\\u00daltimo Lanzamiento: |Derni\\u00e8re Sortie: |Album Pi\\u00f9 Recente: |\\u6700\\u65b0\\u30ea\\u30ea\\u30fc\\u30b9: |Najnowsze Wydania: |\\u00daltimo Lan\\u00e7amento: |\\u041f\\u043e\\u0441\\u043b\\u0435\\u0434\\u043d\\u0438\\u0435 \\u0440\\u0435\\u043b\\u0438\\u0437\\u044b: |Senaste Skivsl\\u00e4pp: |En Son Yay\\u0131nlanan Alb\\u00fcm: |\\u6700\\u65b0\\u5185\\u5bb9: ',
			lfm: '',
			lfm_w: {
				hd: 0,
				nohd: 0
			},
			loaded: {
				am: false,
				lfm: false,
				wiki: false,
				txt: false,
				ix: -1
			},
			lookUp: false,
			popNow: 'Popular Now: |Beliebt Jetzt: |Popular Ahora: |Populaire Maintenant: |Popolare Ora: |\\u4eca\\u4eba\\u6c17: |Popularne Teraz: |Popular Agora: |\\u041f\\u043e\\u043f\\u0443\\u043b\\u044f\\u0440\\u043d\\u044b\\u0435 \\u0441\\u0435\\u0439\\u0447\\u0430\\u0441: |Popul\\u00e4r Nu: |\\u015eImdi Pop\\u00fcler: |\\u70ed\\u95e8 \\u73b0\\u5728',
			reader: false,
			readerItem: '',
			readerHeading: '',
			readerTag: false,
			scrollPos: {},
			source: {
				am: ppt.sourcebio == 0,
				lfm: ppt.sourcebio == 1,
				wiki: ppt.sourcebio == 2,
				txt: ppt.sourcebio == 3
			},
			sp: 0,
			subHeading: 0,
			text: '',
			txt: '',
			txt_w: {
				hd: 0,
				nohd: 0
			},
			wiki: '',
			wiki_w: {
				hd: 0,
				nohd: 0
			},
			ln: {
				x1: 0,
				x2: 0
			},
			yrsActive: "Years Active: |Jahre aktiv: |A\\u00f1os de actividad: |Ann\\u00e9es d'activit\\u00e9: |Anni di attivit\\u00e0: |\\u6d3b\\u52d5\\u671f\\u9593: |Lata aktywno\\u015bci: |Anos de atividade: |\\u0410\\u043a\\u0442\\u0438\\u0432\\u043d\\u043e\\u0441\\u0442\\u044c \\(\\u043b\\u0435\\u0442\\): |\\u00c5r aktiv: |Aktif y\\u0131llar: |\\u6d3b\\u8dc3\\u5e74\\u4efd: |Born: |Geburtstag: |Fecha de nacimiento: |N\\u00e9\\(e\\) le: |Data di nascita: |\\u751f\\u5e74\\u6708\\u65e5: |Urodzony: |Data de nascimento: |\\u0413\\u043e\\u0434 \\u0440\\u043e\\u0436\\u0434\\u0435\\u043d\\u0438\\u044f: |F\\u00f6dd: |Do\\u011fum tarihi: |\\u51fa\\u751f: "
		}
		
		this.bio.subhead = {
			am: [`AllMusic`, `AllMusic ${this.bio.lang[cfg.lang.ix]}`],
			lfm: [`Last.fm`, `Last.fm ${this.bio.lang[cfg.lang.ix]}`],
			wiki: [`Wikipedia`, `Wikipedia ${this.bio.lang[cfg.lang.ix]}`],
			txt: ['', '']
		}

		this.d = {}

		this.done = {
			amBio: false,
			amRev: false,
			lfmBio: false,
			lfmRev: false,
			wikiBio: false,
			wikiRev: false
		}

		this.id = {
			alb: '',
			curAlb: '',
			album: '',
			curAlbum: '',
			composition: '',
			curComp: '',
			tr: '',
			curTr: ''
		}

		this.lyrics = {
			lyrics3Installed: utils.CheckComponent('foo_uie_lyrics3'),
			openLyricsInstalled: utils.CheckComponent('foo_openlyrics')
		}

		this.mod = {
			amBio: 0,
			curAmBio: 0,
			amRev: 0,
			curAmRev: 0,
			lfmBio: 0,
			curLfmBio: 0,
			lfmRev: 0,
			curLfmRev: 0,
			wikiBio: 0,
			curWikiBio: 0,
			wikiRev: 0,
			curWikiRev: 0
		}

		this.reader = {
			items: [],
			lyrics: false,
			lyrics3Saved: false,
			openLyricsSaved: false,
			trackStartTime: fb.PlaybackTime,
			tag: false,
			text: false
		}

		this.rev = {
			amFallback: false,
			allmusic: true,
			am: '',
			am_w: {
				hd: 0,
				nohd: 0
			},
			amAlb: '',
			amTrackHeading: true,
			arr: [],
			both: 0,
			checkedTrackSubHead: true,
			cur: '',
			fallbackText: ppt.revFallbackText.split('|'),
			flag: null,
			flagCode: '',
			lang: ['review', 'Rezension', 'rese\u00f1a', 'examen', 'recensione', '\u6279\u8a55', 'przegl\u0105d', 'revis\u00e3o', '\u043e\u0431\u0437\u043e\u0440', 'granskning', 'ele\u015ftiri', '\u56de\u987e'],
			len: 'Length: |Dauer: |Duraci\\u00f3n: |Dur\\u00e9e: |Durata: |\\u518d\\u751f\\u6642\\u9593: |Czas trwania: |Dura\\u00e7\\u00e3o: |\\u041f\\u0440\\u043e\\u0434\\u043e\\u043b\\u0436\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u044c: |L\\u00e4ngd: |S\\u00fcresi: |\\u65f6\\u957f: ',
			length: ['Length: ', 'Dauer: ', 'Duraci\u00f3n: ', 'Dur\u00e9e: ', 'Durata: ', '\u518d\u751f\u6642\u9593: ', 'Czas trwania: ', 'Dura\u00e7\u00e3o: ', '\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c: ', 'L\u00e4ngd: ', 'S\u00fcresi: ', '\u65f6\u957f: '],
			lfm: '',
			lfm_w: {
				hd: 0,
				nohd: 0
			},
			lfmAlb: '',
			lfmTrackHeading: true,
			loaded: {
				am: false,
				lfm: false,
				wiki: false,
				txt: false,
				ix: -1
			},
			lookUp: false,
			reader: false,
			readerItem: '',
			readerHeading: '',
			readerTag: false,
			releaseDate: 'Release Date: |Ver\\u00f6ffentlichungsdatum: |Fecha De Lanzamiento: |Date De Sortie: |Data Di Pubblicazione: |\\u30ea\\u30ea\\u30fc\\u30b9\\u65e5: |Data Wydania: |Data De Lan\\u00e7amento: |\\u0414\\u0430\\u0442\\u0430 \\u0440\\u0435\\u043b\\u0438\\u0437\\u0430: |Utgivningsdatum: |Yay\\u0131nlanma Tarihi: |\\u53d1\\u884c\\u65e5\\u671f: ',
			scrollPos: {},
			source: {
				am: ppt.sourcerev == 0,
				lfm: ppt.sourcerev == 1,
				wiki: ppt.sourcerev == 2,
				txt: ppt.sourcerev == 3
			},
			subHeading: 0,
			text: '',
			txt: '',
			txt_w: {
				hd: 0,
				nohd: 0
			},
			wiki: '',
			wiki_w: {
				hd: 0,
				nohd: 0
			},
			wikiAlb: '',
			wikiFallback: false,
			wikiTrackHeading: true,
			ln: {
				x1: 0,
				x2: 0
			},
			y: Math.round(Math.max(1, ui.font.main_h * 0.05))
		}
		
		this.rev.subhead = {
			am: [`AllMusic`, `AllMusic ${this.rev.lang[cfg.lang.ix]}`],
			lfm: [`Last.fm`, `Last.fm ${this.rev.lang[cfg.lang.ix]}`],
			wiki: [`Wikipedia`, `Wikipedia ${this.rev.lang[cfg.lang.ix]}`],
			txt: ['', '']
		}

		this.rating = {
			am: -1,
			lfm: -1
		}

		this.currentTrackTags = $.debounce(() => {
			const handle = $.handle(panel.id.focus);
			if (handle) tag.write(new FbMetadbHandleList([handle]), true);
		}, 2000, {
			'leading': true,
			'trailing': true
		});
		this.loadReader();
	}

	// Methods

	add(items, text) {
		items.forEach(v => text = text && v ? `${text}\r\n\r\n${v}` : text || v);
		return text;
	}

	albCalc() {
		if (!this.rev.text || ppt.img_only || this.lyricsDisplayed()) return;
		this.rev.arr = [];
		let l = [];
		$.gr(1, 1, false, g => {
			if (panel.style.inclTrackRev) {
				let ti = this.rev.text.match(/\u00a6Song\u00a6.+?$/gm);
				if (ti) {
					ti.forEach(v => {
						if (g.CalcTextWidth(v, ui.font.main) > panel.text.w) {
							const new_ti = g.EstimateLineWrap(v, ui.font.subHeadTrack, panel.text.w - g.CalcTextWidth('... ', ui.font.subHeadTrack))[0] + '...';
							this.rev.text = this.rev.text.replace(RegExp($.regexEscape(v)), new_ti);
						}
					});
				}
			}
			l = g.EstimateLineWrap(this.rev.text, ui.font.main, panel.text.w);
		});

		for (let i = 0; i < l.length; i += 2) {
			this.rev.arr.push({text: l[i].trim()});
		}

		let summaryEnd = 0;
		if (panel.summary.show) {
			this.rev.arr.some((v, i, arr) => {
				if (v.text == '\u00a6End\u00a6') {
					summaryEnd = i;
					arr.splice(i, 1);
					return true;
				}
			});
			for (let i = 0; i < summaryEnd; i++) this.rev.arr[i].text = this.rev.arr[i].text.replace(/^\u2219\s|^\|\s+/, '').replace(/\s*\|$/, '');
		}

		this.rev.arr.forEach((v, i) => {
			v.col = this.rev.subHeading && !i ? ui.col.source : i < summaryEnd ? ui.col.summary : ui.col.text;
			v.font = !this.rev.subHeading || i ? ui.font.main : ui.font.subHeadSource;
			v.offset = 0;
			if (v.text.startsWith('\u00a6Song\u00a6')) {
				v.col = ui.col.track;
				v.font = ui.font.subHeadTrack;
				v.song = true;
				v.text = v.text.replace('\u00a6Song\u00a6', '');
			}
			if (this.rev.loaded.wiki && v.text.startsWith('==')) {
				v.font = ui.font.subHeadWiki;
				v.offset = ui.font.main_h * 0.125;
				v.subHeadWiki = true;
			}
			if (this.rev.subHeading && !i && ppt.heading) v.offset = ui.font.main_h * 0.2;
		});

		this.tidyWiki('rev');
		but.refresh(true);
		alb_scrollbar.reset();
		alb_scrollbar.metrics(panel.sbar.x, panel.sbar.y, ui.sbar.w, panel.sbar.h, panel.lines_drawn, ui.font.main_h, false);
		alb_scrollbar.setRows(this.rev.arr.length);

		const appendRatingStars = !panel.summary.show && (ui.stars == 2 || ui.stars == 1 && !ppt.hdBtnShow) && (ppt.ratingTextPos == 2 || this.rev.subHeading && !ppt.ratingTextPos) && !ppt.artistView && this.rev.arr.length > 1 && (!this.rev.subHeading ? (this.rev.loaded.am && this.rating.am != -1 || this.rev.loaded.lfm && this.rating.lfm != -1) : true);
		if (appendRatingStars) {
			const subHeadingWidth = this.rev[['am_w', 'lfm_w', 'wiki_w', 'txt_w'][this.rev.loaded.ix]].nohd + this.bio.sp;
			if (this.rev.loaded.am && this.rating.am >= 0) {
				this.d.ax = panel.text.l + (ppt.heading ? this.rev.am_w.hd : this.rev.am_w.nohd);
				this.rev.ln.x1 = panel.text.l + subHeadingWidth + this.bio.sp + but.rating.w2;
				this.rev.ln.x2 = Math.max(this.rev.ln.x1, panel.text.l + panel.text.w);
			}
			if (this.rev.loaded.lfm && this.rating.lfm >= 0) {
				this.d.lx = panel.text.l + (ppt.heading ? this.rev.lfm_w.hd : this.rev.lfm_w.nohd);
				this.rev.ln.x1 = panel.text.l + subHeadingWidth + this.bio.sp + but.rating.w2;
				this.rev.ln.x2 = Math.max(this.rev.ln.x1, panel.text.l + panel.text.w);
			}
			this.d.ry = Math.round((ui.font.main_h - but.rating.h1 / 2) / 1.8);
		}
		if (panel.style.inclTrackRev == 1) this.getScrollPos();
	}

	albumFlush() {
		this.mod.amRev = this.rev.am = this.rev.lfm = this.mod.lfmRev = this.rev.wiki = this.mod.wikiRev = '';
		this.mod.curAmRev = this.mod.curLfmRev = this.mod.curWikiRev = 1;
		this.rev.checkedTrackSubHead = this.done.amRev = this.done.lfmRev = this.done.wikiRev = false;
		this.rev.text = '';
		but.setScrollBtnsHide();
	}

	albumReset(upd) {
		if (panel.lock) return;
		this.id.curAlbum = this.id.album;
		this.id.album = name.albID(panel.id.focus, 'simple');
		const new_album = this.id.album != this.id.curAlbum;
		if (new_album) this.id.alb = '';
		
		let new_composition = false;
		if (ppt.classicalMusicMode) {
			this.id.curComp = this.id.composition;
			this.id.composition = $.eval(cfg.tf.artist + cfg.tf.albumArtist + cfg.tf.composition, panel.id.focus);
			new_composition = this.id.composition != this.id.curComp;
		}
		
		if (new_album || new_composition || upd) {
			this.album = name.album(panel.id.focus);
			this.albumartist = name.albumArtist(panel.id.focus);
			this.composition = name.composition(panel.id.focus);
			this.albumFlush();
			this.rev.lookUp = false;
		}
		if (panel.style.inclTrackRev) {
			this.id.curTr = this.id.tr;
			this.id.tr = name.trackID(panel.id.focus);
			const new_track = this.id.tr != this.id.curTr;
			if (new_track) {
				this.rev.checkedTrackSubHead = this.done.amRev = this.done.lfmRev = this.done.wikiRev = false;
				if (panel.style.inclTrackRev == 1) this.logScrollPos('rev');
			}
		}
	}

	amBio(a) {
		const aBio = panel.getPth('bio', panel.id.focus, this.artist, '', '', cfg.supCache, a, '', '', 'foAmBio', true).pth;
		if (!$.file(aBio)) return;
		this.mod.amBio = $.lastModified(aBio) || 0;
		if (this.mod.amBio == this.mod.curAmBio) return;
		this.bio.am = $.open(aBio).trim();
		this.bio.am = this.bio.am.replace(/, Jr\./g, ' Jr.');
		this.bio.am = this.formatText('amBio', this.bio.am, panel.summary.genre ? {limit: 6, list: true, key: 'Genre: '} : {}, !panel.summary.other ? {} : {list: true, key: 'Group Members: ', prefix: true, suffix: true}, panel.summary.date || panel.summary.locale ? {key: 'Formed: |Born: '} : {}, panel.summary.date ? {key: 'Died: '} : {}, panel.summary.date ? {key: 'Active: '} : {}).replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		this.newText = true;
		this.mod.curAmBio = this.mod.amBio;
	}

	amRev(a, aa, l, c) {
		let am_tr_mod = 0;
		let aRev = '';
		let foundComp = false;
		let trackRev = '';
		let trk = '';
		let writer = '';

		if (!ppt.classicalMusicMode || panel.alb.ix) {
			aRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foAmRev', true).pth;
		} else if (!panel.alb.ix) {
			aRev = panel.getPth('rev', panel.id.focus, this.artist, this.composition, '', cfg.supCache, a, aa, c, 'foAmRev', true).pth;
			if ($.file(aRev)) foundComp = true;
		}
		this.rev.amFallback = !foundComp;
		if (!$.file(aRev) && ppt.classicalAlbFallback && !panel.alb.ix && panel.style.inclTrackRev != 2) {
			aRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foAmRev', true).pth;
		}
		let rat = '';
		if (!$.file(aRev)) {
			this.rating.am = -1;
			but.check();
			if (!panel.style.inclTrackRev || ppt.classicalMusicMode && !ppt.classicalAlbFallback) {
				this.rev.amAlb = '';
				return;
			}
		}
		if (panel.style.inclTrackRev) {
			trk = this.track.toLowerCase();
			trackRev = $.jsonParse(panel.getPth('track', panel.id.focus, this.trackartist, 'Track Reviews', '', '', $.clean(this.trackartist), '', 'Track Reviews', 'foAmRev', true).pth, false, 'file');
			if (trackRev[trk] && trackRev[trk].update) am_tr_mod = trackRev[trk].update;
		}
		this.mod.amRev = ($.lastModified(aRev) || 0) + (am_tr_mod || 0);
		if (this.mod.amRev == this.mod.curAmRev) return;
		this.rev.amAlb = '';

		if (panel.style.inclTrackRev != 2 || foundComp) this.rev.amAlb = $.open(aRev).trim();
		this.rev.amAlb = this.rev.amAlb.replace('Genre: ', 'Album Genres: ');
		this.newText = true;
		this.mod.curAmRev = this.mod.amRev;
		this.rating.am = -1;
		let b = this.rev.amAlb.indexOf('>> Album rating: ') + 17;
		const f = this.rev.amAlb.indexOf(' <<');
		if (panel.style.inclTrackRev != 2 || foundComp) {
			if (ppt.amRating) {
				if (b != -1 && f != -1 && f > b) this.rating.am = this.rev.amAlb.substring(b, f);
				if (!isNaN(this.rating.am) && this.rating.am != 0 && this.rating.am != -1) this.rating.am *= 2;
				else this.rating.am = -1;
			}
			if ((ui.stars == 1 && ppt.hdBtnShow || !ppt.amRating) && f != -1) this.rev.amAlb = this.rev.amAlb.substring(f + 5);
			else if (!panel.summary.show && (ui.stars == 2 || ui.stars == 1 && !ppt.hdBtnShow) && (ppt.ratingTextPos == 2 || ppt.sourceHeading && !ppt.ratingTextPos) && this.rating.am != -1) {
				this.rev.amAlb = (!ppt.sourceHeading ? ppt.allmusic_name + ':\r\n\r\n' : '') + this.rev.amAlb.substring(f + 5);
			} else {
				if (!ui.stars || this.rating.am == -1 || panel.summary.show) {
					b = this.rev.amAlb.indexOf(' <<');
					if (b != -1) this.rev.amAlb = this.rev.amAlb.slice(b + 3);
					if (panel.summary.show) rat = this.rating.am != -1 ? ppt.allmusic_name + ': ' + this.rating.am / 2 : '';
				} else if (ppt.allmusic_name != 'Album rating') this.rev.amAlb = this.rev.amAlb.replace('Album rating', ppt.allmusic_name);
			}
		}
		this.rev.am = this.rev.amAlb;
		let needTrackSubHeading = false;
		if (!ppt.classicalMusicMode || !foundComp) {
			if (panel.style.inclTrackRev) {
				if (trackRev && trackRev[trk]) {
					const o = trackRev[trk];
					let releaseYear = $.getProp(o, 'date', '');
					if (releaseYear) releaseYear = `Release Year: ${releaseYear}`;
					let composer = $.getProp(o, 'composer', []).join('\u200b, ');
					if (composer) {
						writer = o.composer.length > 1 ? 'Composers: ' : 'Composer: ';
						composer = writer + composer;
					}
					let wiki = $.getProp(o, 'wiki', '');
					wiki = this.add([composer], wiki);
					const showGenres = !ppt.albTrackAuto || !this.rev.amAlb;
					if (showGenres) {
						const get = (item) => {
							const it2 = $.titlecase(item);
							const it1 = it2.slice(-1);
							let items = $.getProp(o, item, []).join('\u200b, ');
							if (items) items = (o[item].length > 1 ? `Track ${it2}: ` : `Track ${it1}: `) + items;
							return items;
						}
						wiki = this.add([get('genres'), get('moods'), get('themes')], wiki)
					}
					let author = $.getProp(o, 'author', '');
					wiki = this.add([releaseYear, author], wiki)
					if (wiki) {
						if (ppt.trackHeading == 1 && (this.rev.amAlb || !ppt.heading) || ppt.trackHeading == 2) {
							this.rev.amTrackHeading = false;
							if (this.rev.amAlb) {
								trackRev =  '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + wiki;
							} else {
								trackRev = wiki;
								needTrackSubHeading = true;
							}
						} else {
							this.rev.amTrackHeading = true;
							trackRev = wiki;
						}
						this.rev.am = this.add([trackRev], this.rev.amAlb);
					} else {
						this.rev.amTrackHeading = panel.style.inclTrackRev == 2;
					}
				} else {
					this.rev.amTrackHeading = panel.style.inclTrackRev == 2;
				}
			}
		} else this.rev.amTrackHeading = false;
		this.rev.am = this.formatText('amRev', this.rev.am, panel.summary.genre ? {limit: 6, list: true, key: this.rev.amAlb ? 'Album Genres: ' : 'Track Genres: '} : {}, !panel.summary.other ? {} : {limit: 6, list: true, key: this.rev.amAlb ? 'Album Moods: ' : 'Track Moods: ', prefix: true}, panel.summary.date ? {key: this.rev.amAlb ? 'Release Date: ' : 'Release Year: '} : {}, {str: rat}).replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		if (needTrackSubHeading) this.rev.am = '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + this.rev.am;
		if (!this.rev.am) but.check();
	}

	artCalc() {
		if (!this.bio.text || ppt.img_only || this.lyricsDisplayed()) return;
		this.bio.arr = [];
		let l = [];
		$.gr(1, 1, false, g => l = g.EstimateLineWrap(this.bio.text, ui.font.main, panel.text.w));
		for (let i = 0; i < l.length; i += 2) this.bio.arr.push({text: l[i].trim()});
		let summaryEnd = 0;
		if (panel.summary.show) {
			this.bio.arr.some((v, i, arr) => {
				if (v.text == '\u00a6End\u00a6') {
					summaryEnd = i;
					arr.splice(i, 1);
					return true;
				}
			});
			for (let i = 0; i < summaryEnd; i++) this.bio.arr[i].text = this.bio.arr[i].text.replace(/^\u2219\s|^\|\s+/, '').replace(/\s*\|$/, '');
		}

		this.bio.arr.forEach((v, i) => {
			v.col = this.bio.subHeading && !i ? ui.col.source : i < summaryEnd ? ui.col.summary : ui.col.text;
			v.font = !this.bio.subHeading || i ? ui.font.main : ui.font.subHeadSource;
			v.offset = 0;
			if (this.bio.loaded.wiki && (v.text.startsWith('==') || v.text.endsWith('=='))) {
				v.font = ui.font.subHeadWiki;
				v.offset = ui.font.main_h * 0.125;
				v.subHeadWiki = true;
			}
			if (this.bio.subHeading && !i && ppt.heading) v.offset = ui.font.main_h * 0.2;
		});

		this.tidyWiki('bio');
		but.refresh(true);
		art_scrollbar.reset();
		art_scrollbar.metrics(panel.sbar.x, panel.sbar.y, ui.sbar.w, panel.sbar.h, panel.lines_drawn, ui.font.main_h, false);
		art_scrollbar.setRows(this.bio.arr.length);
	}

	artistFlush() {
		this.done.amBio = this.done.lfmBio = this.done.wikiBio = false;
		this.mod.amBio = this.bio.am = this.mod.lfmBio = this.bio.lfm = this.mod.wikiBio = this.bio.wiki = this.bio.txt = '';
		this.mod.curAmBio = this.mod.curLfmBio = this.mod.curWikiBio = '1';
		this.bio.text = '';
		but.setScrollBtnsHide();
	}

	artistReset(upd) {
		if (panel.artistsSame() || panel.lock) return;
		this.cur_artist = this.artist;
		this.artist = name.artist(panel.id.focus);
		const new_artist = this.artist != this.cur_artist;
		if (new_artist || upd) {
			this.bio.lookUp = false;
			this.artistFlush();
		}
	}

	bioPth(n) {
		if (ppt.img_only) return ['', '', false, false];
		return panel.getPth('bio', panel.id.focus, this.artist, '', '', cfg.supCache, $.clean(this.artist), '', '', `fo${n}Bio`, false);
	}

	checkAbb(str) {
		return str.replace(', United Kingdom', '').replace(', United States', '').replace(', U.S.', '').replace(', UK', '').replace('Years Active', 'Active').trim();
	}

	chkGenre(n) {
		const ix = n.lastIndexOf('Genre: ');
		if (ix != -1) {
			let sub = n.substring(ix);
			sub = sub.split('\n')[0].trim();
			sub = sub.replace('Genre: ', '');
			const g = sub.match(/,/g) || [];
			return {singleGenre: !g.length, sub: sub}
		}
		return {singleGenre: false, sub: ''};
	}

	checkNewLine(sub, n) {
		if (!sub[n]) return '';
		let cur_str = '';
		let w = 0;
		for (let i = 1; i < n; i++) {
			cur_str = cur_str && sub[i] ? cur_str + '  |  ' + sub[i] : cur_str || sub[i];
		}
		$.gr(1, 1, false, g => w = g.CalcTextWidth(cur_str, ui.font.main));
		return sub[n] = cur_str && w < panel.text.w ? '\r\n' + sub[n] : sub[n];	
	}

	checkStr(sub, n) {
		if (!sub[n]) return '';
		let cur_str = '';
		for (let i = 1; i < n + 1; i++) {
			cur_str = cur_str && sub[i] ? cur_str + '  |  ' + sub[i] : cur_str || sub[i];
		}
		cur_str = cur_str.split('\r\n');
		cur_str = cur_str[1] || cur_str[0];
		let w = 0;
		$.gr(1, 1, false, g => w = g.CalcTextWidth(cur_str, ui.font.main));
		if (w < panel.text.w) return sub[n];
	
		cur_str = '';
		for (let i = 1; i < n; i++) {
			cur_str = cur_str && sub[i] ? cur_str + '  |  ' + sub[i] : cur_str || sub[i];
		}

		w = 0;
		$.gr(1, 1, false, g => w = g.CalcTextWidth(cur_str, ui.font.main));
		const precedingSingleLineStr = w < panel.text.w;

		w = 0;
		$.gr(1, 1, false, g => w = g.CalcTextWidth(cur_str, ui.font.main));
		return precedingSingleLineStr ? (w > panel.text.w ? sub[n] : '\r\n' + sub[n]) : sub[n];	
	}

	draw(gr) {
		if (!ppt.img_only) {
			this.getTxtFallback();
			if (ppt.typeOverlay && ppt.style > 3 && !ppt.img_only && !ppt.text_only) {
				gr.SetSmoothingMode(2);
				let o = 0;
				switch (ppt.typeOverlay) {
					case 1:
						gr.FillSolidRect(panel.tbox.l, panel.tbox.t, panel.tbox.w, panel.tbox.h, ui.col.rectOv);
						break;
					case 2:
						o = Math.round(ui.overlay.borderWidth / 2);
						gr.FillSolidRect(panel.tbox.l + o, panel.tbox.t + o, panel.tbox.w - o * 2, panel.tbox.h - o * 2, ui.col.rectOv);
						gr.DrawRect(panel.tbox.l + o, panel.tbox.t + o, panel.tbox.w - ui.overlay.borderWidth - 1, panel.tbox.h - ui.overlay.borderWidth - 1, ui.overlay.borderWidth, ui.col.rectOvBor);
						break;
					case 3:
						gr.FillRoundRect(panel.tbox.l, panel.tbox.t, panel.tbox.w, panel.tbox.h, panel.arc, panel.arc, ui.col.rectOv);
						break;
					case 4:
						o = Math.round(ui.overlay.borderWidth / 2);
						gr.FillRoundRect(panel.tbox.l + o, panel.tbox.t + o, panel.tbox.w - o * 2, panel.tbox.h - o * 2, panel.arc, panel.arc, ui.col.rectOv);
						gr.DrawRoundRect(panel.tbox.l + o, panel.tbox.t + o, panel.tbox.w - ui.overlay.borderWidth - 1, panel.tbox.h - ui.overlay.borderWidth - 1, panel.arc, panel.arc, ui.overlay.borderWidth, ui.col.rectOvBor);
						break;
				}
			}
			if (ppt.artistView && this.bio.text && !this.lyricsDisplayed()) {
				const b = Math.max(Math.round(art_scrollbar.delta / ui.font.main_h + 0.4), 0);
				const f = Math.min(b + panel.lines_drawn, this.bio.arr.length);
				for (let i = b; i < f; i++) {
					const item = this.bio.arr[i];
					const item_y = ui.font.main_h * i + panel.text.t - art_scrollbar.delta;
					if (item_y < panel.style.max_y) {
						if (!ppt.heading && this.bio.subHeading) {
							const iy = Math.round(item_y + ui.font.main_h / 2);
							if (!i && this.bio.loaded.ix != -1) gr.DrawLine(this.bio.ln.x1, iy, this.bio.ln.x2, iy, ui.style.l_w, ui.col.centerLine);
						}
						if (!item.subHeadWiki || i < f - 2) gr.GdiDrawText(item.text, item.font, item.col, panel.text.l, item_y + item.offset, panel.text.w, ui.font.main_h, this.l);
					}
				}
				if (ppt.sbarShow) art_scrollbar.draw(gr);
			}
			if (!ppt.artistView && this.rev.text && !this.lyricsDisplayed()) {
				const b = Math.max(Math.round(alb_scrollbar.delta / ui.font.main_h + 0.4), 0);
				const f = Math.min(b + panel.lines_drawn, this.rev.arr.length);
				const r = !panel.summary.show && (ui.stars == 2 || ui.stars == 1 && !ppt.hdBtnShow) && (ppt.ratingTextPos == 2 || this.rev.subHeading && !ppt.ratingTextPos) && !ppt.artistView && this.rev.arr.length > 1 && (!this.rev.subHeading ? (this.rev.loaded.am && this.rating.am != -1 || this.rev.loaded.lfm && this.rating.lfm != -1) : true);
				for (let i = b; i < f; i++) {
					const item = this.rev.arr[i];
					const item_y = ui.font.main_h * i + panel.text.t - alb_scrollbar.delta;
					if (item_y < panel.style.max_y) {
						if (r) switch (this.rev.subHeading) {
							case 0: {
								const rating = this.rev.loaded.am ? this.rating.am : this.rating.lfm;
								if (i == 0 && rating >= 0)
									gr.DrawImage(but.rating.images[rating], panel.text.l + gr.CalcTextWidth((this.rev.loaded.am ? ppt.allmusic_name : ppt.lastfm_name) + ':  ', ui.font.main), item_y + this.d.ry + item.offset, but.rating.w1 / 2, but.rating.h1 / 2, 0, 0, but.rating.w1, but.rating.h1, 0, 255);
								break;
							}
							case 1:
								if (!i) {
									if (this.rev.loaded.am && this.rating.am >= 0) {
										gr.DrawImage(but.rating.images[this.rating.am], this.d.ax, item_y + this.d.ry + item.offset, but.rating.w1 / 2, but.rating.h1 / 2, 0, 0, but.rating.w1, but.rating.h1, 0, 255);
									}
									if (this.rev.loaded.lfm && this.rating.lfm >= 0) {
										gr.DrawImage(but.rating.images[this.rating.lfm], this.d.lx, item_y + this.d.ry + item.offset, but.rating.w1 / 2, but.rating.h1 / 2, 0, 0, but.rating.w1, but.rating.h1, 0, 255);
									}
								}
								break;
						}
						if (!ppt.heading && this.rev.subHeading) {
							const iy = Math.round(item_y + ui.font.main_h / 2);
								if (!i && this.rev.loaded.ix != -1) gr.DrawLine(this.rev.ln.x1, iy, this.rev.ln.x2, iy, ui.style.l_w, ui.col.centerLine);
						}
						if (item.song) {
							if (!ppt.heading && !i) {
								const iy = Math.round(item_y + ui.font.main_h / 2);
								const x1 = panel.text.l + gr.CalcTextWidth(item.text + ' ', ui.font.subHeadTrack);
								gr.DrawLine(x1, iy, Math.max(x1, panel.text.l + panel.text.w), iy, ui.style.l_w, ui.col.centerLine);
							}
						}
						if (!item.subHeadWiki || i < f - 2) gr.GdiDrawText(item.text, item.font, item.col, panel.text.l, item_y + item.offset, panel.text.w, ui.font.main_h, this.l);
					}
				}
				if (ppt.sbarShow) alb_scrollbar.draw(gr);
			}
		}
	}

	expandLists(type, n) {
		const en = cfg.language == 'EN' || cfg.languageFallback;
		let items = [];
		switch (type) {
			case 'amBio':
				items = ['Genre: ', 'Group Members: '];
				break;
			case 'lfmBio': {
				const members = 'Members: |Mitglieder: |Miembros: |Membres: |Componenti: |\\u30e1\\u30f3\\u30d0\\u30fc: |Cz\\u0142onkowie: |Membros: |\\u0423\\u0447\\u0430\\u0441\\u0442\\u043d\\u0438\\u043a\\u0438: |Medlemmar: |\\u00dcyeler: |\\u6210\\u5458: ';
				const topTags = 'Top Tags: ';
				const topTracks = 'Top Tracks: |Top-Titel: |Temas m\\u00e1s escuchados: |Top titres: |Brani pi\\u00f9 ascoltati: |\\u4eba\\u6c17\\u30c8\\u30e9\\u30c3\\u30af: |Najpopularniejsze utwory: |Faixas principais: |\\u041b\\u0443\\u0447\\u0448\\u0438\\u0435 \\u043a\\u043e\\u043c\\u043f\\u043e\\u0437\\u0438\\u0446\\u0438\\u0438: |Toppl\\u00e5tar: |Pop\\u00fcler Par\\u00e7alar: |\\u6700\\u4f73\\u5355\\u66f2: ';
				items = [members, panel.similarArtistsKey, panel.topAlbumsKey, topTracks];
				if (!panel.summary.genre) items.unshift(topTags);
				break;
			}
			case 'amRev':
				items = ['Album Moods: ', 'Album Themes: ', 'Composers: ', 'Track Moods: ', 'Track Themes: '];
				if (this.rev.amAlb || !panel.summary.genre) items.unshift('Track Genres: ');
				break;
			case 'lfmRev':
				items = ['Top Tags: '];
				if (this.rev.lfmAlb || !panel.summary.genre) items.unshift('Track Tags: ');
				break;
			case 'wikiBio':
				items = ['Genre: '];
				break;
			case 'wikiRev':
				items = ['Album Genres: ', 'Composers: '];
				if (this.rev.wikiAlb || !panel.summary.genre) items.unshift('Track Genres: ');
				break;
		}

		items.forEach(v => {
			let w = tag.getTag(n, v);
			let li = w.tag;
			if (li) {
				let list = w.label + '\r\n';
				li.forEach((v, i, arr) => {
					let nm = (en ? (i + 1) + '. ' : '\u2022 ') + v;
					$.gr(1, 1, false, g => {
						if (g.CalcTextWidth(nm, ui.font.main) > panel.text.w) {
							nm = g.EstimateLineWrap(nm, ui.font.main, panel.text.w - g.CalcTextWidth('... ', ui.font.main))[0] + '...';
						}
					});
					list += nm;
					if (i < arr.length - 1) list += '\r\n'
				});
				let toBeReplaced = n.substring(w.ix);
				toBeReplaced = toBeReplaced.split('\n')[0];
				n = n.replace(RegExp($.regexEscape(toBeReplaced)), list);
			}
		});
		return n;
	}

	findFile(v, n) {
		const type = /_\.(lrc|txt)$/.test(v.pth) ? 0 : /\.(lrc|txt)$/.test(v.pth) ? 1 : 2;
		let pth = '';
		switch (type) {
			case 0: pth = v.pth.replace(/_\.(lrc|txt)$/, '.$1'); break;
			case 1: pth = v.pth.replace(/\.(lrc|txt)$/, '_.$1'); break;
		}
		let pths = !v.lyrics ? [v.pth] : [v.pth, pth];
		return pths.some(w => {
			this[n].readerItem = panel.cleanPth(w, false, !v.lyrics ? '' : 'lyr').slice(0, -1);
			return $.file(this[n].readerItem);
		});
	}

	formatList(text, s, sub, n, limit, lines, prefix, suffix) {
		if (sub[n]) {
			sub[n] = sub[n].replace(RegExp(s[n].key), '').replace(/, /g, ' \u2219 ');
			if (sub[n]) {
				if (prefix) {
					sub[n] = s[n].key.replace(/(Album\s|Track\s)Moods: /g, 'Moods: ').replace(/Group Members: /g, 'Members: ') + sub[n];
				}
				const line1 = this.getLine(sub[n], limit, suffix);
				let line2 = '';
				if (lines == 2) {
					line2 = sub[n].replace(line1, '');
					line2 = this.getLine(line2, limit, suffix);
				}
				sub[n] = line1 + (line2 ? '\r\n' + line2 : '');
				if (sub[n]) sub[n] += '\r\n';
			}
		}
		return {text: text, sub: sub[n]};
	}

	formatListeners(sub, i) {
		return sub[i].replace(/^Last(\.|-)fm:.*?;/g, '').split('|')[0].trim().replace(/\s/g, ': ');
	}

	formatText(type, text, s0 = {}, s1 = {}, s2 = {}, s3 = {}, s4 = {}, s5 = {}, s6 = {}, singleGenre) {
		if (!text) return text;
		const s = [s0, s1, s2, s3, s4, s5, s6];
		const sub = ['', '', '', '', '', '', '', ''];
		let str = '';
		if (panel.summary.show) {
			let m = '';
			for (let i = 0; i < s.length; i++) {
				if (!s[i].key && !s[i].str) continue;
					if (s[i].key) {
						m = tag.getTag(text, s[i].key, true);
						if (m.tag) {
							sub[i] = m.label + m.tag;
							text = text.replace(RegExp($.regexEscape(sub[i])), '');
						}
					} else if (s[i].str) {
						sub[i] = s[i].str;
					}
					sub[i] = this.checkAbb(sub[i]);
					if (s[i].list) {
						const item = this.formatList(text, s, sub, i, s[i].limit, s[i].lines, s[i].prefix, s[i].suffix);
						sub[i] = item.sub;
						text = item.text;
					}
			}
			if (type == 'amBio') {
				const sb = sub[2].split(' in ');
				if (!panel.summary.locale && sb[0]) sub[2] = sb[0];
				if (!panel.summary.date && sb[1]) {
					const prefix = sub[2].split(': ')[0];
					sub[2] = `${prefix} in: ${sb[1]}`;
				}
				if (panel.summary.popLatest && !sub[1]) sub[4] = this.checkNewLine(sub, 4);
			}

			if (type == 'lfmBio' && sub[5]) {
				sub[5] = this.formatListeners(sub, 5)
			}

			if (type == 'lfmRev' && sub[3]) {
				sub[3] = this.formatListeners(sub, 3);
				sub[3] = this.checkNewLine(sub, 3);
			}

			if (type == 'wikiRev' && sub[3]) {
				sub[3] = sub[3].replace(/^Duration:\s/g, 'Length: ');
				if (this.rev.wikiAlb) sub[3] = this.checkNewLine(sub, 3);
			}
			
			if (sub[6]) { // 6 has extra handling: reserved for popular now or latest release
				sub[6] = sub[6].split(';')[0].trim();
				const sub6 = $.regexEscape(sub[6]);
				text = text.replace(RegExp(sub6 + '; |' + sub6), '');
			}

			sub[6] = !panel.summary.other ? this.checkStr(sub, 6) : this.checkNewLine(sub, 6);

			str = sub[1];
			for (let i = 2; i < 7; i++) {
				str = str && sub[i] ? str + (!sub[i].startsWith('\r\n') ? '  |  ' : '') + sub[i] : str || sub[i];
			}
		}
		text = ppt.expandLists ? this.expandLists(type, text) : text.replace(/\u200b/g, '');
	
		switch (type) {
			case 'amBio': text = text.replace('Genre: ', 'Genres: '); break;
			case 'amRev':  text = text.replace(/(Album|Track)\s(Genre|Mood|Theme)(s|):\s/g, '$2$3: '); break;
			case 'lfmBio': if (cfg.lang.ix > 3) text = text.replace('Top Tags: ', this.topTags[cfg.lang.ix] + ': '); break;
			case 'lfmRev':
				if (cfg.lang.ix > 3) text = text.replace('Top Tags: ', this.topTags[cfg.lang.ix] + ': ');
				text = text.replace('Track Tags: ', !cfg.lang.ix ? 'Top Tags: ' : this.topTags[cfg.lang.ix] + ': ');
				break;
			case 'wikiBio': if (!singleGenre) text = text.replace('Genre: ', 'Genres: '); break;
			case 'wikiRev': text = text.replace(/Album\sGenres:\s/, singleGenre ? 'Genre: ' : 'Genres: ').replace(/Track\sGenre/, 'Genre').replace(/Track\sGenre/, 'Genre').replace(/Duration:\s/g, 'Length: '); break;
		}
		
		if (panel.summary.show) {
			if (str) {
				str = str.trim();
				str += '\r\n';
			}
			const summary = sub[0] + (type != 'amBio' ? str : str) + (sub[0] || str ? '\r\n' : '');
			text = summary + '\u00a6End\u00a6\r\n' + text.trim();
		}
		return text;
	}

	getBornStr(source) {
		const bi = tag.getTag(source, this.bio.bornIn, true);
		const bin = bi.tag;
		if (!panel.summary.date) {
			if (panel.summary.locale) {
				let str = '';
				if (bin) {
					const count = bin.split(',').length - 1;
					const bornIn = count > 2 ? bin.replace(/,[^,]+,/, ',') : bin;
					str = bi.label + bornIn;
					source = source.replace(RegExp($.regexEscape(str)), '');
				}
				return {bornStr: str, source: source};
			}
			return {bornStr: '', source: source};
		}
		const b = tag.getTag(source, this.bio.born, true);
		const bn = b.tag;
		const count = bin.split(',').length - 1;
		const bornIn = count > 2 ? bin.replace(/,[^,]+,/, ',') : bin;
		let bornStr = '';
		let born = '';
		if (bn && bornIn) {
			let age = bn.match(/\s\(.*?\)/);
			age = age ? age[0] : '';
			born = bn.replace(age, '')
			bornStr = b.label + born + (panel.summary.locale  ? ' \u2219 ' + bornIn : '') + (age ? ' \u2219' + $.titlecase(age.replace(/[()]/g, '')) : '');
			source = source.replace(RegExp($.regexEscape(b.label + bn)), '');
			source = source.replace(RegExp($.regexEscape(bi.label + bin)), '');
		}
		return {bornStr: bornStr, source: source}
	}

	getExt(fn) {
		return fn.slice((fn.lastIndexOf('.') - 1 >>> 0) + 2); // more robust than SplitFilePath	
	}

	getFlag(artist, n) {
		if (ppt[`${n}FlagShow`]) {
			let codes = $.jsonParse(this.countryCodes, {}, 'file');
			const code = (codes[artist.toLowerCase()] || '').slice(0, 2);
			const path = `${my_utils.packageInfo.Directories.Assets}/images/flags/${code}.png`;
			if ($.file(path)) {
				if (code && this[n].flagCode != code) {
					this[n].flag = my_utils.getFlagAsset(`${code}.png`);
					this[n].flagCode = code;
				}
				return;
			}
		}
		this[n].flag = null;
		this[n].flagCode = '';
	}

	getFoundedIn(source) {
		if (!panel.summary.locale) return {foundedIn: '', source: source}
		const f = tag.getTag(source, this.bio.foundedIn, true);
		const loc = f.tag;
		const count = loc.split(',').length - 1;
		let foundedIn = count > 2 ? loc.replace(/,[^,]+,/, ',') : loc;
		if (foundedIn) foundedIn = f.label + foundedIn;
		if (f.tag) source = source.replace(RegExp($.regexEscape(f.label + f.tag)), '');
		return {foundedIn: foundedIn, source: source}
	}

	getItem(p_calc, art_ix, alb_ix, force) {
		if (ppt.img_only) return;
		switch (true) {
			case ppt.artistView: {
				this.cur_artist = this.artist;
				this.artist = art_ix < panel.art.list.length ? panel.art.list[art_ix].name : name.artist(panel.id.focus);
				const new_artist = this.artist != this.cur_artist;
				if (new_artist) {
					this.artistFlush();
					this.bio.lookUp = true;
				}
				this.getText(p_calc);
				this.get = 0;
				break;
			}
			case !ppt.artistView: {
				this.id.curAlb = this.id.alb;
				this.artist = alb_ix < panel.alb.list.length ? panel.alb.list[alb_ix].artist : name.albumArtist(panel.id.focus);
				const alb = alb_ix < panel.alb.list.length ? panel.alb.list[alb_ix].album : name.album(panel.id.focus);
				this.id.alb = this.artist + alb;
				const new_album = this.id.alb != this.id.curAlb;
				if (new_album || force) {
					this.album = alb;
					this.albumartist = this.artist;
					this.albumFlush();
					this.rev.lookUp = true;
				}
				this.getText(p_calc);
				this.get = 0;
				break;
			}
		}
	}

	getLine(sub, limit, suffix) {
		if (limit) {
			const p = this.getPosition(sub, '\u2219', limit);
			if (p != -1) sub = sub.slice(0, p).trim();
		}
		let w = 0;
		$.gr(1, 1, false, g => w = g.CalcTextWidth(sub, ui.font.main));
		let end = '';
		while (w > panel.text.w && sub.includes('\u2219')) {
			const f = sub.lastIndexOf('\u2219'); // limit genres to 1 line
			if (f != -1) sub = sub.slice(0, f).trim();
			$.gr(1, 1, false, g => w = g.CalcTextWidth(`${sub} ...`, ui.font.main));
			end = ' ...';
		}
		return sub + (suffix ? end : '');
	}

	getPosition(string, subString, index) {
		return string.split(subString, index).join(subString).length;
	}

	getScrollPos() {
		let v;
		switch (ppt.artistView) {
			case true:
				v = this.artist + '-' + this.bio.loaded.ix + '-' + (!this.bio.loaded.txt ? '' : this.bio.readerItem);
				if (!this.bio.scrollPos[v]) return art_scrollbar.setScroll(0);
				if (this.bio.scrollPos[v].text === this.bio.arr.length + '-' + this.bio.text) art_scrollbar.setScroll(this.bio.scrollPos[v].scroll || 0);
				else if (ppt.showFilmStrip && ppt.autoFilm) break;
				else {
					this.bio.scrollPos[v].scroll = 0;
					this.bio.scrollPos[v].text = '';
				}
				break;
			case false: {
				v = (panel.style.inclTrackRev != 2 ? this.albumartist + this.album + this.composition + '-' : '') + '-' + this.rev.loaded.ix + '-' + ppt.inclTrackRev + (!this.rev.loaded.txt ? '' : this.rev.readerItem);
				if (!this.rev.scrollPos[v]) return alb_scrollbar.setScroll(0);
				let match = false;
				if (panel.style.inclTrackRev != 1) {
					if (this.rev.scrollPos[v].text === ui.font.main.Size + '-' + panel.text.w + '-' + this.rev.text) match = true;
				} else {
					const tx1 = (ui.font.main.Size + '-' + panel.text.w).toString();
					const tx2 = this.rev.loaded.am ? $.strip(this.rev.amAlb || this.rev.am) : this.rev.loaded.lfm ? $.strip(this.rev.lfmAlb || this.rev.lfm) : $.strip(this.rev.wikiAlb || this.rev.wiki);
					if (this.rev.scrollPos[v].text.startsWith(tx1) && (tx2 && this.rev.scrollPos[v].text.includes(tx2))) match = true;
				}
				if (match) {
					const set_scroll = panel.style.inclTrackRev != 1 ? this.rev.scrollPos[v].scroll : Math.min(this.rev.scrollPos[v].scroll, alb_scrollbar.max_scroll);
					alb_scrollbar.setScroll(set_scroll || 0);
				} else if (ppt.showFilmStrip && ppt.autoFilm) break;
				else {
					this.rev.scrollPos[v].scroll = 0;
					this.rev.scrollPos[v].text = '';
				}
				break;
			}
		}
	}

	getText(p_calc, update) {
		if (ppt.img_only) return;
		const a = $.clean(this.artist);
		const n = ppt.artistView ? 'bio' : 'rev';
		this.newText = false;
		if (!panel.lock) {
			this.trackartist = name.artist(panel.id.focus);
			this.track = name.title(panel.id.focus);
		}
		if (ppt.txtReaderEnable) this.txtReader();
		if (this[n].reader) this.txtReader();
		switch (true) {
			case ppt.artistView:
				if (!a) break;
				if (!this.done.amBio || update) {
					this.done.amBio = true;
					this.amBio(a);
				}
				if (!this.done.lfmBio || update) {
					this.done.lfmBio = true;
					this.lfmBio(a);
				}
				if (!this.done.wikiBio || update) {
					this.done.wikiBio = true;
					this.wikiBio(a);
				}
				this.getFlag(this.artist, n);
				break;
			case !ppt.artistView: {
				const aa = $.clean(this.albumartist);
				const c = ppt.classicalMusicMode ? $.clean(this.composition) : '';
				const l = $.clean(this.album);
				if (!aa || !l && !panel.style.inclTrackRev && !c) {
					this.rating.am = -1;
					this.rating.lfm = -1;
					but.check();
					break;
				}
				if (panel.isRadio(panel.id.focus) && !panel.style.inclTrackRev && !panel.alb.ix) break;
					if (!this.done.amRev || update) {
						this.done.amRev = true;
						this.amRev(a, aa, l, c);
					}
					if (!this.done.lfmRev || update) {
						this.done.lfmRev = true;
						this.lfmRev(a, aa, l);
					}
					if (!this.done.wikiRev || update) {
						this.done.wikiRev = true;
						this.wikiRev(a, aa, l, c);
					}
			}
			this.getFlag(this.albumartist, n);
			break;
		}
		if (!update || this.newText) {
			this.rev.text = '';
			this.bio.text = '';
			const types = ['am', 'lfm', 'wiki', 'txt'];
			const types_1 = this.moveArrayItem(types, 0, 3); // first to last
			const types_2 = this.moveArrayItem(types_1, 0, 3);
			const types_3 = this.moveArrayItem(types_2, 0, 3);
			const source = ppt.artistView ? ppt.sourcebio : ppt.sourcerev;

			const type = types[source];
			if (this[n].source[type]) {
				if (ppt.sourceHeading && this[n][type] && type == 'lfm') this[n][type] = this[n][type].replace(/Last\.fm: /g, '');

				this[n].loaded = {
					am: false,
					lfm: false,
					wiki: false,
					txt: false,
					ix: -1
				}

				if (ppt.artistView ? !ppt.lockBio : !ppt.lockRev) {
					[type, types_1[source], types_2[source], types_3[source]].some(v => {
						if (this[n][v]) {
							this[n].text = this[n][v]; // get target else fallback source
							return this[n].loaded[v] = true;
						}
					});
				} else {
					this[n].text = this[n][type]; // locked
					if (this[n][type]) this[n].loaded[type] = true;
				}

				Object.values(this[n].loaded).some((v, i) => {
					if (v === true) {
						this[n].loaded.ix = i;
						return true;
					}
				});
				if (this[n].loaded.ix == -1) {
					this[n].loaded.ix = source;
				}
				if (!this[n].text && !ppt.img_only) this[n].text = !ppt.heading ? this[n].fallbackText[1] : this[n].fallbackText[0];
				if (ppt.sourceHeading) {
					this[n].text = this[n].subhead[types[this[n].loaded.ix]][ppt.heading ? 0 : 1] + '\r\n\r\n' + this[n].text;
				}
			}

			if (panel.id.lyricsSource) lyrics.clear();
			timer.clear(timer.lyrics);

			if (panel.id.lyricsSource) {
				if (this[n].loaded.txt && this.reader.lyrics) {
					lyrics.load(this[n].txt);
				} else if (fb.IsPlaying && this.artist && (!this.reader.lyrics3Saved || !this.reader.openLyricsSaved) && panel.id.lyricsSource) {
					if (ppt.syncTxtReaderLyrics) this.lyricsSave();
				}
			}

			this[n].subHeading = !ppt.sourceHeading || !this[n].text ? 0 : 1;

			if (!ppt.heading && this[n].subHeading && this[n].loaded.ix != -1) {
				const subHeadingWidth = this[n][['am_w', 'lfm_w', 'wiki_w', 'txt_w'][this[n].loaded.ix]].nohd + this.bio.sp;
				this[n].ln.x1 = panel.text.l + subHeadingWidth;
				this[n].ln.x2 = Math.max(this[n].ln.x1, panel.text.l + panel.text.w);
			}

			img.setCrop(true);
			if (this.bio.text != this.bio.cur || p_calc && p_calc !== 2) { 
				this.bio.cur = this.bio.text;
				this.artCalc();
			}
			if (this.rev.text != this.rev.cur || p_calc && p_calc !== 1) {
				this.rev.cur = this.rev.text;
				this.albCalc();
			}
			if (ppt.text_only && !ui.style.isBlur || panel.alb.ix && panel.style.inclTrackRev) this.paint();
		}
		if (!ppt.heading) {
			this.newText = false;
			return;
		}
		if (panel.lock && !this.newText) {
			if (this.curHeadingID == this.headingID()) {
				this.newText = false;
				return;
			} else this.curHeadingID = this.headingID();
		}
		
		this.newText = false;
		if (ppt.artistView) this.heading = ui.show.headingText ? this.tf(!this.bio.reader || !this.bio.loaded.txt ? ppt.bioHeading : this.bio.readerHeading, ppt.artistView): '';
		else {
			if (ppt.classicalMusicMode) panel.getList();
			this.heading = ui.show.headingText ?
			(
				panel.style.inclTrackRev && (this.rev.loaded.lfm && this.rev.lfmTrackHeading || this.rev.loaded.am && this.rev.amTrackHeading || this.rev.loaded.wiki && this.rev.wikiTrackHeading) ?
				this.tf(ppt.trkHeading, ppt.artistView, true) : 
				this.tf(!this.rev.reader || !this.rev.loaded.txt ? (panel.style.inclTrackRev == 2 && !this.isCompositionLoaded() ? ppt.trkHeading : ppt.revHeading) : this.rev.readerHeading, ppt.artistView)
			) : '';
		}
		if (panel.lock) this.curHeadingID = this.headingID();
	}

	getTxtFallback() {
		if (this.scrollbar_type().draw_timer) return;
		if (!panel.updateNeeded()) return;
		if (!this.get && !this.textUpdate) return;
		this.na = '';
		if (this.textUpdate) this.updText();
		if (this.get) {
			this.albumReset();
			this.artistReset();
			if (this.calc) this.calc = ppt.artistView ? 1 : 2;
			this.getText(this.calc);
			if (this.get == 2) panel.focusServer();
			this.calc = false;
			this.get = 0;
		}
	}

	getSubHeadWidths(txtReaderOnly) {
		$.gr(1, 1, false, g => {
			if (!txtReaderOnly) {
				const items = ['am_w', 'lfm_w', 'wiki_w'];

				let subHead = [this.rev.subhead.am[0] + ' ', this.rev.subhead.lfm[0] + ' ', this.rev.subhead.wiki[0] + ' '];
				items.forEach((v, i) => this.rev[v].hd = Math.max(g.CalcTextWidth(subHead[i], ui.font.subHeadSource), 1));

				subHead = [this.bio.subhead.am[1] + ' ', this.bio.subhead.lfm[1] + ' ', this.bio.subhead.wiki[1] + ' '];
				items.forEach((v, i) => this.bio[v].nohd = Math.max(g.CalcTextWidth(subHead[i], ui.font.subHeadSource), 1));

				subHead = [this.rev.subhead.am[1] + ' ', this.rev.subhead.lfm[1] + ' ', this.rev.subhead.wiki[1] + ' '];
				items.forEach((v, i) => this.rev[v].nohd = Math.max(g.CalcTextWidth(subHead[i], ui.font.subHeadSource), 1));

				this.bio.sp = Math.max(g.CalcTextWidth(' ', ui.font.subHeadSource), 1);
			}
			this.bio.txt_w.hd = this.bio.txt_w.nohd = Math.max(g.CalcTextWidth((this.bio.subhead.txt[1] || '') + ' ', ui.font.subHeadSource), 1);
			this.rev.txt_w.hd = this.rev.txt_w.nohd = Math.max(g.CalcTextWidth((this.rev.subhead.txt[1] || '') + ' ', ui.font.subHeadSource), 1);
		});
	}

	grab() {
		this.textUpdate = 1;
		this.notifyTags();
		if (panel.block()) return;
		this.updText();
	}

	headingID() {
		return ppt.artistView + '-' + panel.art.ix + '-' + panel.alb.ix + '-' + ppt.sourcebio + '-' + ppt.sourcerev + '-' + panel.style.inclTrackRev;
	}

	isCompositionLoaded() {
		return !ppt.artistView && ppt.classicalMusicMode && (this.rev.loaded.am && !this.rev.amFallback || this.rev.loaded.wiki && !this.rev.wikiFallback) && !panel.alb.ix;
	}

	lfmBio(a) {
		const lBio = panel.getPth('bio', panel.id.focus, this.artist, '', '', cfg.supCache, a, '', '', 'foLfmBio', true).pth;
		if (!$.file(lBio)) return;
		this.mod.lfmBio = $.lastModified(lBio) || 0;
		if (this.mod.lfmBio == this.mod.curLfmBio) return;
		let bornStr = '';
		let foundedIn = '';
		this.bio.lfm = $.open(lBio).trim();
		if (!ppt.stats) {
			const f = this.bio.lfm.indexOf('Last.fm: ');
			if (f != -1) this.bio.lfm = this.bio.lfm.slice(0, f).trim();
		}
		this.bio.lfm = this.bio.lfm.replace(/\s\u200b\|[\d.,\s]*?;/g, ';').replace(/\u200b\|[\d.,\s]*?$/gm, '').replace(/, Jr\./g, ' Jr.');
		const b = this.getBornStr(this.bio.lfm);
		bornStr = b.bornStr;
		this.bio.lfm = b.source;
		const o = this.getFoundedIn(this.bio.lfm);
		foundedIn = o.foundedIn;
		this.bio.lfm = o.source;
		this.bio.lfm = this.formatText('lfmBio', this.bio.lfm, {limit: 6, list: true, key: panel.summary.genre ? 'Top Tags: ' : ''}, {str: foundedIn}, {str: bornStr}, panel.summary.date ? {key: this.bio.died} : {}, panel.summary.date ? {key: this.bio.yrsActive} : {}, !panel.summary.other ? {} : {key: 'Last.fm: '}, panel.summary.popLatest ? {key: this.bio.popNow} : '').replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		this.newText = true;
		this.mod.curLfmBio = this.mod.lfmBio;
	}

	lfmRev(a, aa, l) {
		let lfm_tr_mod = '';
		let rat = '';
		let trackLength = '';
		let trackRev = '';
		let trk = '';
		const lRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foLfmRev', true).pth;
		if (!$.file(lRev)) {
			this.rating.lfm = -1;
			but.check();
			if (!panel.style.inclTrackRev) {
				this.rev.lfmAlb = '';
				return;
			}
		}
		if (panel.style.inclTrackRev) {
			trk = this.track.toLowerCase();
			trackRev = $.jsonParse(panel.getPth('track', panel.id.focus, this.trackartist, 'Track Reviews', '', '', $.clean(this.trackartist), '', 'Track Reviews', 'foLfmRev', true).pth, false, 'file');
			if (trackRev[trk] && trackRev[trk].update) lfm_tr_mod = trackRev[trk].update;
		}
		this.mod.lfmRev = ($.lastModified(lRev) || 0) + (lfm_tr_mod || 0);
		if (this.mod.lfmRev == this.mod.curLfmRev) return;
		this.rev.lfmAlb = '';
		if (panel.style.inclTrackRev != 2) this.rev.lfmAlb = $.open(lRev).trim();
		this.rev.lfmAlb = this.rev.lfmAlb.replace(/\s\u200b\|[\d.,\s]*?;/g, ';').replace(/\u200b\|[\d.,\s]*?$/gm, '');
		this.newText = true;
		this.mod.curLfmRev = this.mod.lfmRev;
		this.rating.lfm = -1;
		if (panel.style.inclTrackRev != 2) {
			if (ppt.lfmRating) {
				const b = this.rev.lfmAlb.indexOf('Rating: ');
				if (b != -1) {
					this.rating.lfm = this.rev.lfmAlb.substring(b).replace(/\D/g, '');
					this.rating.lfm = Math.min(((Math.floor(0.1111 * this.rating.lfm + 0.3333) / 2)), 5);
					if (ui.stars == 1 && ppt.hdBtnShow) this.rating.lfm *= 2;
					if ((ui.stars == 2 || ui.stars == 1 && !ppt.hdBtnShow) && this.rating.lfm != -1) {
						if (ppt.ratingTextPos == 2 || ppt.sourceHeading && !ppt.ratingTextPos) {
							this.rating.lfm *= 2;
							if (!panel.summary.show) this.rev.lfmAlb = (!ppt.sourceHeading ? ppt.lastfm_name + ':\r\n\r\n' : '') + this.rev.lfmAlb;
							else rat = ppt.lastfm_name + ': ' + this.rating.lfm;
						} else {
							if (!panel.summary.show) this.rev.lfmAlb = '>> ' + ppt.lastfm_name + ': ' + this.rating.lfm + ' <<  ' + (/^Top Tags: /.test(this.rev.lfmAlb) ? '\r\n\r\n' : '') + this.rev.lfmAlb;
							else rat = ppt.lastfm_name + ': ' + this.rating.lfm;
						}
					}
				}
			}
			this.rev.lfmAlb = ppt.score ? this.rev.lfmAlb.replace('Rating: ', '') : this.rev.lfmAlb.replace(/^Rating: .*$/m, '').trim();
		}

		this.rev.lfm = this.rev.lfmAlb;
		let needTrackSubHeading = false;
		let releases = '';
		if (panel.style.inclTrackRev) {
			if (trackRev && trackRev[trk]) {
				const o = trackRev[trk];
				let wiki = '';
				releases = $.getProp(o, 'releases', '');
				if (!panel.summary.date) wiki = this.add([releases], wiki);
				releases = releases.replace(/\.$/, '');
				wiki = this.add([$.getProp(o, 'wiki', '')], wiki);
				const showGenres = !ppt.albTrackAuto || !this.rev.lfmAlb;
				let tags = '';
				if (showGenres) {
					tags = $.getProp(o, 'tags', []).join('\u200b, ');
					if (tags) tags = `Track Tags: ${tags}`;
				}
				const length = $.getProp(o, 'length', '');
				if (length) {
					const ix = cfg.lang.arr.indexOf(o.lang);
					const label = this.rev.length[ix];
					trackLength = label + length;
				}
				const stats = $.getProp(o, 'stats', '');
				wiki = this.add([tags, trackLength, stats], wiki);
				if (wiki) {
					if (ppt.trackHeading == 1 && (this.rev.lfmAlb || !ppt.heading) || ppt.trackHeading == 2) {
						this.rev.lfmTrackHeading = false;
						if (this.rev.lfmAlb) {
							trackRev = '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + wiki;
						} else {
							trackRev = wiki;
							needTrackSubHeading = true;
						}
					} else {
						this.rev.lfmTrackHeading = true;
						trackRev = wiki;
					}
					if (panel.summary.other) trackRev = trackRev.replace(/^Last\.fm:\s/gm, 'Last-fm: ');
					this.rev.lfm = this.add([trackRev], this.rev.lfmAlb);
				} else {	
					this.rev.lfmTrackHeading = panel.style.inclTrackRev == 2;
				}
			} else {
				this.rev.lfmTrackHeading = panel.style.inclTrackRev == 2;
			}
		}
		if (!ppt.stats) {
			this.rev.lfm = this.rev.lfm.replace(/^Last\.fm: .*$(\n)?/gm, '').trim();
		}

		this.rev.lfm = this.formatText('lfmRev', this.rev.lfm, panel.summary.genre ? {limit: 6, list: true, key: this.rev.lfmAlb ? 'Top Tags: ' : 'Track Tags: '} : {}, panel.summary.date ? {key: this.rev.releaseDate} : {}, !panel.summary.date || this.rev.lfmAlb ? {} : {str: releases}, !panel.summary.other ? {} : {key: this.rev.lfmAlb ? 'Last.fm: ' : 'Last-fm: '}, {str: rat});
		if (panel.summary.show || !ppt.stats) this.rev.lfm = this.rev.lfm.replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		if (needTrackSubHeading) this.rev.lfm = '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + this.rev.lfm;
		if (!this.rev.lfm) but.check();
	}

	loadLyric() {
		setTimeout(() => {this.getText();}, 1000);
		timer.clear(timer.lyrics);
	}

	loadReader() {
		this.bio.reader = false;
		for (let i = 0; i < 4; i++) {
			if (ppt.txtReaderEnable && ppt[`pthTxtReader${i}`]) {
				this.bio.reader = true;
				break
			}
		}
		this.rev.reader = false;
		for (let i = 4; i < 8; i++) {
			if (ppt.txtReaderEnable && ppt[`pthTxtReader${i}`]) {
				this.rev.reader = true;
				break
			}
		}
		ppt.sourcebio = $.clamp(ppt.sourcebio, 0 , this.bio.reader ? 3 : 2);
		ppt.sourcerev = $.clamp(ppt.sourcerev, 0 , this.rev.reader ? 3 : 2);
		this.bio.readerItem = '';
		this.rev.readerItem = '';
		this.reader.items = [];
		for (let i = 0; i < 8; i++) {
			const item = ppt[`pthTxtReader${i}`];
			const ext = this.getExt(item);
			this.reader.items.push({
				view: i < 3 ? 'bio' : 'rev',
				lyrics: ppt[`lyricsTxtReader${i}`],
				name: ppt[`nmTxtReader${i}`],
				pth: cfg.substituteTf(item),
				tag: ext.length == 0 || ext.length > 4,
			});
		}
		for (let i = 0; i < 8; i++) {
			this.reader.items[i].heading = this.reader.items[i].lyrics ? ppt.lyricHeading.replace(/^>\s/, '') : this.reader.items[i].view == 'bio' ? ppt.bioHeading : ppt.revHeading;
		}
	}

	logScrollPos(n) {
		let keys = [];
		let v;
		n = n == 'rev' ? false : ppt.artistView;
		switch (n) {
			case true:
				keys = Object.keys(this.bio.scrollPos);
				if (keys.length > 70) delete this.bio.scrollPos[keys[0]];
				v = this.artist + '-' + this.bio.loaded.ix + '-' + (!this.bio.loaded.txt ? '' : this.bio.readerItem);
				this.bio.scrollPos[v] = {};
				this.bio.scrollPos[v].scroll = art_scrollbar.scroll;
				this.bio.scrollPos[v].text = this.bio.arr.length + '-' + this.bio.text;
				break;
			case false:
				keys = Object.keys(this.rev.scrollPos);
				if (keys.length > 70) delete this.rev.scrollPos[keys[0]];
				v = (panel.style.inclTrackRev != 2 ? this.albumartist + this.album + this.composition + '-' : '') + '-' + this.rev.loaded.ix + '-' + ppt.inclTrackRev + (!this.rev.loaded.txt ? '' : this.rev.readerItem);
				this.rev.scrollPos[v] = {};
				this.rev.scrollPos[v].scroll = alb_scrollbar.scroll;
				this.rev.scrollPos[v].text = ui.font.main.Size + '-' + panel.text.w + '-' + (panel.style.inclTrackRev != 1 ? this.rev.text : this.rev.loaded.am ? $.strip((this.rev.amAlb || this.rev.am)) : this.rev.loaded.lfm ? $.strip((this.rev.lfmAlb || this.rev.lfm)): $.strip((this.rev.wikiAlb || this.rev.wiki)));
				break;
		}
	}

	lyricExists() {
		return this.reader.items.some(v => {
			if (v.lyrics) {
				if (v.tag) return $.eval('[$trim(' + v.pth + ')]', false);
				else return $.file(panel.cleanPth(v.pth, false, !v.lyrics ? '' : 'lyr').slice(0, -1));
			}
		});
	}
	
	lyricsDisplayed() {
		const n = ppt.artistView ? 'bio' : 'rev';
		return this[n].loaded.txt && this.reader.lyrics && !ppt.img_only;
	}

	lyricsSave() {
		if (!this.lyrics.lyrics3Installed && !this.lyrics.openLyricsInstalled) return;
		let counter = 0;
		timer.clear(timer.lyrics);
		timer.lyrics.id = setInterval(() => {
			if (this.lyrics.lyrics3Installed && !this.reader.lyrics3Saved) {
				if ($.eval('%lyric_exists%', false)) {
					fb.RunMainMenuCommand('View/Lyrics Show 3/Save');
					this.reader.lyrics3Saved = true;
					this.loadLyric();
				}
			}
			if (this.lyrics.openLyricsInstalled && !this.reader.openLyricsSaved) {
				if (this.lyricExists()) {
					this.reader.openLyricsSaved = true;
					this.loadLyric();
				}
			}
			counter++;
			if (counter == 30) timer.clear(timer.lyrics);
		}, 1000);
	}

	moveArrayItem(array, fromIndex, toIndex) {
		const arr = [...array];
		arr.splice(toIndex, 0, ...arr.splice(fromIndex, 1));
		return arr;
	}

	notifyTags() {
		if (!cfg.notifyTags) return;
		this.currentTrackTags();
	}

	on_playback_new_track(force) {
		if (panel.lock) panel.getList();
		this.notifyTags();
		if (!panel.updateNeeded() && !force) return;
		if (panel.block()) {
			this.get = 1;
			if (!panel.lock) panel.getList(true);
			this.logScrollPos();
			this.albumReset();
			this.artistReset();
		} else {
			if (!panel.lock) panel.getList(true);
			this.logScrollPos();
			this.albumReset();
			this.artistReset();
			this.na = '';
			this.getText(false);
			this.get = 0;
		}
	}

	on_size() {
		this.albumFlush();
		this.artistFlush()
		this.bio.scrollPos = {};
		this.rev.scrollPos = {};
		this.getText(false);
		panel.getList(true);
		but.refresh();
		this.notifyTags();
	}

	paint() {
		if (!this.repaint) return;
		if (!panel.style.showFilmStrip) window.Repaint();
		else window.RepaintRect(panel.filmStripSize.l, panel.filmStripSize.t, panel.w - panel.filmStripSize.l - panel.filmStripSize.r, panel.h - panel.filmStripSize.t - panel.filmStripSize.b);
	}

	refresh(n) {
		switch (n) {
			case 0:
				filmStrip.logScrollPos();
				filmStrip.setFilmStripSize();
				panel.setStyle();
				img.clearCache();
				this.albumFlush();
				this.artistFlush();
				this.rev.cur = '';
				this.bio.cur = '';
				this.getText(true);
				but.refresh();
				img.getImages();
				if (ppt.showFilmStrip && ppt.autoFilm) this.getScrollPos();
				but.setLookUpPos();
				break;
			case 1:
				ui.getFont();
				ui.calcText();
				panel.setStyle();
				ui.getColours();
				but.createStars();
				this.albumFlush();
				this.artistFlush();
				if (!ppt.img_only) img.clearCache();
				this.rev.cur = '';
				this.bio.cur = '';
				this.getText(true);
				but.refresh(true);
				img.getImages();
				break;
			case 2:
				if (panel.style.inclTrackRev == 1) this.logScrollPos();
				ui.calcText();
				panel.setStyle();
				if (!ppt.img_only) img.clearCache();
				this.rev.cur = '';
				this.bio.cur = '';
				this.albCalc();
				this.artCalc();
				img.getImages();
				if (ppt.text_only && !ui.style.isBlur) this.paint();
				break;
			case 3:
				if (panel.style.inclTrackRev == 1) ui.getColours();
				ui.getFont();
				panel.setStyle();
				if (!ppt.img_only) img.clearCache();
				this.albumFlush();
				this.getText(false);
				img.getImages();
				break;
			case 4:
				if (panel.style.inclTrackRev == 1) this.logScrollPos();
				ui.getColours();
				ui.getFont();
				panel.setStyle();
				if (!ppt.img_only) img.clearCache();
				this.albumFlush();
				this.artistFlush();
				this.rev.cur = '';
				this.bio.cur = '';
				this.getText(true);
				img.getImages();
				if (ppt.text_only && !ui.style.isBlur) this.paint();
				break;
			case 5:
				filmStrip.logScrollPos();
				panel.setStyle();
				this.albumFlush();
				this.artistFlush();
				img.clearCache();
				but.refresh();
				if (panel.stndItem()) {
					this.getText(false);
					img.getImages();
				} else {
					this.getItem(false, panel.art.ix, panel.alb.ix);
					img.getItem(panel.art.ix, panel.alb.ix);
				}
				if (ppt.artistView) {
					this.rev.cur = '';
					this.artCalc();
				} else {
					this.bio.cur = '';
					this.albCalc();
				}
				break;
		}
	}

	revPth(n) { 
		if (ppt.img_only) return ['', '', false, false];
		const field = n != 'Am' && n != 'Wiki' ? this.album : !ppt.classicalMusicMode || n == 'Am' && this.rev.amFallback || n == 'Wiki' && this.rev.wikiFallback || panel.alb.ix ? this.album : this.composition;
		return panel.getPth('rev', panel.id.focus, this.artist, field, '', cfg.supCache, $.clean(this.artist), $.clean(this.albumartist), $.clean(field), `fo${n}Rev`, false);
	}

	scrollbar_type() {
		return ppt.artistView ? art_scrollbar : alb_scrollbar;
	}

	stripTimestamps(n) {
		const enhancedTimestamps = /(\s*)<(\d{1,2}:|)\d{1,2}:\d{2}(>|\.\d{1,3}>)(\s*)/g;
		const timestamps = /(\s*)\[(\d{1,2}:|)\d{1,2}:\d{2}(]|\.\d{1,3}])(\s*)/g;
		return n.replace(timestamps, '$1$4').replace(enhancedTimestamps, '$1$4');
	}

	tf(n, artistView, trackreview) {
		if (!n) return '';
		if (panel.lock) n = n.replace(/%artist%|\$meta\(artist,0\)/g, '#\u00a6#\u00a6#%artist%#\u00a6#\u00a6#').replace(/%title%|\$meta\(title,0\)/g, '#!#!#%title%#!#!#');
		let a = $.tfEscape(artistView ? this.artist : (!trackreview ? (panel.alb.ix ? this.albumartist : this.artist) : this.trackartist));
		let aa = $.tfEscape(artistView ? (panel.art.ix ? this.artist : this.albumartist) : (!trackreview ? this.albumartist : this.trackartist));
		let composition = this.isCompositionLoaded();
		let l = composition ? $.tfEscape(this.composition.replace('Album Unknown', '')) : $.tfEscape(this.album.replace('Album Unknown', ''));
		let tr = $.tfEscape(this.track);
		if (composition) n = n.replace(/%bio_album%/gi, cfg.tf.composition);
		n = n.replace(/%lookup_item%/gi, panel.simTagTopLookUp() ? '$&#@!%path%#@!' : '$&');
		n = n.replace(/((\$if|\$and|\$or|\$not|\$xor)(|\d)\(|\[)[^$%]*%bio_artist%/gi, a ? '$&#@!%path%#@!' : '$&').replace(/%bio_artist%/gi, a).replace(/((\$if|\$and|\$or|\$not|\$xor)(|\d)\(|\[)[^$%]*%bio_albumartist%/gi, aa ? '$&#@!%path%#@!' : '$&').replace(/%bio_albumartist%/gi, aa).replace(/((\$if|\$and|\$or|\$not|\$xor)(|\d)\(|\[)[^$%]*%bio_album%/gi, l ? '$&#@!%path%#@!' : '$&').replace(/%bio_album%/gi, l).replace(/((\$if|\$and|\$or|\$not|\$xor)(|\d)\(|\[)[^$%]*%bio_title%/gi, tr ? '$&#@!%path%#@!' : '$&').replace(/%bio_title%/gi, tr);
		n = $.eval(n, panel.id.focus);
		if (panel.lock) n = n.replace(/#\u00a6#\u00a6#.*?#\u00a6#\u00a6#/g, this.trackartist).replace(/#!#!#.*?#!#!#/g, this.track);
		n = n.replace(/#@!.*?#@!/g, '') || 'No Selection';
		return n;
	}

	tidyWiki(n) {
		if (!this[n].loaded.wiki || !ppt.wikiStyle) return;
		const arr = this[n].arr;
		let i = arr.length;
		while (i--) {
			const v = arr[i];
			if (/^=+$/.test(v.text)) arr.splice(i, 1);
			else v.text = v.text.replace(/=/g, '').trim();
		}
	}

	trackPth(n) {
		if (ppt.img_only || ppt.artistView) return ['', '', false, false];
		return panel.getPth('track', panel.id.focus, this.artist, 'Track Reviews', '', '', $.clean(this.artist), '', 'Track Reviews', `fo${n}Rev`, false);
	}

	txtReader() {
		let found = -1;
		const n = ppt.artistView ? 'bio' : 'rev';
		this[n].readerTag = false;
		let nm = $.titlecase('textreader');
		this.bio.subhead.txt = [nm, nm];
		this.rev.subhead.txt = [nm, nm];
		this.reader.items.some((v, i) => {
			if (v.view == n) {
				if (v.tag) {
					this[n].readerItem = this.stripTimestamps($.eval('[$trim(' + v.pth + ')]', false)); // want timestamp removal??
					if (this[n].readerItem.length) {
						found = i;
						return true;
					}
				} else {
					if (this.findFile(v, n)) {
						found = i;
						return true;
					}
				}
			}
		});
		if (found == -1) {
			this.reader.lyrics = false;
			this[n].readerItem = '';
			this[n].txt = '';
			but.createStars();
			return;
		}
		this.reader.lyrics = this.reader.items[found].lyrics;
		nm = $.titlecase(this.reader.items[found].name);
		this[n].subhead.txt = [nm, nm];
		this[n].readerHeading = this.reader.items[found].heading;
		but.createStars();
		this.getSubHeadWidths(true);
		if (this.reader.items[found].tag) {
			this[n].readerTag = true;
			if (!this.reader.lyrics) {
				if (this[n].txt != this[n].readerItem) {
					this[n].txt = this[n].readerItem;
					this.newText = true;
				} 
			} else {
				let tFSplit = this[n].readerItem.split('\n');
				if (tFSplit.length === 1) {
					tFSplit = this[n].readerItem.split('\r');
				}
				if (!$.equal(this[n].txt, tFSplit)) {
						this[n].txt = tFSplit;
						this.newText = true;
				}
			}
			return;
		} else {
			let item = !this.reader.lyrics ? this.stripTimestamps($.open(this[n].readerItem)/*want REM ts*/).trim() : utils.ReadTextFile(this[n].readerItem, 65001); // autodetect of code page isn't perfect: utf8 generally seemed to give better results: if fails try autodetect
			if (this.reader.lyrics && item.includes('\ufffd')) item = $.open(this[n].readerItem); // \ufffd is replacement if decoder can't read the character; presence means 65001 codepage wrong: redo with autodetect of codepage
			if (this.reader.lyrics) item = item.split('\n');
			if (!this.reader.lyrics) {
					if (this[n].txt != item) {
					this[n].txt = item;
					this.newText = true;
				}	
			} else {
				if (!$.equal(this[n].txt, item)) {
					this[n].txt = item;
					this.newText = true;
				}
			}
		}
	}

	txtReaderPth() {
		if (!ppt.artistView || !ppt.txtReaderEnable || ppt.img_only) return ['', '', false, false];
		let pth = '';
		if (!this.bio.readerTag) pth = this.bio.readerItem;
		else {
			const handle = $.handle(panel.id.focus);
			if (handle) pth = handle.Path;
		}
		return ['', pth, true, $.file(pth)];
	}

	txtRevPth() {
		if (ppt.artistView || !ppt.txtReaderEnable || ppt.img_only) return ['', '', false, false];
		let pth = '';
		if (!this.rev.readerTag) pth = this.rev.readerItem;
		else {
			const handle = $.handle(panel.id.focus);
			if (handle) pth = handle.Path;
		}
		return ['', pth, true, $.file(pth)];
	}

	updText() {
		this.getText(false, true);
		img.getArtImg();
		img.getFbImg();
		this.textUpdate = 0;
		this.done.amBio = this.done.lfmBio = this.done.amRev = this.done.lfmRev = this.done.wikiRev = false;
	}

	wikiBio(a) {
		const wBio = panel.getPth('bio', panel.id.focus, this.artist, '', '', cfg.supCache, a, '', '', 'foWikiBio', true).pth;
		const lBio = panel.getPth('bio', panel.id.focus, this.artist, '', '', cfg.supCache, a, '', '', 'foLfmBio', true).pth;
		if (!$.file(wBio) && !$.file(lBio)) return;
		this.mod.wikiBio = ($.lastModified(wBio) || 0) + (panel.summary.show ? ($.lastModified(lBio) || 0) : 0);
		if (this.mod.wikiBio == this.mod.curWikiBio) return;
		this.bio.wiki = $.open(wBio).replace(/\u200b/g, '').trim();
		const chkGenre = this.chkGenre(this.bio.wiki);
		const en = this.bio.wiki.includes('Wikipedia language: EN');
		let bioLfm = $.open(lBio);
		let bornStr = '';
		let active = '';
		let foundedIn = '';
		let latest = '';

		if (this.bio.wiki && panel.summary.show) {
			if (panel.summary.popLatest) {
				const latestRelease = tag.getTag(bioLfm, this.bio.latestRelease, true);
				if (latestRelease.tag) latest = latestRelease.label + latestRelease.tag;
				
			}
			const b = this.getBornStr(en ? this.bio.wiki : bioLfm);
			bornStr = b.bornStr;
			if (en) this.bio.wiki = b.source;
			else if (!bornStr) {
				const y = tag.getTag(bioLfm, this.bio.yrsActive, true);
				if (y.tag) {
					active = y.label + y.tag;
				}
			}
			const o = this.getFoundedIn(en ? this.bio.wiki : bioLfm);
			foundedIn = o.foundedIn;
			if (en) this.bio.wiki = o.source;
		}

		this.bio.wiki = this.bio.wiki.replace(/Wikipedia language:\s[A-Z]{2}/, '');
		this.bio.wiki = this.formatText('wikiBio', this.bio.wiki, panel.summary.genre ? {limit: 6, list: true, key: 'Genre: '} : {}, {str: foundedIn}, {str: bornStr}, panel.summary.date ? {key: this.bio.died} : {}, panel.summary.date ? (en ? {key: this.bio.yrsActive} : {str: active}) : {}, '', panel.summary.popLatest ? {str: latest} : '', chkGenre.singleGenre).replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		this.newText = true;
		this.mod.curWikiBio = this.mod.wikiBio;
	}

	wikiRev(a, aa, l, c) {
		let albLength = '';
		let albReleaseDate = '';
		let foundComp = false;
		let length = '';
		let trackRev = '';
		let trk = '';
		let wRev = '';
		let wiki_tr_mod = 0;
		let writer = '';
		
		if (!ppt.classicalMusicMode || panel.alb.ix) {
			wRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foWikiRev', true).pth;
		} else if (!panel.alb.ix) {
			wRev = panel.getPth('rev', panel.id.focus, this.artist, this.composition, '', cfg.supCache, a, aa, c, 'foWikiRev', true).pth;
			if ($.file(wRev)) foundComp = true;
		}
		this.rev.wikiFallback = !foundComp;
		if (!$.file(wRev) && ppt.classicalAlbFallback && !panel.alb.ix && panel.style.inclTrackRev != 2) {
			wRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foWikiRev', true).pth;
		}
		const lRev = panel.getPth('rev', panel.id.focus, this.artist, this.album, '', cfg.supCache, a, aa, l, 'foLfmRev', true).pth;
		if (!$.file(wRev) && !$.file(lRev)) {
			but.check();
			if (!panel.style.inclTrackRev || ppt.classicalMusicMode && !ppt.classicalAlbFallback) {
				this.rev.wikiAlb = '';
				return;
			}
		}
		if (panel.style.inclTrackRev) {
			trk = this.track.toLowerCase();
			trackRev = $.jsonParse(panel.getPth('track', panel.id.focus, this.trackartist, 'Track Reviews', '', '', $.clean(this.trackartist), '', 'Track Reviews', 'foWikiRev', true).pth, false, 'file');
			if (trackRev[trk] && trackRev[trk].update) wiki_tr_mod = trackRev[trk].update;
		}
		this.mod.wikiRev = ($.lastModified(wRev) || 0) + (panel.summary.show ? ($.lastModified(lRev) || 0) : 0) + (wiki_tr_mod || 0);
		if (this.mod.wikiRev == this.mod.curWikiRev) return;
		this.rev.wikiAlb = '';
		let revLfm = '';
		if (panel.style.inclTrackRev != 2 || foundComp) {
			this.rev.wikiAlb = $.open(wRev).replace(/\u200b/g, '').trim();
			revLfm = $.open(lRev).replace(/\u200b/g, '').trim();
		}

		const chkGenre = this.chkGenre(this.rev.wikiAlb);
		this.newText = true;
		this.mod.curWikiRev = this.mod.wikiRev;
		this.rev.wikiAlb = this.rev.wikiAlb.replace('Genre: ', 'Album Genres: ');
		const eng = this.rev.wikiAlb.includes('Wikipedia language: EN');
		if (panel.style.inclTrackRev != 2 || foundComp) {
			if (this.rev.wikiAlb && panel.summary.date) {
				const lfmDate = tag.getTag(revLfm, this.rev.releaseDate, true);
				if (lfmDate.tag) albReleaseDate = lfmDate.label + lfmDate.tag;
				if (eng) {
					const wRevDate = tag.getTag(this.rev.wikiAlb, this.rev.releaseDate, true);
					if (wRevDate.tag) {
						albReleaseDate = wRevDate.label + wRevDate.tag;
						if (lfmDate.tag) {
							const tracks = lfmDate.tag.split(' | ');
							if (tracks.length > 1) {
								albReleaseDate = wRevDate.label + wRevDate.tag + ' | ' + tracks[1];
							}
						}
						let sub = this.rev.wikiAlb.substring(wRevDate.ix);
						sub = sub.split('\n')[0].trim();
						this.rev.wikiAlb = this.rev.wikiAlb.replace(RegExp($.regexEscape(sub)), '');
					}
				}
				if (panel.summary.other) {
					const length = tag.getTag(eng ? this.rev.wikiAlb : revLfm, eng ? 'Length: ' : this.rev.len, true);
					if (length.tag) {
						albLength = length.label + length.tag;
						if (eng) {
							let len = this.rev.wikiAlb.substring(length.ix);
							len = len.split('\n')[0].trim();
							this.rev.wikiAlb = this.rev.wikiAlb.replace(RegExp($.regexEscape(len)), '');
						}
					}
				}
			}
		}

		if (panel.style.inclTrackRev == 1 && ppt.albTrackAuto) {
			const f = this.rev.wikiAlb.indexOf('==');
			if (f != -1) {
				let ix = this.rev.wikiAlb.lastIndexOf('Album Genres: ');
				let genre = '';
				if (ix != -1) {
					genre = this.rev.wikiAlb.substring(ix);
					genre = genre.split('\n')[0].trim();
				}
				this.rev.wikiAlb = this.add([genre], this.rev.wikiAlb.slice(0, f).trim());
			}
		}
		this.rev.wiki = this.rev.wikiAlb;
		let genrePrefix = 'Track Genre: ';
		let needTrackSubHeading = false;
		if (!ppt.classicalMusicMode || !foundComp) {
			if (panel.style.inclTrackRev) {
				if (trackRev && trackRev[trk]) {
					const o = trackRev[trk];
					let releaseDate = $.getProp(o, 'date', '');
					if (releaseDate) releaseDate = `Release Date: ${releaseDate}`;
					let composer = $.getProp(o, 'composer', []).join('\u200b, ');
					if (composer) {
						writer = o.composer.length > 1 ? 'Composers: ' : 'Composer: ';
						composer = writer + composer;
					}

					const lang = $.getProp(o, 'lang', '')
					const en = lang == 'EN';
					let label = 'Duration: ';
					if (en) {
						length = $.getProp(o, 'length', '');
					} else if (panel.summary.other) { // static read
						const trackLfmRev = $.jsonParse(panel.getPth('track', panel.id.focus, this.trackartist, 'Track Reviews', '', '', $.clean(this.trackartist), '', 'Track Reviews', 'foLfmRev', true).pth, false, 'file');
						if (trackLfmRev && trackLfmRev[trk]) {
							length = $.getProp(trackLfmRev[trk], 'length', '');
							if (length) {
								const ix = cfg.lang.arr.indexOf(lang);
								if (ix != -1) label = this.rev.length[ix];
							}
						}
					}
					if (length) length = (panel.summary.other ? label : 'Length: ') + length;
					let wiki = $.getProp(o, 'wiki', '');
					const showGenres = !ppt.albTrackAuto || !this.rev.wikiAlb;
					if (showGenres) {
						let genres = $.getProp(o, 'genre', []);
						if (genres.length) {
							if (genres.length > 1) genrePrefix = 'Track Genres: ';
							genres = genrePrefix + genres.join('\u200b, ');
							wiki = this.add([genres], wiki);
						}
					}
					if (ppt.expandLists) {
						wiki = this.add([wiki], composer);
						wiki = this.add([wiki], releaseDate);
					} else {
						wiki = this.add([wiki], releaseDate);
						wiki = composer && wiki ? composer + (releaseDate ? '\r\n' : '\r\n\r\n') + wiki : composer || wiki;
					}
					if (this.rev.wikiAlb || (!panel.summary.show || !panel.summary.other) && length) wiki = this.add([length], wiki);
					if (wiki) {
						if (ppt.trackHeading == 1 && (this.rev.wikiAlb || !ppt.heading) || ppt.trackHeading == 2) {
							this.rev.wikiTrackHeading = false;
							if (this.rev.wikiAlb) {
								trackRev = '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + wiki;
							} else {
								trackRev = wiki;
								needTrackSubHeading = true;
							}
						} else {
							this.rev.wikiTrackHeading = true;
							trackRev = wiki;
						}
						this.rev.wiki = this.add([trackRev], this.rev.wikiAlb);
					} else {
						this.rev.wikiTrackHeading = panel.style.inclTrackRev == 2;
					}
				} else {
					this.rev.wikiTrackHeading = panel.style.inclTrackRev == 2;
				}
			}
		}  else {
			this.rev.wikiTrackHeading = false;
		}

		this.rev.wiki = this.rev.wiki.replace(/Wikipedia language:\s[A-Z]{2}/, '');
		this.rev.wiki = this.formatText('wikiRev', this.rev.wiki, panel.summary.genre ? {limit: 6, list: true, key: this.rev.wikiAlb ? 'Album Genres: ' : genrePrefix} : {}, panel.summary.other && !this.rev.wikiAlb ? {list: true, key: writer, prefix: true, suffix: true} : {}, panel.summary.date ? (this.rev.wikiAlb ? (albReleaseDate ? {str: albReleaseDate} : (eng ? {key: this.rev.releaseDate} : '')) : {key: this.rev.releaseDate}) : {}, panel.summary.other && !this.rev.wikiAlb ? (length ? {str: length} : {}) : {str: albLength}, '', '', '', chkGenre.singleGenre).replace(/(?:\s*\r\n){3,}/g, '\r\n\r\n');
		if (needTrackSubHeading) this.rev.wiki = '\u00a6Song\u00a6' + this.tf(ppt.trackSubHeading, ppt.artistView, true) + '\r\n\r\n' + this.rev.wiki;
		if (!this.rev.wiki) but.check();
	}
}