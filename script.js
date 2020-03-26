const testWrapper = document.querySelector(".test-wrapper");
const mistakes = document.querySelector("#mistakes");
const kps = document.querySelector("#kps");
const wpm = document.querySelector("#wpm");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector('#origin-text p').innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var mistake = 0; 
var words = [];



function leadingZero(time){
	if( time <= 9 ){
		time = "0" + time;
	}
	return time;
}

	


function runTimer(){
	let currentTime = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor((timer[3]/100)/60);
	timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
	timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0]*6000));
}
	

function spellCheck(key){
	let textEntered = testArea.value;
	let originTextMatch = originText.substring(0,textEntered.length);

	if(textEntered == originText){
		clearInterval(interval);
		testWrapper.style.borderColor = "#95ff35";
		testArea.style.background= "rgba(149, 255, 51, 0.48)";
		if(mistake === 0){
			mistakes.innerHTML = "<span class='c-green'>Perfect, no mistakes</span>";
		}else if(mistake > 1){
			mistakes.innerHTML = "<span class='c-red'>"+mistake +" mistakes</span>";
		}else{
			mistakes.innerHTML = "<span class='c-red'>Only 1 mistake</span>";
		}
		let typingSec = theTimer.innerHTML.substring(3,5);
		
		let typingSpeedkps = Math.round((textEntered.length/typingSec) * 100)/100;

		kps.innerHTML = "<b>Your speed:</b><br> "+ typingSpeedkps+ " keys per second";
		words = textEntered.split(" ");	

		let typingMin = theTimer.innerHTML.substring(0,2);
		if(typingMin>0){
				let typingSpeedwpm = Math.round((words.length/typingMin) * 100)/100;
				wpm.innerHTML = typingSpeedwpm+" wpm<i class='small'> (words per minute)</i>";
		}
	


	}else{
		if(textEntered == originTextMatch){
			testWrapper.style.borderColor = "#666fff";
			testArea.style.background = "rgba(102, 111, 255, 0.38)";
		}else{
			if(key.keyCode != 8){
				console.log("Here is a "+mistake++);
			}
			
			testWrapper.style.borderColor = "#ff002f";
			testArea.style.background = "rgba(255, 0, 47, 0.38)";
		}
	}
	//console.log(textEntered);
}

function start(){
	let textEnteredLength = testArea.value.length;
	if( textEnteredLength === 0 && !timerRunning){
		timerRunning = true;
		interval = setInterval(runTimer, 10);
	}
	console.log(textEnteredLength);


}



function reset(){
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerRunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	kps.innerHTML="";
	wpm.innerHTML = "";
	mistakes.innerHTML = "";
	mistake = 0; 
	words = [];
	testWrapper.style.borderColor = "#ddd";
	testArea.style.background = "rgba(255, 255, 255, 0.38)";
}



testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
