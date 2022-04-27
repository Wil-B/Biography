'use strict';

// USAGE: ADD 'tests.js' TO main.js AS LAST FILE IN files. ENABLE runTests BELOW. TESTS RUN ON INITIALISATION. SIMPLEST NOT TO INCLUDE tests.js IN RELEASES.

const runTests = false;

if (runTests) {
	
	// The infobox source is in wikitext format and difficult to parse. Genres are extracted in all languages. Other info is extracted if the language is English; else last.fm data is used.
	// Fully extending to other language requires identification of all key words & list names etc that may differ, and dealing with any structural variations in the infobox style for different sites.

	// birth_place
	let testItems = [
		{item: `[[Halifax, West Yorkshire]], England`, expectedResult: `Halifax, West Yorkshire, England`},
	];

	testItems.forEach(n => {
			const result = infobox.getStr('birth_place', {birth_place: infobox.cleanText(n.item, 'en')});
			if (result != n.expectedResult) console.log('INFOBOX PARSE FAILED: BIRTH PLACE: ', result);
			console.log('BIRTH PLACE: ', infobox.getStr('birth_place', {birth_place: infobox.cleanText(n.item, 'en')}));
		});

	// composer
	testItems = [
		{item: `{{hlist|[[Adrian Smith]]|[[Steve Harris (musician)|Steve Harris]]|[[Bruce Dickinson]]}}`, expectedResult: ['Adrian Smith', 'Steve Harris', 'Bruce Dickinson']},
		{item: `{{flatlist|* [[Antonina Armato]]* Ken Miller* Robert Jerald}}`, expectedResult: ['Antonina Armato', 'Ken Miller', 'Robert Jerald']},
		{item: `{{hlist|[[White Town|Jyoti Mishra]]|[[Bing Crosby]]|Max Wartell|Irving Walkman}}`, expectedResult: ['Jyoti Mishra', 'Bing Crosby', 'Max Wartell', 'Irving Walkman']},
		{item: `{{hlist|Anthony Griffiths|Cher{{ref|a}}}}`, expectedResult: ['Anthony Griffiths', 'Cher']},
		{item: `*[[Andrew Farriss]]*[[Michael Hutchence]]`, expectedResult: ['Andrew Farriss', 'Michael Hutchence']},
		{item: `Frischmann/Burnel/Duffy/,Greenfield/Cornwell/Elastica`, expectedResult: ['Frischmann/Burnel/Duffy/', 'Greenfield/Cornwell/Elastica']},
		{item: `{{Flat list| Attributed to Robbie Williams and [[Guy Chambers]] ([[Angels (Robbie Williams song)#Writing|see below]])}}`, expectedResult: ['Attributed to Robbie Williams and Guy Chambers']},
		{item: `[[Buzz Cason]], [[Mac Gayden]]`, expectedResult: ['Buzz Cason', 'Mac Gayden']},
		{item: `*[[Mike Pickering]]*Paul Heard`, expectedResult: ['Mike Pickering', 'Paul Heard']},
		{item: `*Ian Curnow *Phil Harding*Tom Watkins`, expectedResult: ['Ian Curnow', 'Phil Harding', 'Tom Watkins']},
		{item: `[[R. Kelly|Robert Kelly]]`, expectedResult: ['Robert Kelly']},
		{item: `* [[Kristen Anderson-Lopez]]* [[Robert Lopez]]| composer   =| lyricist   =| producer   * [[Kristen Anderson-Lopez]]* [[Robert Lopez]]* [[Christophe Beck]]* Chris Montan* Tom MacDougall`, expectedResult: ['Kristen Anderson-Lopez', 'Robert Lopez']},
		{item: `U2`, expectedResult: ['U2']}
	]

	testItems.forEach(n => {
		const result = infobox.getComposer('composer', {composer: infobox.cleanText(n.item, 'en')});
		if (!$.equal(result, n.expectedResult)) console.log('INFOBOX PARSE FAILED: COMPOSER: ', result)
		console.log('COMPOSER: ', infobox.getComposer('composer', {composer: infobox.cleanText(n.item, 'en')}));
	});

	// genre:
	testItems = [
		{item: `{{flatlist|* [[Grunge]]* [[alternative rock]]* [[punk rock]]* [[hard rock]]}}`, expectedResult: ['Grunge', 'Alternative Rock', 'Punk Rock', 'Hard Rock']},
		{item: `[[グランジ]],[[オルタナティヴ・ロック]]`, expectedResult: ['グランジ', 'オルタナティヴ・ロック']},
		{item: `{{hlist|[[Grunge]]|[[alternative rock]]}}`, expectedResult: ['Grunge', 'Alternative Rock']},
		{item: `{{Hlist-comma|[[ポップ・ミュージック|ポップ]]|{{仮リンク|プログレッシブ・カントリー|en|Progressive Country}}|[[ブルース]]}}`, expectedResult: ['プログレッシブ・カントリー', 'ブルース']},
		{item: `Piano rock`, expectedResult: ['Piano rock']} // Ben Folds Five - Battle Of Who Could Care Less
	];

	testItems.forEach(n => {
		const result = infobox.getGenre('genre', {genre: infobox.cleanText(n.item, 'en')}, 'en')
		if (!$.equal(result, n.expectedResult)) console.log('INFOBOX PARSE FAILED: GENRE: ', result)
		console.log('GENRE: ', infobox.getGenre('genre', {genre: infobox.cleanText(n.item, 'en')}, 'en'));
	});

	// length
	testItems = [
		{item: `{{ubl|4:04 (album version)|4:08 (Best Of version)}}; {{ubl|3:38}}`, expectedResult: `4:04 (album version), 4:08 (Best Of version)`},
		{item: `{{ubl|4:27|6:45 (Pudding [[Audio mixing (recorded music)|mix]])}}`, expectedResult: `4:27, 6:45 (Pudding mix)`},
		{item: `{{plainlist|* 4:44 (album version)* 3:56 (single edit)}}`, expectedResult: `4:44 (album version), 3:56 (single edit)`},
		{item: `{{plainlist|* 5:46 (album version)* 4:31 (edited version)`, expectedResult: `5:46 (album version), 4:31 (edited version)`},
		{item: `* 4:12 (album version)* 3:30 (7-inch version)* 8:25 (12-inch version)`, expectedResult: `4:12 (album version), 3:30 (7-inch version), 8:25 (12-inch version)`},
		{item: `* {{Duration|m=4|s=5}} (EP version)* {{Duration|m=3|s=37}} (radio edit)`, expectedResult: `4:05 (EP version), 3:37 (radio edit)`},
		{item: `*4:36 (album version)*{{Duration|2:26}} (single edit)*{{Duration|6:17}} (full version)`, expectedResult: `4:36 (album version), 2:26 (single edit), 6:17 (full version)`},
		{item: `{{Duration|m=78|s=38}} (CD),{{Duration|m=80|s=28}} (DVD-Audio),{{Duration|m=86|s=41}} (iTunes)`, expectedResult: `78:38 (CD), 80:28 (DVD-Audio), 86:41 (iTunes)`},
		{item: `* {{Duration|m=5|s=01}} (album version)* {{Duration|m=4|s=38}} ([[radio edit|single version]])`, expectedResult: `5:01 (album version), 4:38 (single version)`},
		{item: `{{ubl|{{duration|m=4|s=11}} {{small|(album version)}}|{{duration|m=3|s=46}} {{small|(radio edit)}}}}`, expectedResult: `4:11 (album version), 3:46 (radio edit)`},
		{item: `(Single) {{Duration|m=3|s=30}} (Album) {{Duration|m=4|s=08}}`, expectedResult: `(Single) 3:30 (Album) 4:08`},
		{item: `*4:05 (album version){{Duration|2:47}} (single version)`, expectedResult: `4:05 (album version) 2:47 (single version)`},
		{item: `{{unbulleted list|3:30 (7")| 5:21 ([[Black and Blue|LP]])}}`, expectedResult: `3:30 (7"), 5:21 (LP)`},
		{item: `{{Duration|m=04|s=11}}`, expectedResult: `4:11`},
		{item: `{{unbulleted list|{{duration|m=46|s=23}}}}`, expectedResult: `46:23`},
		{item: `{{unbulleted list|{{Duration|m=5|s=45}} (album version)|{{Duration|m=3|s=33}} (single version)}}`, expectedResult: `5:45 (album version), 3:33 (single version)`},
		{item: `{{Flatlist|*{{Duration|m=4|s=55}} (album version)*{{Duration|m=3|s=47}} (single version)}}`, expectedResult: `4:55 (album version), 3:47 (single version)`},
		{item: `{{Plain list|* {{Duration|m=3|s=18}} (Rihanna version)* {{Duration|m=3|s=21}} (album version)}}`, expectedResult: `3:18 (Rihanna version), 3:21 (album version)`},
		{item: `{{ubl|{{Duration|4:06}} (album version)|{{Duration|3:53}} (radio edit/7-inch)|{{Duration|5:59}} (The Heavenly Version/12-inch)}}`, expectedResult: `4:06 (album version), 3:53 (radio edit/7-inch), 5:59 (The Heavenly Version/12-inch)`},
		{item: `{{ubl|{{Duration|1:04:06}} (album version)|{{Duration|3:53}} (radio edit/7-inch)|{{Duration|1:55:59}} (The Heavenly Version/12-inch)}}`, expectedResult: `1:04:06 (album version), 3:53 (radio edit/7-inch), 1:55:59 (The Heavenly Version/12-inch)`},
		{item: `5:52 (on [[The Bootleg Series Volumes 1–3 (Rare & Unreleased) 1961–1991#Disc three|Bootleg Series Volumes 1–3]])6:27 (on [[The Bootleg Series Vol. 8 – Tell Tale Signs: Rare and Unreleased 1989–2006#Disc two|Bootleg Series Volume 8]])`, expectedResult: `5:52 (on Bootleg Series Volumes 1 – 3) 6:27 (on Bootleg Series Volume 8)`},
		{item: `{{duration|m=4|s=8}}`, expectedResult: `4:08`},
		{item: `{{plainlist|* {{duration|m=50|s=36}} (2021 version)* {{duration|m=158|s=48}} (Toy:Box version)* {{duration|m=62|s=07}} (2011 leak)}}`, expectedResult: `50:36 (2021 version), 158:48 (ToyBox version), 62:07 (2011 leak)`},
		{item: `4:27 (album version) ,4:24 (single version),4:52 (Hysteria video edit version) ,4:21 (2012 re-recorded version) ,5:35 (extended version)`, expectedResult: `4:27 (album version), 4:24 (single version), 4:52 (Hysteria video edit version), 4:21 (2012 re-recorded version), 5:35 (extended version)`},
		{item: `{{ubl|8:29 (Album version)|4:54 ([[TM Studios|TM Gold Disc]] version)|3:27 (Single edit)|8:33 (Early rough [[Audio mixing (recorded music)|mix]])|8:11 ([[Rehearsal#Popular and traditional music|Rehearsal]] Take)}}`, expectedResult: `8:29 (Album version), 4:54 (TM Gold Disc version), 3:27 (Single edit), 8:33 (Early rough mix), 8:11 (Rehearsal Take)`},
		{item: `{{duration|h=2|m=34|s=39}}`, expectedResult: `2:34:39`},
		{item: `31:24`, expectedResult: `31:24`},
		{item: `48 [[Minute|min]] 36 [[Second|sec]]`, expectedResult: `48 min 36 sec`},
		{item: `mm:ss`, expectedResult: ``},
		{item: `2:08 (see [[Rock Around the Clock#Length variation|length variations]])`, expectedResult: `2:08 `}
	];

	testItems.forEach(n => {
		const result = infobox.getLength('length', {length: infobox.cleanText(n.item, 'en')}).replace(/\(see length variations\)/gi, '').replace(/\u2013/g, ' \u2013 ').replace(/ {2}/g, ' ');
		if (result != n.expectedResult) console.log('INFOBOX PARSE FAILED: LENGTH: ', result);
		console.log('LENGTH: ', infobox.getLength('length', {length: infobox.cleanText(n.item, 'en')}).replace(/\(see length variations\)/gi, '').replace(/\u2013/g, ' \u2013 ').replace(/ {2}/g, ' '));
	});

	// lifespan
	testItems = [
		{item: {birth_date: `{{Birth date and age|1923|2|13}}`}, expectedResult: {born: 'Born: 13 February 1923 (age 99)', origin: ''}},
		{item: {birth_date: `{{birth date and age|df=yes|1947|2|26}},[[Dagenham]], Essex, England`}, expectedResult: {born: 'Born: 26 February 1947 (age 75)', origin: 'Dagenham, Essex, England'}}, // Sandie Shaw: special case that includes origin: Currently origin is extracted. Regress if causes issues. Any conceivable following text is split('{{') off. 
		{item: {birth_date: `{{birth date and age|1958|07|30|df=yes}}{{r|AllMusicBio|Cunningham}}`}, expectedResult: {born: 'Born: 30 July 1958 (age 63)', origin: ''}},
		{item: {birth_date: `'''Allison Margaret Pierce''' <br> {{birth date and age|1975|7|22}} <br> '''Catherine Eleanor Pierce''' <br>{{birth date and age|1977|9|12}}`}, expectedResult: {}},
		{item: {death_date: `{{Death date and age|1991|11|24|1946|9|5|df=y}}`}, expectedResult: {born: 'Born: 5 September 1946', end: 'Died: 24 November 1991 (aged 45)'}}
	];

	testItems.forEach(n => {
		const result = infobox.getLifespan(n.item);
		if (JSON.stringify(result) != JSON.stringify(n.expectedResult)) console.log('INFOBOX PARSE FAILED: LIFESPAN: ', result);
		console.log('LIFESPAN: ', infobox.getLifespan(n.item));
	});
	
	// origin
	testItems = [
		{item: `[[Battle, East Sussex]], England`, expectedResult: `Battle, East Sussex, England`},
		{item: `[[Birmingham, Alabama]], U.S.`, expectedResult: `Birmingham, Alabama, U.S.`},
		{item: `[[Southampton]], [[Hampshire]] [[England]]`, expectedResult: `Southampton, Hampshire, England`}
	];

	testItems.forEach(n => {
		const result = infobox.getStr('origin', {origin: infobox.cleanText(n.item, 'en')});
		if (result != n.expectedResult) console.log('INFOBOX PARSE FAILED: ORIGIN: ', result);
		console.log('ORIGIN: ', infobox.getStr('origin', {origin: infobox.cleanText(n.item, 'en')}));
	});

	// released
	testItems = [
		{item: `{{Start date|df=yes|2006|11|20}}`, expectedResult: `20 November 2006`},
		{item: `{{Start date|1992|9|21|df=y}}`, expectedResult: `21 September 1992`},
		{item: `{{start date|2000|5|8|df=y}}`, expectedResult: `8 May 2000`},
		{item: `{{startdate|2005|3|21|mf=yes}}`, expectedResult: `21 March 2005`},
		{item: `{{Start date|2011|11|1}} (international edition),October 27, 2011 (Japanese edition)`, expectedResult: `1 November 2011 (international edition), 27 October 2011 (Japanese edition)`},
		{item: `*{{Start date|1967|5|12}} (UK)*August 23, 1967 (US)`, expectedResult: `12 May 1967 (UK), 23 August 1967 (US)`},
		{item: `* {{Start date|1977|01|23|df=y}} (UK)* {{Start date|1977|02|02|df=y}} (US)`, expectedResult: `23 January 1977 (UK), 2 February 1977 (US)`},
		{item: `{{start date|2017|12|08}} (Remix [[Extended play|EP]])`, expectedResult: `8 December 2017 (Remix EP)`},
		{item: `January 16 2001`, expectedResult: `16 January 2001`},
		{item: `* 6 July 2009 {{small|(digital download)}}* 17 August 2009 {{small|(vinyl release)}}`, expectedResult: `6 July 2009 (digital download), 17 August 2009 (vinyl release)`},
		{item: `August 1968 {{small|([[LP record|LP]])}}, October 1990 {{small|([[Compact disc|CD]])}}`, expectedResult: `August 1968 (LP), October 1990 (CD)`},
		{item: `{{hlist|January 1994 ([[Buddha (album)|Buddha]])|February 17, 1995 (Cheshire Cat)}}`, expectedResult: `January 1994 (Buddha), 17 February 1995 (Cheshire Cat)`},
		{item: `June 20, 1989,July 10, 1989 (Japan)`, expectedResult: `20 June 1989, 10 July 1989 (Japan)`},
		{item: `14 November 2006 ([[United States|US]]),26 December 2006 ([[UK]])`, expectedResult: `14 November 2006 (US), 26 December 2006 (UK)`},
		{item: `1958 (US),,December 1962 (UK)`, expectedResult: `1958 (US), December 1962 (UK)`},
		{item: `{{flagicon|United Kingdom}}{{flagicon|Ireland}}23 October 2006 ,{{flagicon|Netherlands}}8 December 2006`, expectedResult: `United Kingdom, Ireland, 23 October 2006, Netherlands, 8 December 2006`},
		{item: `1 November 2021`, expectedResult: `1 November 2021`}
	];

	testItems.forEach(n => {
		const result = infobox.getReleased('released', {released: infobox.cleanText(n.item, 'en')});
		if (result != n.expectedResult) console.log('INFOBOX PARSE FAILED: RELEASED: ', result);
		console.log('RELEASED: ', infobox.getReleased('released', {released: infobox.cleanText(n.item, 'en')}));
	});

	// years_active
	testItems = [
		{item: `{{hlist|{{start date|1961}}–{{end date|1970}},{{start date|1978}}–{{end date|2009}}}}`, expectedResult: `1961–1970, 1978–2009`}, // Peter, Paul & Mary
		{item: `{{hlist|{{start date|1967}}–{{end date|1998}}|{{end date|2004}}|{{start date|2013}}–present}}`, expectedResult: `1967–1998, 2004, 2013–present`},
		{item: `{{hlist|{{start date|1965}}–{{end date|72}}|{{start date|2004}}–{{end date|14}}}}{{start date|2016}}`, expectedResult: `1965–72, 2004–14, 2016`},
		{item: `{{hlist|1988–present {{small|(hiatuses: 2004–2008, 2016–2018)}}}}`, expectedResult: `1988–present (hiatuses: 2004–2008, 2016–2018)`},
		{item: `{{unbulleted list|1969–1987|1998–2002|2009–present}}`, expectedResult: `1969–1987, 1998–2002, 2009–present`},
		{item: `{{flatlist|* {{start date|1977}}–{{end date|1988}}* {{start date|1990}}–{{end date|1995}}}}`, expectedResult: `1977–1988, 1990–1995`},
		{item: `{{plainlist|* 2004–2015 (as a band)* 2015–present (as a solo project)}}`, expectedResult: `2004–2015 (as a band), 2015–present (as a solo project)`},
		{item: `{{flatlist|* 1958–1969* 1970–2003 * 2006* 2009–2012}}`, expectedResult: `1958–1969, 1970–2003, 2006, 2009–2012`}, // Bee Gees
		{item: `{{start date|1969}}–1983, 1986–present`, expectedResult: `1969–1983, 1986–present`},
		{item: `{{hlist|1995–present (hiatus: 2014–2018)}}`, expectedResult: `1995–present (hiatus: 2014–2018)`},
		{item: `{{hlist|1988–2002|,2009–2018,(hiatus)}}`, expectedResult: `1988–2002, 2009–2018, (hiatus)`},
		{item: `{{hlist|1968–2006|2011–2017}}`, expectedResult: `1968–2006, 2011–2017`},
		{item: `{{hlist|1983–1997|2007–present}}`, expectedResult: `1983–1997, 2007–present`},
		{item: `{{Flatlist|*{{Start date|df=yes|1966}}–1968*1993*2005}}`, expectedResult: `1966–1968, 1993, 2005`},
		{item: `1967–1968, {{-}} 1969–1976, {{-}} 1977, {{-}} 1990, {{-}} 1992–2001, {{-}} 2003–2006, {{-}} 2007–present`, expectedResult: `1967–1968, 1969–1976, 1977, 1990, 1992–2001, 2003–2006, 2007–present`},
		{item: `1958–1970, 1973–1990, 2004–2015 (one-off reunion: 2020)`, expectedResult: `1958–1970, 1973–1990, 2004–2015 (one-off reunion: 2020)`},
		{item: `The Rezillos:,{{start date|1976}}–{{end date|1978}}, {{start date|2001}}–present,The Revillos:,{{start date|1979}}–{{end date|1985}}, 1994, 1996`, expectedResult: `The Rezillos: 1976–1978, 2001–present, The Revillos: 1979–1985, 1994, 1996`},
		{item: `{{hlist|{{Start date|1989}}–2002| 2009–2012|}}`, expectedResult: `1989–2002, 2009–2012`},
		{item: `2005–2008| 2022 to present`, expectedResult: `2005–2008`}, // return 2005–2008 to match wikipedia
		{item: `2004–present`, expectedResult: `2004–present`}
	];

	testItems.forEach(n => {
		const result = infobox.getYearsActive('years_active', {years_active: infobox.cleanText(n.item, 'en')});
		if (result != n.expectedResult) console.log('INFOBOX PARSE FAILED: YEARS ACTIVE: ', result);
		console.log('YEARS ACTIVE: ', infobox.getYearsActive('years_active', {years_active: infobox.cleanText(n.item, 'en')}));
	});

	let infBox =`{{Infobox song
	| name       = Found Out About You
	| cover      = Gin Blossoms Found Out About You.jpg
	| alt        =
	| type       = single
	| artist     = [[Gin Blossoms]]
	| album      = [[New Miserable Experience]]
	| B-side     =
	* "Hands Are Tied"
	* "[[Hey Jealousy]]" (live)
	| released   = 1993
	| recorded   = 1992
	| studio     =
	| venue      =
	| genre      = 
	* [[Jangle pop]]
	* [[alternative rock]]
	| length     = 3:53
	| label      =
	* [[A&M Records|A&M]]
	* [[Fontana Records|Fontana]]
	| writer     = [[Doug Hopkins]]
	| producer   =
	* [[John Hampton (music producer)|John Hampton]]
	* Gin Blossoms
	| prev_title = [[Until I Fall Away]]
	| prev_year  = 1994
	| next_title = [[Allison Road]]
	| next_year  = 1994
	| misc       = 
	{{External music video|{{YouTube|1qB6XdAkkAo|"Found Out About You"}}}}
	}}`

	const cleaned = infobox.cleanText(infBox, 'en')
	console.log('cleaned',cleaned);
	// replace infBox with raw source to check another; set type & site below
	const obj = infobox.getValues(3	, cleaned, 'en'); // type [bio: 0; album: 1; composition: 2; track: 3 or 4 (makes no difference)], source, site
	console.log('obj', obj);
}