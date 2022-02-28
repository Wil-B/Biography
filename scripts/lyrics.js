'use strict';

class Lyrics {
	constructor() {
		this.noLyrics = ['No lyrics found'];
		this.enhancedTimestamps = /(\s*)<(\d{1,2}:|)\d{1,2}:\d{2}(>|\.\d{1,3}>)(\s*)/g;
		this.leadingTimestamps = /^(\s*\[(\d{1,2}:|)\d{1,2}:\d{2}(]|\.\d{1,3}]))+/;
		this.lyr = [];
		this.lyrics = [];
		this.stepTime = 0;
		this.tfLength = fb.TitleFormat('%length_seconds%');
		this.timestamps = /(\s*)\[(\d{1,2}:|)\d{1,2}:\d{2}(]|\.\d{1,3}])(\s*)/g;
	}

	// Methods

	advanceHighLighted() {
		this.newHighlighted = true;
		this.scroll = 0;
		if (this.locus >= 0) {
			this.clearHighlight();
			this.scroll = this.lineHeight;
		}
		this.locus++;
		this.getScrollSpeed();
		this.setHighlight();
		this.repaintRect();
	}

	checkScroll() {
		this.scroll = Math.max(0, this.scroll - this.delta);
		if (this.scroll <= 0) {
			this.newHighlighted = false;
		}
		this.repaintRect();
	}

	clear() {
		this.stop();
		this.lyrics = [];
	}

	clearHighlight() {
		this.lyrics.forEach(v => v.highlight = false);
	}

	display() {
		return this.lyrics.length && this.locus >= 0 && txt.lyricsDisplayed();
	}

	draw(gr) {
		if (this.display()) {
			const top = this.locus * this.lineHeight - this.locusOffset;
			const transition_factor = $.clamp((this.lineHeight - this.scroll) / this.lineHeight, 0, 1);
			const transition_factor_in = !this.lyrics[this.locus].multiLine ? transition_factor : 1;
			const transition_factor_out = $.clamp(transition_factor_in * 3, 0, 1);
			const alpha = Math.min(255 * transition_factor * 4 / 3, 255);
			const blendIn = ui.getBlend(this.col.text_h, this.col.text, transition_factor_in);
			const blendOut = ui.getBlend(this.col.text, this.col.text_h, transition_factor_out);
			const y = this.y + this.scroll;
			
			let col = this.col.text;

			let fadeBot = this.transBot[transition_factor];
			if (!fadeBot) {
				fadeBot = ui.RGBtoRGBA(col, alpha);
				this.transBot[transition_factor] = fadeBot;
			}

			let fadeTop = this.transTop[transition_factor];
			if (!fadeTop) {
				fadeTop = ui.RGBtoRGBA(col, 255 - alpha);
				this.transTop[transition_factor] = fadeTop;
			}

			gr.SetTextRenderingHint(5);

			this.lyrics.forEach((lyric, i) => {
				const lyric_y = this.lineHeight * i;
				const line_y = Math.round(y - top + lyric_y);
				const bottomLine = line_y > this.bot;
				if (this.showlyric(lyric_y, top)) {
					col = line_y >= this.top ? lyric.highlight ? blendIn : i == this.locus - 1 ? blendOut : bottomLine ? fadeBot : this.col.text : fadeTop;
					gr.DrawString(lyric.content, ui.font.lyrics, col, this.x, line_y, this.w + 1, this.lineHeight + 1, this.alignCenter);
				}
			});
			if (this.type.synced && this.userOffset && this.showOffset) {
				gr.DrawString(`Offset: ${this.userOffset / 1000}s`, ui.font.main, this.col.text_h, this.x, this.top, this.w, this.lineHeight + 1, this.alignRight);
			}
		}
	}

	format(lyrics) {
		if (lyrics.length && this.w > 10) {
			$.gr(1, 1, false, g => {
				for (let i = 0; i < lyrics.length; i++) {
					const l = g.EstimateLineWrap(lyrics[i].content, ui.font.lyrics, this.w - 10); // actual amount need to fix example was this.w - 3: using 10 for leeway good enough to fix method diff???? Paul Mccartney And Michael Jackson - Say Say Say (right full panel)
					//console.log('l.length',l.length)
					//if (l.length > 1) {
					if (l.length > 2) { // surely 2???
						const numLines = l.length / 2;
						let maxScrollTime = this.durationScroll;
						if (lyrics[i + 1]) {
							maxScrollTime = Math.min(maxScrollTime * numLines, (lyrics[i + 1].timestamp - lyrics[i].timestamp) / numLines);
						}
						for (let j = 0; j < l.length; j += 2) {
							this.lyrics.push({content: l[j].trim(), timestamp: lyrics[i].timestamp + maxScrollTime * j / 2, id: i, multiLine: true});
						}
					} else this.lyrics.push({content: lyrics[i].content.trim(), timestamp: lyrics[i].timestamp, id: i});
				}
			});
		}
		//console.log('this.lyrics',this.lyrics)
		this.repaintRect();
	}

	getCurPos() {
		return this.lyrics.findIndex(v => v.timestamp >= this.playbackTime());
	}

	getMilliseconds(t) {
		t = t.trim().replace(/[[\]]/,'').split(':');
		return Math.max((t.reduce((acc, time) => (60 * acc) + parseFloat(time))) * 1000, 0);
	}

	getScrollSpeed() {
		let durationScroll = this.durationScroll;
		const t1 = this.getTimestamp(this.locus - 1);
		const t2 = this.getTimestamp(this.locus);
		if (t1 && t2) {
			durationScroll = $.clamp(t2 - t1, 16, this.durationScroll);
		}
		this.delta = this.lineHeight * 24 / durationScroll; // allow for timer lag
	//	this.delta = this.lineHeight * 32 / durationScroll; // allow for timer lag // try 32: may be better than 24: 32 seems too fast
		this.transitionOffset = durationScroll / 2; // divisor controls line synchronisation: default matches lyrics show 3
	}

	getTimestamp(v) {
		return this.lyrics[v] && this.lyrics[v].timestamp;
	}

	load(lyr) {
		const newLyrics = !$.equal(lyr, this.lyr);
		if (newLyrics) {
			this.lyr = lyr;	
			this.userOffset = 0;
		}
		this.alignCenter = StringFormat(1, 1);
		this.alignRight = StringFormat(2, 1);
		this.init = true;
		this.lineHeight = ui.font.lyrics_h + 4 * $.scale + ppt.textPad;
		this.durationScroll = ppt.lyricsTxtReaderSpeed;
		this.delta = this.lineHeight * 24 / this.durationScroll; // allow for timer lag to improve smoothness
	//	this.delta = this.lineHeight * 32 / this.durationScroll; // allow for timer lag to improve smoothness // try 32: may be better than 24: 32 seems too fast
		this.locus = -1;
		this.lyrics = [];
		this.lyricsOffset = 0;
		this.newHighlighted = false;
		this.scroll = 0;
		this.setCol();
		this.showOffsetTimer = null;
		this.timer = null;
		this.trackLength = parseInt(this.tfLength.Eval());
		this.transitionOffset = this.durationScroll / 2;
		this.transBot = {}
		this.transTop = {}
		this.x = panel.text.l;
		this.y = panel.text.t - this.lineHeight;
		this.w = panel.text.w;
		this.h = panel.lines_drawn * ui.font.main_h + this.lineHeight * 2;
	
		const linesDrawn = Math.floor(this.h / this.lineHeight);
		const oddNumLines = linesDrawn % 2;

		this.locusOffset = this.h / 2 - (oddNumLines ? this.lineHeight / 2 : this.lineHeight);
		this.top = this.locusOffset - this.lineHeight * (Math.floor(linesDrawn / 2) - (oddNumLines ? 1 : 2)) + this.y;
		this.bot = this.top + this.lineHeight * (linesDrawn - 3);

		this.type = {
			none: false,
			synced: false,
			unsynced: false
		}

		this.parse(lyr);
	}

	on_mouse_wheel(step) {
		const origOffset = this.userOffset;
		if (Math.abs(this.userOffset != 1)) step *= $.clamp(Math.round(1000 / ((Date.now() - this.stepTime) * 5)), 1, 5);
		this.stepTime = Date.now();
		if (Math.sign(origOffset) != Math.sign(this.userOffset)) this.userOffset = 0;
		else this.userOffset += 1000 * -step;
		this.showOffset = this.userOffset != 0;
		clearTimeout(this.showOffsetTimer);
		this.showOffsetTimer = setTimeout(() => {
			this.showOffset = false;
			this.repaintRect();
		}, 5000);
		this.seek();
	}

	on_playback_pause(isPaused) {
		if (isPaused) this.stop();
		else this.start();
	}

	parse(lyr) {
		if (!lyr.length) {
			this.type.none = true;
			lyr = this.noLyrics;
		}

		if (!this.type.none) {
			if (lyr.some(line => this.leadingTimestamps.test(line))) this.type.synced = true;
			else this.type.unsynced = true;
		}

		let lyrics = [{timestamp: 0, content: this.type.none ? lyr[0] : ''}];
		switch (true) {
			case this.type.synced: {
				let lyrOffset = null;
				lyr.some(line => lyrOffset = line.match(/^\s*\[offset\s*:(.*)\]\s*$/));
				if (lyrOffset && lyrOffset.length > 0) this.lyricsOffset = parseInt(lyrOffset[1]);
				if (isNaN(this.lyricsOffset)) this.lyricsOffset = 0;
				lyr.forEach(line => {
					const content = this.tidy(line);
					const matches = line.match(this.leadingTimestamps);
					if (matches) {
						const all = matches[0].split('][');
						all.forEach(m => {
							lyrics.push({timestamp: this.getMilliseconds(m), content: content});
						});
					}
				});
				this.format(lyrics.sort((a, b) => a.timestamp - b.timestamp));
				break;
			}
			case this.type.unsynced: {
				while (lyr.length) {
					const last = lyr[lyr.length - 1].trim();
					if (last.length) {
						break;
					}
					--lyr.length;
				}
				lyr.forEach(line => {
					lyrics.push({timestamp: 0, content: this.tidy(line)});
				});
				this.format(lyrics);
				const ratio = this.trackLength / this.lyrics.length * 1000;
				this.lyrics.forEach((line, i) => line.timestamp = ratio * i);
				break;
			}
		}
		this.seek();
		this.start();
	}

	playbackTime() {
		const time = !panel.isRadio() ? fb.PlaybackTime : fb.PlaybackTime - txt.reader.trackStartTime;
		return Math.round(time * 1000) + this.lyricsOffset + this.transitionOffset + this.userOffset;
	}

	repaintRect() {
		window.RepaintRect(this.x, this.y, this.w, this.h + this.lineHeight);
	}

	scrollUpdateNeeded() {
		return this.lyrics.length > this.locus + 1 && this.playbackTime() > this.lyrics[this.locus + 1].timestamp;
	}

	seek() {
		this.clearHighlight();
		const curPos = this.getCurPos();
		this.locus = curPos < 0 ? this.lyrics.length - 1 : Math.max(0, curPos - 1);
		if (this.locus >= 0) {
			this.setHighlight();
			this.repaintRect();
		}
	}

	setCol() {
		let valid = false;
		if (ui.blur.dark && ppt.text_hUse) {
			const c = ppt.text_h.replace(/[^0-9.,-]/g, '').split(/[,-]/);
			if (c.length == 3 || c.length == 4) valid = true;
		}
		this.col = {
			text: ui.col.text,
			text_h: !ui.blur.dark || ppt.text_hUse && valid ? ui.col.text_h : RGB(128, 228, 0)
		}
	}

	setHighlight() {
		const id = this.lyrics[this.locus].id;
		if (this.type.synced) this.lyrics.forEach(v => {if (v.id == id) v.highlight = true});
	}
	
	showlyric(y, top) {
		return y >= top && y + this.lineHeight * 2 <= this.h + top;
	}

	smoothScroll() {
		if (this.scrollUpdateNeeded()) {
			this.advanceHighLighted();
		}
		else if (this.newHighlighted) this.checkScroll();
	}

	start() {
		if (this.timer || !fb.IsPlaying || fb.IsPaused) return;
		this.timer = setInterval(() => { 
			if (!this.init) this.smoothScroll();
			else this.init = false;
		}, 16);
	}

	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	tidy(n) {
		return n.replace(this.timestamps, '$1$4').replace(this.enhancedTimestamps, '$1$4').replace(/&amp(;|)/g, '&').replace(/&quot(;|)/g, '"').replace(/&#39(;|)/g, "'").replace(/&gt(;|)/g, '>').replace(/&lt(;|)/g, '<').replace(/&nbsp(;|)/g, '').trim();
	}
}