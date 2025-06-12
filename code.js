let time=document.querySelector("#time") 
let but=document.querySelector("#stopwatch")
let alarm=document.querySelector("#alarm")
let func=document.querySelector("#func")
let area=document.querySelector("#area")
let x,clocktime
let hours=0,minutes=0,seconds=0

clock()

function clock() {
    clocktime=setInterval(() => {
        const now = new Date();
    const hours = now.getHours().toString(); 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
        time.textContent=`${hours}:${minutes}:${seconds}`
    }, 1000);
    
}


function stopwatch() {
    time.textContent="0:00:00"
     x=setInterval(() => {     
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        time.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}



but.addEventListener("click",()=>{

    if (but.getAttribute("id")==="stopwatch") {
        clearInterval(clocktime)
        but.setAttribute("id","stop")
        alarm.setAttribute("id","clock")
        but.textContent="STOP"
        alarm.textContent="CLOCK"
        stopwatch()
    }
    
    else if (but.getAttribute("id")==="stop") {
        
        clearInterval(x);
        but.textContent = "START"
        but.setAttribute("id", "start");
        
    }

    else if (but.getAttribute("id")==="start"){
        stopwatch()
        but.setAttribute("id","stop")
        but.textContent="STOP"
        ;
    }

    else if (but.getAttribute("id")==="cancel") {
        
        clearInterval(x)
        clock()
        alarm.setAttribute("id","alarm")
        alarm.textContent="ALARM"
        but.setAttribute("id","stopwatch")
        but.textContent="STOPWATCH"
    }
})

alarm.addEventListener("click",()=>{
    
    
    if (alarm.getAttribute("id")==="alarm") {
        clearInterval(clocktime)
        but.setAttribute("id", "cancel");
        but.textContent = "CANCEL";
        alarm.setAttribute("id","save")
        alarm.textContent="SAVE"
        time.innerHTML = `
        <input class="inp" type="number" min="0" max="23" value="0" id="alarmHours"> :
        <input class="inp" type="number" min="0" max="59" value="0" id="alarmMinutes"> : 
        <input class="inp" type="number" min="0" max="59" value="0" id="alarmSeconds">`

     }

     else if(alarm.getAttribute("id")==="clock"){
        clock()
        alarm.setAttribute("id","alarm")
        alarm.textContent="ALARM"
        clearInterval(x)
        but.setAttribute("id","stopwatch")
        but.textContent="STOPWATCH"
        hours=0
        minutes=0
        seconds=0

     }

     else if(alarm.getAttribute("id")==="save"){
     clock()
     but.setAttribute("id","stopwatch")
     but.textContent="STOPWATCH"
     alarm.setAttribute("id","alarm")
     alarm.textContent="ALARM"
     
     ring()
     }
})



function ring() {
    let set=document.createElement("div")
    set.classList.add("effect")
    const alarmHours = Number(document.querySelector("#alarmHours").value);
    const alarmMinutes = Number(document.querySelector("#alarmMinutes").value);
    const alarmSeconds = Number(document.querySelector("#alarmSeconds").value);
    set.innerText=`${alarmHours.toString().padStart(2, '0')}:${alarmMinutes.toString().padStart(2, '0')}:${alarmSeconds.toString().padStart(2, '0')}`
    area.append(set)
    
    setInterval(() => {
        const now = new Date();
    const hours = now.getHours(); 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

     if (`${hours}:${minutes}:${seconds}`===set.textContent) {
        alert("alarm ringing!!!")
        set.remove()
     }
    }, 1000);
}

