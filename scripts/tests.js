'use strict';

const runTests = false;

if (runTests) {
	
	// The infobox source is in wikitext format and difficult to parse. Genres are extracted in all languages. Other info is extracted if the language is English; else last.fm data is used.
	// Fully extending to other language requires identification of all key words & list names etc that may differ, and dealing with any structural variations in the infobox style for different sites.

	// birth_place
	let testItems = [
		`[[Halifax, West Yorkshire]], England`,
	];

	testItems.forEach(n => console.log('BIRTH PLACE: ', infobox.getStr('birth_place', {birth_place: infobox.cleanText(n, 'en')})));

	// composer
	testItems = [
		`{{hlist|[[Adrian Smith]]|[[Steve Harris (musician)|Steve Harris]]|[[Bruce Dickinson]]}}`,
		`*[[Andrew Farriss]]*[[Michael Hutchence]]`,
		`U2`
	]

	testItems.forEach(n => console.log('COMPOSER: ', infobox.getInstances('composer', {composer: infobox.cleanText(n, 'en')})));

	// genre
	testItems = [
		`{{flatlist|* [[Grunge]]* [[alternative rock]]* [[punk rock]]* [[hard rock]]}}`,
		`[[グランジ]],[[オルタナティヴ・ロック]]`,
		`{{hlist|[[Grunge]]|[[alternative rock]]}}`,
		`{{Hlist-comma|[[ポップ・ミュージック|ポップ]]|{{仮リンク|プログレッシブ・カントリー|en|Progressive Country}}|[[ブルース]]}}`
	];

	testItems.forEach(n => console.log('GENRE: ', infobox.getInstances('genre', {genre: infobox.cleanText(n, 'en')}, 'en')));

	// length
	testItems = [
		`{{ubl|4:04 (album version)|4:08 (Best Of version)}}; {{ubl|3:38}}`,
		`{{ubl|4:27|6:45 (Pudding [[Audio mixing (recorded music)|mix]])}}`,
		`{{plainlist|* 4:44 (album version)* 3:56 (single edit)}}`,
		`{{plainlist|* 5:46 (album version)* 4:31 (edited version)`,
		`* 4:12 (album version)* 3:30 (7-inch version)* 8:25 (12-inch version)`,
		`* {{Duration|m=4|s=5}} (EP version)* {{Duration|m=3|s=37}} (radio edit)`,
		`*4:36 (album version)*{{Duration|2:26}} (single edit)*{{Duration|6:17}} (full version)`,
		`{{Duration|m=78|s=38}} (CD),{{Duration|m=80|s=28}} (DVD-Audio),{{Duration|m=86|s=41}} (iTunes)`,
		`* {{Duration|m=5|s=01}} (album version)* {{Duration|m=4|s=38}} ([[radio edit|single version]])`,
		`{{ubl|{{duration|m=4|s=11}} {{small|(album version)}}|{{duration|m=3|s=46}} {{small|(radio edit)}}}}`,
		`(Single) {{Duration|m=3|s=30}} (Album) {{Duration|m=4|s=08}}`,
		`*4:05 (album version){{Duration|2:47}} (single version)`,
		`{{unbulleted list|3:30 (7")| 5:21 ([[Black and Blue|LP]])}}`,
		`{{Duration|m=04|s=11}}`,
		`{{unbulleted list|{{duration|m=46|s=23}}}}`,
		`{{unbulleted list|{{Duration|m=5|s=45}} (album version)|{{Duration|m=3|s=33}} (single version)}}`,
		`{{Flatlist|*{{Duration|m=4|s=55}} (album version)*{{Duration|m=3|s=47}} (single version)}}`,
		`{{Plain list|* {{Duration|m=3|s=18}} (Rihanna version)* {{Duration|m=3|s=21}} (album version)}}`,
		`{{ubl|{{Duration|4:06}} (album version)|{{Duration|3:53}} (radio edit/7-inch)|{{Duration|5:59}} (The Heavenly Version/12-inch)}}`,
		`{{ubl|{{Duration|1:04:06}} (album version)|{{Duration|3:53}} (radio edit/7-inch)|{{Duration|1:55:59}} (The Heavenly Version/12-inch)}}`, // test
		`5:52 (on [[The Bootleg Series Volumes 1–3 (Rare & Unreleased) 1961–1991#Disc three|Bootleg Series Volumes 1–3]])6:27 (on [[The Bootleg Series Vol. 8 – Tell Tale Signs: Rare and Unreleased 1989–2006#Disc two|Bootleg Series Volume 8]])`,
		`{{duration|m=4|s=8}}`,
		`{{plainlist|* {{duration|m=50|s=36}} (2021 version)* {{duration|m=158|s=48}} (Toy:Box version)* {{duration|m=62|s=07}} (2011 leak)}}`,
		`4:27 (album version) ,4:24 (single version),4:52 (Hysteria video edit version) ,4:21 (2012 re-recorded version) ,5:35 (extended version)`,
		`{{ubl|8:29 (Album version)|4:54 ([[TM Studios|TM Gold Disc]] version)|3:27 (Single edit)|8:33 (Early rough [[Audio mixing (recorded music)|mix]])|8:11 ([[Rehearsal#Popular and traditional music|Rehearsal]] Take)}}`,
		`{{duration|h=2|m=34|s=39}}`,
		`31:24`,
		`48 [[Minute|min]] 36 [[Second|sec]]`,
		`mm:ss`, // should be rejected
		`2:08 (see [[Rock Around the Clock#Length variation|length variations]])`
	];

	testItems.forEach(n => console.log('LENGTH: ', infobox.getLength('length', {length: infobox.cleanText(n, 'en')}).replace(/\(see length variations\)/gi, '').replace(/\u2013/g, ' \u2013 ').replace(/ {2}/g, ' ')));

	// lifespan
	testItems = [
		{birth_date: `{{Birth date and age|1923|2|13}}`},
		{birth_date: `{{birth date and age|df=yes|1947|2|26}},[[Dagenham]], Essex, England`}, // Sandie Shaw: special case that includes origin: Currently origin is extracted. Regress if causes issues. Any conceivable following text is split('{{') off. 
		{birth_date: `{{birth date and age|1958|07|30|df=yes}}{{r|AllMusicBio|Cunningham}}`},
		{birth_date: `'''Allison Margaret Pierce''' <br> {{birth date and age|1975|7|22}} <br> '''Catherine Eleanor Pierce''' <br>{{birth date and age|1977|9|12}}`},
		{death_date: `{{Death date and age|1991|11|24|1946|9|5|df=y}}`},
	];

	testItems.forEach(n => console.log('LIFESPAN: ', infobox.getLifespan(n)));
	
	// origin
	testItems = [
		`[[Battle, East Sussex]], England`,
		`[[Southampton]], [[Hampshire]] [[England]]` // Stephen Warbeck (missing ',' inserted)
	];

	testItems.forEach(n => console.log('ORIGIN: ', infobox.getStr('origin', {origin: infobox.cleanText(n, 'en')})));

	// released
	testItems = [
		`{{Start date|df=yes|2006|11|20}}`,
		`{{Start date|1992|9|21|df=y}}`,
		`{{start date|2000|5|8|df=y}}`,
		`{{startdate|2005|3|21|mf=yes}}`,
		`{{Start date|2011|11|1}} (international edition),October 27, 2011 (Japanese edition)`,
		`*{{Start date|1967|5|12}} (UK)*August 23, 1967 (US)`,
		`* {{Start date|1977|01|23|df=y}} (UK)* {{Start date|1977|02|02|df=y}} (US)`,
		`{{start date|2017|12|08}} (Remix [[Extended play|EP]])`,
		`January 16 2001`,
		`* 6 July 2009 {{small|(digital download)}}* 17 August 2009 {{small|(vinyl release)}}`,
		`August 1968 {{small|([[LP record|LP]])}}, October 1990 {{small|([[Compact disc|CD]])}}`,
		`{{hlist|January 1994 ([[Buddha (album)|Buddha]])|February 17, 1995 (Cheshire Cat)}}`,
		`June 20, 1989,July 10, 1989 (Japan)`,
		`14 November 2006 ([[United States|US]]),26 December 2006 ([[UK]])`,
		`1958 (US),,December 1962 (UK)`,
		`1 November 2021`
	];

	testItems.forEach(n => console.log('RELEASED: ', infobox.getReleased('released', {released: infobox.cleanText(n, 'en')})));

	// years_active
	testItems = [
		`{{hlist|{{start date|1961}}–{{end date|1970}},{{start date|1978}}–{{end date|2009}}}}`, // Peter, Paul & Mary
		`{{hlist|{{start date|1967}}–{{end date|1998}}|{{end date|2004}}|{{start date|2013}}–present}}`,
		`{{hlist|{{start date|1965}}–{{end date|72}}|{{start date|2004}}–{{end date|14}}}}{{start date|2016}}`,
		`{{hlist|1988–present {{small|(hiatuses: 2004–2008, 2016–2018)}}}}`,
		`{{unbulleted list|1969–1987|1998–2002|2009–present}}`,
		`{{flatlist|* {{start date|1977}}–{{end date|1988}}* {{start date|1990}}–{{end date|1995}}}}`,
		`{{plainlist|* 2004–2015 (as a band)* 2015–present (as a solo project)}}`,
		`{{flatlist|* 1958–1969* 1970–2003 * 2006* 2009–2012}}`, // Bee Gees
		`{{start date|1969}}–1983, 1986–present`,
		`{{hlist|1995–present (hiatus: 2014–2018)}}`,
		`{{hlist|1988–2002|,2009–2018,(hiatus)}}`,
		`{{hlist|1968–2006|2011–2017}}`,
		`{{hlist|1983–1997|2007–present}}`,
		`{{Flatlist|*{{Start date|df=yes|1966}}–1968*1993*2005}}`,
		`1967–1968, {{-}} 1969–1976, {{-}} 1977, {{-}} 1990, {{-}} 1992–2001, {{-}} 2003–2006, {{-}} 2007–present`,
		`1958–1970, 1973–1990, 2004–2015 (one-off reunion: 2020)`,
		`The Rezillos:,{{start date|1976}}–{{end date|1978}}, {{start date|2001}}–present,The Revillos:,{{start date|1979}}–{{end date|1985}}, 1994, 1996`,
		`{{hlist|{{Start date|1989}}–2002| 2009–2012|}}`,
		`2005–2008| 2022 to present`, // return 2005–2008 to match wikipedia
		`2004–present`
	];

	testItems.forEach(n => console.log('YEARS ACTIVE: ', infobox.getYearsActive('years_active', {years_active: infobox.cleanText(n, 'en')})));

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