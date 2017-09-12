var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

var fs = require('fs');

var topKeywords = {};

var numberOfSessions = {};

var coolWords = "java 8 devops testing docker functional kafka security go cloud ee javascript graph spring native service test sjakk database scala groovy git xacml android mongodb nosql jvm camel erlang soa ejb maven".split(" ");

function cleanKeyword(keyword) {
	keyword = keyword.replace("topic:", "");

	if (keyword.indexOf("type:") != -1) return "";

	keyword = keyword.replace("testing", "test");
	keyword = keyword.replace("tests", "test");
	keyword = keyword.replace("services", "service");
	keyword = keyword.replace("js", "javascript");

	if (coolWords.indexOf(keyword.trim()) >= 0) {
		return keyword;
	} else {
		return "";
	}

	return keyword
}

function removeStopwords(string) {
	var stopWords = "the and to of a og for i in is å er you how det with som this we vi en har på will at it that av du til med kan on your hvordan as can are be what om de an but by our et talk vil not - from all have using use they some new more most about ikke men noen jeg get man dette deg or look fra like hva we'll also if do denne skal learn which when data session over open has why so through into one lyntalen eller når være den så seg just system når such these many make tools time without mange used også bruke gjøre lage oss hvor se other really ofte alle no much hvilke vise was than out få their its features take foredraget source ved need blir mer up there software application ta create show should applications both erfaringer bruk way well systems disse flere then ut andre eben etter been model become presentation expected required h1. experience different opp hvorfor even where code programming them only går own inn help gjennom very work write simple gi any common development litt know bør it's tar basic introduction start things da the der får better ble good project outline mye må noe gir din presentasjonen provides user \\* going ha gå see developers build type gjør solve kunne viser kommer us selv support being år think helt while does between ser focus bare var now båe kanskje existing discuss each real first før kode level nå best nye it. great både applications. explore may available information based want uten mot ny few slik find samt still running enn gang would often understand my single end you'll web language store big large product problems provide machine memory people set makes enkelt projects change delivery right alt complex lot those access hard koden high same getting live vært måte ønsker having tool who examples god design needed mulig important skrive eksempler code. server after easy every trenger libraries control gjerne driven let's give http \\- management ways alltid writing interface applikasjoner come talk, learning because two several tips systems. implementation rules workshop actually regular version demonstrate bedre prosjektet rammeverk ulike explain standard mellom lett fleste".split(" ");
	for (var i in stopWords) {
		string = string.replace(new RegExp(" " + stopWords[i] + " ", "g"), " ");
		string = string.replace(new RegExp("^" + stopWords[i] + " ", "g"), " ");
		//string = string.replace(new RegExp(" " + stopWords[i] + " ", "g"), " ");
	}
	return string;
}

function makeKeywords(keywordsString) {
	if (keywordsString == undefined) return [];

	keywordsString = keywordsString.toLowerCase();
	keywordsString = removeStopwords(keywordsString)
	var split = keywordsString.split(" ");
	return split;
}

for (var i in years) {
	var year = years[i];

	var hype = {};

	var file = fs.readFileSync("javazone_" + year + ".js", 'utf8');

	file = file.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Removing control characters

	var js = JSON.parse(file)

	var sessions = js.sessions;

	numberOfSessions[year] = sessions.length;

	for (var j in sessions) {
		var session = sessions[j];
		var keywords = makeKeywords(session.abstract);
		//var keywords = session.keywords;
		for (var k in keywords) {
			var keyword = keywords[k];
			
			keyword = cleanKeyword(keyword)
			
			if (keyword == "") continue;

			if (typeof(hype[keyword]) === "undefined") hype[keyword] = 0;
			hype[keyword] += 1;
		}
	}

	console.log(JSON.stringify(hype, null, 4));

	var toBeSorted = [];

	for (var keyword in hype) {
		toBeSorted.push({keyword: keyword, count: hype[keyword]});
	}

	toBeSorted.sort(function(a, b) {
		return b.count - a.count;
	});

	var topList = toBeSorted.slice(0, coolWords.length);

	topKeywords[year] = topList;
}

console.log(JSON.stringify(topKeywords, null, 4));

var finalResult = {};

for (var year in topKeywords) {
	console.log(" ");
	console.log(year + ": ");

	var yearWords = {}

	for (var j in topKeywords[year]) {
		var topElement = topKeywords[year][j];
		console.log(topElement.keyword + "(" + topElement.count + ")")
		yearWords[topElement.keyword] = topElement.count / 100;
	}

	finalResult[year] = yearWords
}

console.log(JSON.stringify(finalResult, null, 4));

var jsonFileString = "HL.buzzwords.hype = " + JSON.stringify(finalResult);

fs.writeFileSync("jz-keywords.js", jsonFileString, 'utf8');