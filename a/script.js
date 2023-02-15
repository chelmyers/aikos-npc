let data, fields;

document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready

    console.log('DOM ready');

    Papa.parse('https://docs.google.com/spreadsheets/d/1PB8o8w9kHG5eJ9SatDOFxfI3W6ELl2wbmX8lnwS6Xk0/gviz/tq?tqx=out:csv&sheet=data', {
        download: true,
        header: true,
        complete: results => {
            console.log(results);
            fields = results.meta.fields;
            data = filterData(results.data, results.meta.fields);
            console.log(data);
        }
    })


    // Papa.parse('./a/data/data.csv', {
    //     download: true,
    //     header: true,
    //     complete: results => {
    //         console.log(results);
    //         fields = results.meta.fields;
    //         data = filterData(results.data, results.meta.fields);
    //         console.log(data);
    //     }
    // })

});


function generate () {
    

    document.querySelector(".generate").innerHTML = "";
    
    let n = 10;
    let options;
    
    for (var i = 0; i < n; i++) {

        // let prevNums = [];
        let npc = {};

        for(j = 0; j < fields.length; j++) {
            //Select random options
            let max = data[fields[j]].length - 1;

            //Set data
            let select = randomNumber(max);
            // let prevUsed = prevNums.includes(select);

            // do { 
            //     select = randomNumber(max);
            //     prevUsed = prevNums.includes(select);
            // } while (prevUsed == true);

            // prevNums.push(select);

            //grab random data
            // Insert into page

            

            npc[fields[j]] = data[fields[j]][select]

            let option = data[fields[j]][select];
        }

        

        statsName = npc.stats.split(/-(.*)/s)
        npc.statsName = statsName[1];

        console.log(npc);

        let npcFormatted = `<ul><li class="title">${npc.firstname} ${npc.lastname}</li>`
        npcFormatted += `<li>${npc.race} &middot; ${npc.age} &middot; <a href="https://www.dndbeyond.com/monsters/${npc.stats}" target="_blank">${npc.statsName}</a></li>`
        npcFormatted += `<li>${npc.build} &middot; ${npc.detail}</li>`
        npcFormatted += `<li>${npc.personality}</li><ul>`

        let html = document.createElement('div');
        html.className = 'npc';
        console.log(options);
        html.innerHTML = npcFormatted;
        document.querySelector(".generate").append(html);


    }
     
}


function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

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

//    console.log(filteredJSON);
   return filteredJSON;
}