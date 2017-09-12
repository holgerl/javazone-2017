"use strict";

const fs = require('fs');

//var chosenBuzzwords = "java 8 devops testing docker functional kafka security go cloud ee javascript graph spring native service test sjakk database scala groovy git xacml android mongodb nosql jvm camel erlang soa ejb maven".split(" ");
var chosenBuzzwords = "api microservice javascript app cloud security spring docker 9 reactive react android kafka elasticsearch database scala maven lambda frontend rest clojure akka functional ruby 8 nosql continuou groovy go xml container agile enterprise ee integration swing ajax pattern soa devop graph native git mongodb camel erlang ejb".split(" ");

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

shuffle(chosenBuzzwords);

function main() {
	let count = 0;

	let years = {};

	for (let year = 2008; year <= 2017; year++) {
		let file = fs.readFileSync("javazone_" + year + ".js", 'utf8');
		file = file.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Removing control characters

		const js = JSON.parse(file)
		const sessions = js.sessions;
		
		let yearBuckets = {};

		for (let session of sessions) {
			if (!session.abstract) continue;
			count++;

			let abstract = session.abstract;
			abstract = abstract.replace(/["'(),.?!:]/g, " ");
			abstract = abstract.toLowerCase();

			let tokens = tokenize(abstract);
			tokens = removeStopWords(tokens);
			tokens = stem(tokens);

			let buckets = bucketize(tokens);

			combineBuckets(yearBuckets, buckets);

			//console.log("---")
			//console.log(JSON.stringify(buckets));
		}

		const limitedYearBuckets = removeSmallBuckets(yearBuckets, 4);

		const sorted = sortBucketWords(limitedYearBuckets);
		console.log("### " + year);
		console.log(JSON.stringify(sorted.map(function(a) {return a.word})));

		const onlyBuzzWords = keepBuzzWords(yearBuckets);

		years[year] = onlyBuzzWords;
	}

	console.log("### TOTAL");
	console.log(count);

	console.log(JSON.stringify(years, null, 4));

	fs.writeFileSync("jz-keywords2.js", "HL.buzzwords = HL.buzzwords || {}; HL.buzzwords.hype = " + JSON.stringify(years) + "\n  HL.buzzwords.buzzwords = " + JSON.stringify(chosenBuzzwords), 'utf8');
}

function tokenize(str) {
	return str.trim().split(/\s+/);
}

function removeStopWords(tokens) {
	let stopWords = "the and to of a og for i in is å er you how det with som this we vi en har på will at it that av du til med kan on your hvordan as can are be what om de an but by our et talk vil not - from all have using use they some new more most about ikke men noen jeg get man dette deg or look fra like hva we'll also if do denne skal learn which when data session over open has why so through into one lyntalen eller når være den så seg just system når such these many make tools time without mange used også bruke gjøre lage oss hvor se other really ofte alle no much hvilke vise was than out få their its features take foredraget source ved need blir mer up there software application ta create show should applications both erfaringer bruk way well systems disse flere then ut andre eben etter been model become presentation expected required h1. experience different opp hvorfor even where code programming them only går own inn help gjennom very work write simple gi any common development litt know bør it's tar basic introduction start things da the der får better ble good project outline mye må noe gir din presentasjonen provides user \\* going ha gå see developers build type gjør solve kunne viser kommer us selv support being år think helt while does between ser focus bare var now båe kanskje existing discuss each real first før kode level nå best nye it. great både applications. explore may available information based want uten mot ny few slik find samt still running enn gang would often understand my single end you'll web language store big large product problems provide machine memory people set makes enkelt projects change delivery right alt complex lot those access hard koden high same getting live vært måte ønsker having tool who examples god design needed mulig important skrive eksempler code. server after easy every trenger libraries control gjerne driven let's give http \\- management ways alltid writing interface applikasjoner come talk, learning because two several tips systems. implementation rules workshop actually regular version demonstrate bedre prosjektet rammeverk ulike explain standard mellom lett fleste quite doing had s ll t re h1 * ** outline audience experience".split(" ");

	return tokens.filter(function(token) {
		return stopWords.indexOf(token) == -1;
	});
}

function stem(tokens) {
	return tokens.map(function(token) {
		if (token.length >= 2 && token[token.length-1] == "s" && token[token.length-2] != "s")
			return token.split(/s$/)[0];
		else
			return token; 
	});
}

function bucketize(tokens) {
	const buckets = {}
	for (let token of tokens) {
		if (!buckets[token]) buckets[token] = 0;

		buckets[token]++;
	}
	return buckets;
}

function removeSmallBuckets(buckets, limit) {
	const newBuckets = {};
	for (let word in buckets) {
		if (buckets[word] >= limit) newBuckets[word] = buckets[word];
	}
	return newBuckets;
}

function combineBuckets(toBuckets, fromBuckets) {
	for (let word in fromBuckets) {
		if (!toBuckets[word]) toBuckets[word] = 0;

		toBuckets[word]++; // We do not combine bucket counts, since longer abstract should not have an advantage
	}
}

function sortBucketWords(buckets) {
	const pairs = [];	
	for (let word in buckets) {
		pairs.push({word: word, count: buckets[word]});
	}

	return pairs
		.sort(function(a,b) {
			return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);
		}); 
}

function keepBuzzWords(buckets) {
	const buzzCounts = {};
	for (let buzzWord of chosenBuzzwords) {
		if (buckets[buzzWord])
			buzzCounts[buzzWord] = buckets[buzzWord] / 100;
		else
			buzzCounts[buzzWord] = 0;
	}
	return buzzCounts;
}

main();