const tabSize = 8;
const getRandomInArray = array => {
	return array[Math.floor(Math.random() * array.length)];
}

const getRandomInFolder = async folder => {
	let files = (await fetchText(folder + "/index.txt")).split("\n");
	/* Remove empty string at end of array because of UNIX line ending */
	files = files.slice(0, -1);
	return fetchText(folder + "/" + getRandomInArray(files));
};


// Display cow
async function renderCow(options) {
	const cowModifiers = await fetchJSON("../cow-modifiers.json");
	const styleElement = document.createElement("style");
	styleElement.textContent = `
		html {
			background-color: ${options.backgroundColor};
			color: ${options.textColor};
		}
	`;
	document.head.appendChild(styleElement);

	let cow = await fetchText("../cows/" + options.cowType);

	// Remove non-cow lines
	cow = cow.match(/\$the_cow =.+\n([\S\s]*?)EOC/)[1];

	// "Unescape" backslashes
	cow = cow.replace(/\\\\/g, "\\");

	// Apply modifiers
	Object.entries(
		Object.assign(
			{},
			cowModifiers.default,
			cowModifiers[options.cowModifier]
		)
	).forEach(([key, value]) => {
		cow = cow.split("$" + key).join(value);
	});

	$("#cow").textContent = cow;
};

