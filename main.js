let timeText = document.getElementById('time');
let timeLeftHourText = document.getElementById('timeLeftHour');
let timeLeftMinuteText = document.getElementById('timeLeftMinute');
let timeLeftSecondText = document.getElementById('timeLeftSecond');
let powerStatusText = document.getElementById('powerStatusText');

let timeLeftText = document.querySelectorAll('#timeLeftHour, #timeLeftMinute, #timeLeftSecond')
let timeSpacings = document.querySelectorAll('.timeSpacing');

// Color Codes

let colorList = {
    black: "#000",
    white: "#fff",
    green: "#27AE60",
    red: "#C44031",
    lightBlack: "#212121"
};

// Check Current Time

var timeHour;
var timeMinute;
var timeSecond;

var timeDate;
var timeMonth;

function checkTime(){
    setTimeout(()=>{
        timeHour = new Date().getHours();
        timeMinute = new Date().getMinutes();
        timeSecond = new Date().getSeconds();
        timeDate = new Date().getDate();
        timeMonth = new Date().getMonth();

        if(timeMinute < 10) {
            timeMinute = `0${timeMinute}`;
        } 

        if(timeMinute < 10) {
            timeMinute = `0${timeMinute}`;
        }   

        if(timeSecond < 10) {
            timeSecond = `0${timeSecond}`;
        }

        checkTimeLeft(+timeHour,+timeMinute,+timeSecond);
        checkTime();
    },100)
}

checkTime();

// ------------------------------------------------------------------------------------------------------------------------

// Checking Time Left

// let setTimeHours = [1,5,9,13,17,21];

var timeHourLeft;
var timeMinuteLeft;
var timeSecondLeft;

var currentPower;

function checkTimeLeft(currentHour,currentMinute,currentSecond) {
    setTimeout(()=>{
        for(let i = 0; i < 6; i++) {
            if(todayPowerOnHours[i] - currentHour > 0){
                changeSite(false);

                timeHourLeft = (todayPowerOnHours[i] - currentHour) - 1;
                break;
            }
            else if((todayPowerOnHours[i] + 4) - currentHour > 0) {
                changeSite(true);
                
                timeHourLeft = (todayPowerOnHours[i] - currentHour) + 3;
                break;
            }
        }

        timeMinuteLeft = (60 - currentMinute) - 1;

        timeSecondLeft = (60 - currentSecond);

        // Add "0" in front of times

        if(timeHourLeft < 10) {
            timeHourLeft = `0${timeHourLeft}`;
        } 

        if(timeMinuteLeft < 10) {
            timeMinuteLeft = `0${timeMinuteLeft}`;
        }   

        if(timeSecondLeft < 10) {
            timeSecondLeft = `0${timeSecondLeft}`;
        }

        timeLeftText[0].innerText = timeHourLeft;
        timeLeftText[1].innerText = timeMinuteLeft;
        timeLeftText[2].innerText = timeSecondLeft;

        // checkTimeLeft(+timeHour,+timeMinute,+timeSecond);
    },100)
}

function changeSite(x) {
    if(x == false){
        currentPower = x;

        document.body.style.backgroundColor = colorList.lightBlack;
        timeLeftText[0].style.backgroundColor = colorList.white;
        timeLeftText[1].style.backgroundColor = colorList.white;
        timeLeftText[2].style.backgroundColor = colorList.white;

        timeLeftText[0].style.color = colorList.black;
        timeLeftText[1].style.color = colorList.black;
        timeLeftText[2].style.color = colorList.black;

        timeSpacings.forEach((x) => {
            x.style.color = colorList.white;
        });

        powerStatusText.innerText = "Power Status: OFF";
        powerStatusText.style.backgroundColor = colorList.red;;
    }
    else if(x == true){
        currentPower = x;
            
        document.body.style.backgroundColor = colorList.white;
        timeLeftText[0].style.backgroundColor = colorList.black;
        timeLeftText[1].style.backgroundColor = colorList.black;
        timeLeftText[2].style.backgroundColor = colorList.black;

        timeLeftText[0].style.color = colorList.white;
        timeLeftText[1].style.color = colorList.white;
        timeLeftText[2].style.color = colorList.white;

        timeSpacings.forEach((x) => {
            x.style.color = colorList.black;
        });

        powerStatusText.innerText = "Power Status: ON"
        powerStatusText.style.backgroundColor = colorList.green;
    }
}

// ------------------------------------------------------------------------------------------------------------------------

// Power Outage Hours

let poweronhours = [
    {timeon:[5,17,25],date:[20,23,26,29],month:"0",group:"A"},
    {timeon:[13,25],date:[21,24,27,30],month:"0",group:"A"},
    {timeon:[9,21],date:[22,25,28,31],month:"0",group:"A"},

    {timeon:[9,21],date:[20,23,26,29],month:"0",group:"B"},
    {timeon:[5,17,25],date:[21,24,27,30],month:"0",group:"B"},
    {timeon:[13,25],date:[22,25,28,31],month:"0",group:"B"},

    {timeon:[13,25],date:[20,23,26,29],month:"0",group:"C"},
    {timeon:[9,21],date:[21,24,27,30],month:"0",group:"C"},
    {timeon:[5,17,25],date:[22,25,28,31],month:"0",group:"C"}
];

var todayPowerOnHours;
var selectedGroup = "A";

// todayPowerOnHours = poweronhours[0].timeon;
// console.log(todayPowerOnHours);

function checkTodayPowerOnHours(currentDate,currentMonth) {
    for(let i = 0; i < poweronhours.length; i++) {
        for(let d = 0; d < poweronhours[i].date.length; d++) {
            if(poweronhours[i].date[d] == currentDate && poweronhours[i].month == currentMonth && poweronhours[i].group == selectedGroup){
                todayPowerOnHours = poweronhours[i].timeon;
                break;
            }
        }
    }
}

setTimeout(()=>{checkTodayPowerOnHours(timeDate,timeMonth)},100)

// Change Group

function changeGroup(group) {
    selectedGroup = group;
    document.getElementById("groupText").innerText = `Group ${selectedGroup}`;
    checkTodayPowerOnHours(timeDate,timeMonth);
}

// Version 1.0
