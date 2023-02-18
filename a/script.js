/* HEY YOU, 
could you not judge my shitty code, yah snoop? Jeeeez. 
- xoxoxo chelsea */


let data, fields, saves;

document.addEventListener("DOMContentLoaded", function(event) {

    console.log('DOM ready');

    //set up localstorage
    if(localStorage.saves == null) {
        saves = [];
        localStorage.saves = JSON.stringify(saves);
    } else {
        if(localStorage.saves) {
            saves = JSON.parse(localStorage.saves);
        } else {
            saves = [];
        }
        generateSavedNPCs(saves); 
    }

    //Google sheet data
    Papa.parse('https://docs.google.com/spreadsheets/d/1PB8o8w9kHG5eJ9SatDOFxfI3W6ELl2wbmX8lnwS6Xk0/gviz/tq?tqx=out:csv&sheet=data', { download: true,  header: true, complete: results => { fields = results.meta.fields; data = filterData(results.data, results.meta.fields); }})

    //Local data
    // Papa.parse('./a/data/data.csv', { download: true,  header: true, complete: results => {  fields = results.meta.fields; data = filterData(results.data, results.meta.fields);  }})


    //listen for saving npcs
    let generate = document.querySelector('.generate-content');
    generate.addEventListener('click', function (event) {
        if (event.target.classList.contains('save-npc')) {
            let savedNPC = event.target.parentElement;
            saves.push(savedNPC.innerHTML );
            localStorage.saves = JSON.stringify(saves);
            generateSavedNPCs(saves); 
            event.target.classList.add('saved');
        }
      });

    //listen for tabs
    let tabs = document.querySelector('.tabs-list');
    tabs.addEventListener('click', function (event) {
        if (event.target.classList.contains('tabs-btn')) {
            document.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            let target = event.target.dataset.id;

            if( target == 'saves') {
                document.querySelector('.tabs-container').classList.add('show-saves');
            } else if (target == 'generate') {
                document.querySelector('.tabs-container').classList.remove('show-saves');
            }
          
        }
      });

});



//genrate new NPCs
function generateNPCs () {
    
    //changes tabs to generate
    document.querySelector('.tabs-container').classList.remove('show-saves');
    document.querySelector('.active').classList.remove('active');
    document.querySelector("[data-id='generate']").classList.add('active');

    //clear tab
    document.querySelector(".generate-content").innerHTML = "";

    //grab n
    let n = document.querySelector('#number').value;
    
    //for n
    for (var i = 0; i < n; i++) {

        //build npc object
        let npc = {};

        for(j = 0; j < fields.length; j++) {
            //Select random options
            let max = data[fields[j]].length - 1;

            //Set data
            let select = randomNumber(max);
            
            npc[fields[j]] = data[fields[j]][select]
        }

        //clean up dndbeyond id
        statsName = npc.stats.split(/-(.*)/s)
        npc.statsName = statsName[1];

        //format html for npc
        let npcFormatted = `<ul><li class="title save-npc">${npc.firstname} ${npc.lastname}</li>`
        npcFormatted += `<li>${npc.race} &middot; ${npc.age} &middot; <a href="https://www.dndbeyond.com/monsters/${npc.stats}" target="_blank">${npc.statsName}</a></li>`
        npcFormatted += `<li>${npc.build} &middot; ${npc.detail}</li>`
        npcFormatted += `<li>${npc.personality}</li></ul>`

        //add npc to dom
        let html = document.createElement('div');
        html.className = 'npc';
        html.innerHTML = npcFormatted;
        document.querySelector(".generate-content").append(html);
    }
     
}

//generate saved npcs in saves tab
function generateSavedNPCs(saves){

    //clear tab
    document.querySelector(".saves-content").innerHTML = "";

    //loop through saved npcs and add to dom
    //or show empty state
    if(saves.length > 0) {
        for(i = 0; i < saves.length; i++) {
            let npcFormatted = `<ul>${saves[i]}</ul>`;
            let html = document.createElement('div');
            html.className = 'npc';
            html.innerHTML = npcFormatted;
            document.querySelector(".saves-content").append(html);
        }
        
    } else {
        document.querySelector(".saves-content").innerHTML = '<p>Click NPC names under the "New" tab to save them here.</p>';
    }

}

//clear saved npcs and tabs
function clearSaves(){
    if (window.confirm("Are you sure you want to clear your saved NPCs?")) {
        localStorage.clear();
        saves=[];
        generateSavedNPCs([]);
      }
}

//random number for npc data selection
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

//parse csv
function filterData(csv, headers){
    let filteredJSON = {};
    let filteredArray = [];

    for(i = 0; i < headers.length; i++) {
        filteredArray[i] = [];
    }

    csv.filter(function(data){

        for(i = 0; i < headers.length; i++) {
            let label = headers[i];
            if(data[label]){
                filteredArray[i].push(data[label]);
             }
        }
        
   })

   for(i = 0; i < headers.length; i++) {
        let label = headers[i];
        filteredJSON[label] = filteredArray[i];
    }

   return filteredJSON;
}