// Display dog of wisdom
async function renderDog(options) {
	const styleElement = document.createElement("style");
	styleElement.textContent = `
		#dog {
			position: relative;
			box-shadow: 70px 10px 0 0 rgba(198,134,66,1), 80px 10px 0 0 rgba(198,134,66,1), 100px 10px 0 0 rgba(198,134,66,1), 70px 20px 0 0 rgba(198,134,66,1), 80px 20px 0 0 rgba(198,134,66,1), 90px 20px 0 0 rgba(198,134,66,1), 100px 20px 0 0 rgba(198,134,66,1), 110px 20px 0 0 rgba(198,134,66,1), 80px 30px 0 0 rgba(198,134,66,1), 90px 30px 0 0 #000000, 100px 30px 0 0 rgba(198,134,66,1), 110px 30px 0 0 rgba(198,134,66,1), 120px 30px 0 0 rgba(198,134,66,1), 130px 30px 0 0 #000000, 80px 40px 0 0 rgba(198,134,66,1), 90px 40px 0 0 rgba(198,134,66,1), 100px 40px 0 0 rgba(201,189,189,1), 110px 40px 0 0 rgba(201,189,189,1), 120px 40px 0 0 rgba(201,189,189,1), 130px 40px 0 0 rgba(201,189,189,1), 80px 50px 0 0 rgba(198,134,66,1), 90px 50px 0 0 rgba(201,189,189,1), 100px 50px 0 0 rgba(201,189,189,1), 110px 50px 0 0 rgba(201,189,189,1), 120px 50px 0 0 rgba(201,189,189,1), 80px 60px 0 0 rgba(198,134,66,1), 90px 60px 0 0 rgba(201,189,189,1), 100px 60px 0 0 rgba(201,189,189,1), 110px 60px 0 0 rgba(198,134,66,1), 80px 70px 0 0 rgba(198,134,66,1), 90px 70px 0 0 rgba(201,189,189,1), 100px 70px 0 0 rgba(201,189,189,1), 110px 70px 0 0 rgba(198,134,66,1), 80px 80px 0 0 rgba(198,134,66,1), 90px 80px 0 0 rgba(201,189,189,1), 100px 80px 0 0 rgba(201,189,189,1), 110px 80px 0 0 rgba(198,134,66,1), 80px 90px 0 0 rgba(198,134,66,1), 90px 90px 0 0 rgba(201,189,189,1), 100px 90px 0 0 rgba(201,189,189,1), 110px 90px 0 0 rgba(198,134,66,1), 70px 100px 0 0 rgba(198,134,66,1), 80px 100px 0 0 rgba(198,134,66,1), 90px 100px 0 0 rgba(201,189,189,1), 100px 100px 0 0 rgba(201,189,189,1), 110px 100px 0 0 rgba(198,134,66,1), 70px 110px 0 0 rgba(198,134,66,1), 80px 110px 0 0 rgba(198,134,66,1), 90px 110px 0 0 rgba(201,189,189,1), 100px 110px 0 0 rgba(201,189,189,1), 110px 110px 0 0 rgba(198,134,66,1), 60px 120px 0 0 rgba(198,134,66,1), 70px 120px 0 0 rgba(198,134,66,1), 80px 120px 0 0 rgba(198,134,66,1), 90px 120px 0 0 rgba(201,189,189,1), 100px 120px 0 0 rgba(201,189,189,1), 110px 120px 0 0 rgba(198,134,66,1), 120px 120px 0 0 rgba(198,134,66,1), 130px 120px 0 0 rgba(143,140,140,1), 140px 120px 0 0 rgba(143,140,140,1), 150px 120px 0 0 rgba(143,140,140,1), 30px 130px 0 0 rgba(143,140,140,1), 40px 130px 0 0 rgba(143,140,140,1), 50px 130px 0 0 rgba(143,140,140,1), 60px 130px 0 0 rgba(198,134,66,1), 70px 130px 0 0 rgba(198,134,66,1), 80px 130px 0 0 rgba(198,134,66,1), 90px 130px 0 0 rgba(201,189,189,1), 100px 130px 0 0 rgba(201,189,189,1), 110px 130px 0 0 rgba(198,134,66,1), 120px 130px 0 0 rgba(198,134,66,1), 130px 130px 0 0 rgba(232,232,232,1), 140px 130px 0 0 rgba(232,232,232,1), 150px 130px 0 0 rgba(232,232,232,1), 160px 130px 0 0 rgba(143,140,140,1), 20px 140px 0 0 rgba(143,140,140,1), 30px 140px 0 0 rgba(232,232,232,1), 40px 140px 0 0 rgba(232,232,232,1), 50px 140px 0 0 rgba(198,134,66,1), 60px 140px 0 0 rgba(232,232,232,1), 70px 140px 0 0 rgba(198,134,66,1), 80px 140px 0 0 rgba(232,232,232,1), 90px 140px 0 0 rgba(232,232,232,1), 100px 140px 0 0 rgba(232,232,232,1), 110px 140px 0 0 rgba(198,134,66,1), 120px 140px 0 0 rgba(232,232,232,1), 130px 140px 0 0 rgba(198,134,66,1), 140px 140px 0 0 rgba(201,189,189,1), 150px 140px 0 0 rgba(232,232,232,1), 160px 140px 0 0 rgba(232,232,232,1), 170px 140px 0 0 rgba(143,140,140,1), 10px 150px 0 0 rgba(143,140,140,1), 20px 150px 0 0 rgba(232,232,232,1), 30px 150px 0 0 rgba(232,232,232,1), 40px 150px 0 0 rgba(232,232,232,1), 50px 150px 0 0 rgba(201,189,189,1), 60px 150px 0 0 rgba(232,232,232,1), 70px 150px 0 0 rgba(201,189,189,1), 80px 150px 0 0 rgba(232,232,232,1), 90px 150px 0 0 rgba(232,232,232,1), 100px 150px 0 0 rgba(232,232,232,1), 110px 150px 0 0 rgba(201,189,189,1), 120px 150px 0 0 rgba(232,232,232,1), 130px 150px 0 0 rgba(232,232,232,1), 140px 150px 0 0 rgba(232,232,232,1), 150px 150px 0 0 rgba(232,232,232,1), 160px 150px 0 0 rgba(143,140,140,1), 170px 150px 0 0 rgba(143,140,140,1), 10px 160px 0 0 rgba(143,140,140,1), 20px 160px 0 0 rgba(232,232,232,1), 30px 160px 0 0 rgba(232,232,232,1), 40px 160px 0 0 rgba(232,232,232,1), 50px 160px 0 0 rgba(232,232,232,1), 60px 160px 0 0 rgba(232,232,232,1), 70px 160px 0 0 rgba(232,232,232,1), 80px 160px 0 0 rgba(232,232,232,1), 90px 160px 0 0 rgba(232,232,232,1), 100px 160px 0 0 rgba(232,232,232,1), 110px 160px 0 0 rgba(232,232,232,1), 120px 160px 0 0 rgba(232,232,232,1), 130px 160px 0 0 rgba(232,232,232,1), 140px 160px 0 0 rgba(143,140,140,1), 150px 160px 0 0 rgba(143,140,140,1), 160px 160px 0 0 rgba(232,232,232,1), 170px 160px 0 0 rgba(143,140,140,1), 10px 170px 0 0 rgba(143,140,140,1), 20px 170px 0 0 rgba(232,232,232,1), 30px 170px 0 0 rgba(232,232,232,1), 40px 170px 0 0 rgba(232,232,232,1), 50px 170px 0 0 rgba(232,232,232,1), 60px 170px 0 0 rgba(232,232,232,1), 70px 170px 0 0 rgba(232,232,232,1), 80px 170px 0 0 rgba(232,232,232,1), 90px 170px 0 0 rgba(232,232,232,1), 100px 170px 0 0 rgba(232,232,232,1), 110px 170px 0 0 rgba(232,232,232,1), 120px 170px 0 0 rgba(232,232,232,1), 130px 170px 0 0 rgba(232,232,232,1), 140px 170px 0 0 rgba(232,232,232,1), 150px 170px 0 0 rgba(232,232,232,1), 160px 170px 0 0 rgba(232,232,232,1), 170px 170px 0 0 rgba(143,140,140,1), 10px 180px 0 0 rgba(143,140,140,1), 20px 180px 0 0 rgba(232,232,232,1), 30px 180px 0 0 rgba(232,232,232,1), 40px 180px 0 0 rgba(232,232,232,1), 50px 180px 0 0 rgba(143,140,140,1), 60px 180px 0 0 rgba(232,232,232,1), 70px 180px 0 0 rgba(232,232,232,1), 80px 180px 0 0 rgba(232,232,232,1), 90px 180px 0 0 rgba(232,232,232,1), 100px 180px 0 0 rgba(232,232,232,1), 110px 180px 0 0 rgba(232,232,232,1), 120px 180px 0 0 rgba(232,232,232,1), 130px 180px 0 0 rgba(232,232,232,1), 140px 180px 0 0 rgba(232,232,232,1), 150px 180px 0 0 rgba(232,232,232,1), 160px 180px 0 0 rgba(143,140,140,1), 20px 190px 0 0 rgba(143,140,140,1), 30px 190px 0 0 rgba(143,140,140,1), 40px 190px 0 0 rgba(143,140,140,1), 50px 190px 0 0 rgba(232,232,232,1), 60px 190px 0 0 rgba(232,232,232,1), 70px 190px 0 0 rgba(232,232,232,1), 80px 190px 0 0 rgba(232,232,232,1), 90px 190px 0 0 rgba(232,232,232,1), 100px 190px 0 0 rgba(232,232,232,1), 110px 190px 0 0 rgba(232,232,232,1), 120px 190px 0 0 rgba(232,232,232,1), 130px 190px 0 0 rgba(232,232,232,1), 140px 190px 0 0 rgba(232,232,232,1), 150px 190px 0 0 rgba(232,232,232,1), 160px 190px 0 0 rgba(232,232,232,1), 170px 190px 0 0 rgba(143,140,140,1), 20px 200px 0 0 rgba(143,140,140,1), 30px 200px 0 0 rgba(232,232,232,1), 40px 200px 0 0 rgba(232,232,232,1), 50px 200px 0 0 rgba(232,232,232,1), 60px 200px 0 0 rgba(232,232,232,1), 70px 200px 0 0 rgba(232,232,232,1), 80px 200px 0 0 rgba(232,232,232,1), 90px 200px 0 0 rgba(232,232,232,1), 100px 200px 0 0 rgba(232,232,232,1), 110px 200px 0 0 rgba(232,232,232,1), 120px 200px 0 0 rgba(232,232,232,1), 130px 200px 0 0 rgba(232,232,232,1), 140px 200px 0 0 rgba(232,232,232,1), 150px 200px 0 0 rgba(232,232,232,1), 160px 200px 0 0 rgba(232,232,232,1), 170px 200px 0 0 rgba(143,140,140,1), 30px 210px 0 0 rgba(143,140,140,1), 40px 210px 0 0 rgba(232,232,232,1), 50px 210px 0 0 rgba(232,232,232,1), 60px 210px 0 0 rgba(232,232,232,1), 70px 210px 0 0 rgba(232,232,232,1), 80px 210px 0 0 rgba(143,140,140,1), 90px 210px 0 0 rgba(232,232,232,1), 100px 210px 0 0 rgba(232,232,232,1), 110px 210px 0 0 rgba(232,232,232,1), 120px 210px 0 0 rgba(232,232,232,1), 130px 210px 0 0 rgba(232,232,232,1), 140px 210px 0 0 rgba(232,232,232,1), 150px 210px 0 0 rgba(232,232,232,1), 160px 210px 0 0 rgba(232,232,232,1), 170px 210px 0 0 rgba(143,140,140,1), 30px 220px 0 0 rgba(143,140,140,1), 40px 220px 0 0 rgba(232,232,232,1), 50px 220px 0 0 rgba(232,232,232,1), 60px 220px 0 0 rgba(232,232,232,1), 70px 220px 0 0 rgba(232,232,232,1), 80px 220px 0 0 rgba(143,140,140,1), 90px 220px 0 0 rgba(232,232,232,1), 100px 220px 0 0 rgba(232,232,232,1), 110px 220px 0 0 rgba(232,232,232,1), 120px 220px 0 0 rgba(232,232,232,1), 130px 220px 0 0 rgba(143,140,140,1), 140px 220px 0 0 rgba(232,232,232,1), 150px 220px 0 0 rgba(232,232,232,1), 160px 220px 0 0 rgba(232,232,232,1), 170px 220px 0 0 rgba(143,140,140,1), 40px 230px 0 0 rgba(143,140,140,1), 50px 230px 0 0 rgba(232,232,232,1), 60px 230px 0 0 rgba(232,232,232,1), 70px 230px 0 0 rgba(232,232,232,1), 80px 230px 0 0 rgba(232,232,232,1), 90px 230px 0 0 rgba(143,140,140,1), 100px 230px 0 0 rgba(143,140,140,1), 110px 230px 0 0 rgba(143,140,140,1), 120px 230px 0 0 rgba(143,140,140,1), 130px 230px 0 0 rgba(232,232,232,1), 140px 230px 0 0 rgba(232,232,232,1), 150px 230px 0 0 rgba(232,232,232,1), 160px 230px 0 0 rgba(232,232,232,1), 170px 230px 0 0 rgba(143,140,140,1), 50px 240px 0 0 rgba(143,140,140,1), 60px 240px 0 0 rgba(143,140,140,1), 70px 240px 0 0 rgba(143,140,140,1), 80px 240px 0 0 rgba(143,140,140,1), 90px 240px 0 0 rgba(232,232,232,1), 100px 240px 0 0 rgba(232,232,232,1), 110px 240px 0 0 rgba(232,232,232,1), 120px 240px 0 0 rgba(232,232,232,1), 130px 240px 0 0 rgba(232,232,232,1), 140px 240px 0 0 rgba(232,232,232,1), 150px 240px 0 0 rgba(143,140,140,1), 160px 240px 0 0 rgba(143,140,140,1), 90px 250px 0 0 rgba(143,140,140,1), 100px 250px 0 0 rgba(143,140,140,1), 110px 250px 0 0 rgba(143,140,140,1), 120px 250px 0 0 rgba(143,140,140,1), 130px 250px 0 0 rgba(143,140,140,1), 140px 250px 0 0 rgba(143,140,140,1);
			height: 10.5px;
			width: 10.5px;
			margin-top: 0px;
			margin-bottom: 300px;
			margin-left: -10px;
		}
	`;
	document.head.appendChild(styleElement);
};

