"use strict";

const fs = require('fs');

const parseFile = function(filename, mapByProperty, keyProperty) {
	const data = {};
	const fileContents = fs.readFileSync(filename, 'utf8');
	for (let line of fileContents.split(/\r?\n/)) {
		const lineParsed = JSON.parse(line);
		const id = lineParsed[mapByProperty];
		if (id == undefined) throw new Error("undefined " + mapByProperty)

		if (keyProperty) {
			data[id] = data[id] || {};
			let key = lineParsed[keyProperty];
			data[id][key] = lineParsed;
		} else {
			if (data[id]) {
				if (data[id] instanceof Array) {
					data[id].push(lineParsed);
				} else {
					data[id] = [data[id], lineParsed];
				}
			} else {
				data[id] = lineParsed
			}	
		}
	}
	return data;
}

const users = parseFile("oslo-users.json", "id");
const questions = parseFile("oslo-questions.json", "users_id");
const badges = parseFile("oslo-badges.json", "users_id", "badges_name");
const positiveAnswers = parseFile("oslo-answers-positive-score.json", "users_id");
const answersCount = parseFile("oslo-answers-count.json", "a_owner_user_id");
const badgesCountClasses = parseFile("oslo-badges-count-classes.json", "users_id", "badges_class");

const data = [];

for (let i in users) {
	const user = users[i];
	user.questions = questions[user.id];
	user.positiveAnswers = positiveAnswers[user.id];
	user.answersCount = answersCount[user.id];
	user.badges = badges[user.id];
	user.badgesCountClasses = badgesCountClasses[user.id];
	data.push(user);
}

const jsonFileString = "let users = " + JSON.stringify(data);

fs.writeFileSync("stackoverflow-processed.js", jsonFileString, 'utf8');