// Display fortune
const renderFortune = async () => {
	const fortunes = (await getRandomInFolder("../fortunes")).split("\n%\n")
	.filter(fortune => fortune.length !== 0);

	let fortuneLines = getRandomInArray(fortunes).split("\n");

	// Replace tabs with spaces so length checks work
	fortuneLines = fortuneLines.map(line => {
		return line.replace(/\t/g, " ".repeat(tabSize));
	});

	const maxWidth = fortuneLines.reduce((max, {length}) => {
		if(length > max) {
			return length;
		} else {
			return max;
		}
	}, 0);

	// Side bars
	fortuneLines = fortuneLines.map((line, index, {length}) => {
		const endPadding = " ".repeat(maxWidth - line.length);
		// Handle fortune being single line differently
		if(length === 1) {
			return "< "  + line + endPadding + " >";
		} else if(index === 0) {
			return "/ "  + line + endPadding + " \\";
		} else if(index === length - 1) {
			return "\\ " + line + endPadding + " /";
		} else {
			return "| "  + line + endPadding + " |";
		}
	});

	// Top and bottom bars, padded with space on the 2 sides
	fortuneLines.unshift(" " + "_".repeat(maxWidth + 2));
	fortuneLines.push(   " " + "-".repeat(maxWidth + 2));

	$("#speech").textContent = fortuneLines.join("\n");
};

async function renderPage(options) {
    await renderCow(options)
	await renderFortune()
	if (options.cowType == "template.cow") {
		await renderDog(options)
	}
}

(async () => {
	await chrome.storage.sync.get(
		Object.keys(await fetchJSON("../options/options.json")), renderPage
	);
})();

window.addEventListener('load', function(){ 
	document.body.style.opacity='1'; 
});