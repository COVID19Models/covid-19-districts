const URL = window.location.hostname === ('127.0.0.1' || 'localhost') ? 'http://localhost:3000' : 'https://cryptic-bastion-76974.herokuapp.com';
// const URL = "";
const entries=[];
const database = [];
const dates1=[];
const dates2=[];
const dates3=[];
const projection_length = 61;
const final_date = new Date(2020,7,31);
var size1,size2,size3;



const ctx1 = document.getElementById('myChart1').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');
const ctx4 = document.getElementById('myChart4').getContext('2d');
const ctx5 = document.getElementById('myChart5').getContext('2d');
const ctx6 = document.getElementById('myChart6').getContext('2d');
const ctx7 = document.getElementById('myChart7').getContext('2d');


window.onload = function () {


    if (location.hash) {
        window.scrollTo(0, 0);
    
};
   
    document.getElementById('customSwitch1').checked == false;
    initialise();
};

function log_scale(){

	if(document.getElementById('customSwitch1').checked == true){
		window.chart1.options.scales.yAxes[0].type =  'logarithmic';
        window.chart1.update();
        window.chart2.options.scales.yAxes[0].type =  'logarithmic';
        window.chart2.update();
        window.chart3.options.scales.yAxes[0].type =  'logarithmic';
        window.chart3.update();
        window.chart4.options.scales.yAxes[0].type =  'logarithmic';
        window.chart4.update();
        window.chart5.options.scales.yAxes[0].type =  'logarithmic';
        window.chart5.update();
        window.chart6.options.scales.yAxes[0].type =  'logarithmic';
        window.chart6.update();
   	}
	else{
		window.chart1.options.scales.yAxes[0].type =  'linear';
        window.chart1.update();	
        window.chart2.options.scales.yAxes[0].type =  'linear';
        window.chart2.update();	
        window.chart3.options.scales.yAxes[0].type =  'linear';
        window.chart3.update();	
        window.chart4.options.scales.yAxes[0].type =  'linear';
        window.chart4.update();	
        window.chart5.options.scales.yAxes[0].type =  'linear';
        window.chart5.update();
        window.chart6.options.scales.yAxes[0].type =  'linear';
        window.chart6.update();	
	}
}

async function district_event(){

	 
	 var district = document.getElementById("district");
	 var state = document.getElementById("state");

	 
	 var selected_district = district.options[district.selectedIndex].value;
	 var selected_state = state.options[state.selectedIndex].value;
	 var parameters = {
	 	'state'      :  selected_state,
	 	'district'   :  selected_district
	 }
	 	// console.log('district event fired');

	 	const response = await fetch(URL+'/csv',{
		method: 'POST',
		// mode:'no-cors',		
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	database.push(json);

	console.log(json); 

	var population;
	entries[0].forEach((element)=>{
     	if(element.state === selected_state){   		
     		
     		for(let i =0; i<element.district.length ; i++){
     			if(element.district[i] === selected_district){
     				population = element.population[i];
     				break;
     			}
     		}
     	}
     });

	// console.log(population);
	draw_charts(json.actual,json.fit,json.projections,json.repr_ratio,population);
	log_scale();
	 
};

async function state_event(){

	 
	 var state = document.getElementById("state");
	 var district = document.getElementById("district");
	 
	 var selected_state = state.options[state.selectedIndex].value;
	 
	 entries[0].forEach((element)=>{
     	if(element.state === selected_state){
     		
     		district.innerHTML=`<div style="max-height:150px; overflow-y:scroll">`;
     		for(let i =0; i<element.district.length ; i++){
     			district.innerHTML += `<option value="${element.district[i]}">${element.district[i]}</option>`;
     		}
     		district.innerHTML += `</div>`;  
       	}
     });    

     await district_event(); 
}

async function populate_dropdown(){

	 var state = document.getElementById("state");
	 var district = document.getElementById("district");

	 state.innerHTML +=`<div style="max-height:150px; overflow-y:scroll">`;
	 entries[0].forEach((element)=>{
     		state.innerHTML += `<option value="${element.state}">${element.state}</option>`;
     	 	
     });
     district.innerHTML+=`</div>`;
	 var selected_state = state.options[state.selectedIndex].value;
	 entries[0].forEach((element)=>{
     	if(element.state === selected_state){
     		for(let i =0; i<element.district.length ; i++){
     			district.innerHTML += `<option value="${element.district[i]}">${element.district[i]}</option>`;
     		}
     	}
     });

	return 1;
}


async function initialise(){
const data = await fetch(URL+'/')
const json = await data.json();

entries.push(json.entries);
// console.log(entries);
populate_dropdown();
district_event();
}

async function draw_charts(actual,fit,projections,repr_ratio,population){

	size1 = actual.Infected.length;
	size2 = fit.Infected.length;
	size3 = projections.Infected.length;


	const actual_inf = [],fit_inf=[],proj_inf=[];
	const actual_des = [],fit_des=[],proj_des=[];
	const actual_rec = [],fit_rec=[],proj_rec=[];
	const actual_I_c = [],fit_I_c=[],proj_I_c=[];
	const fit_AI_cumul=[],proj_AI_cumul=[];
	const fit_ratio=[],proj_ratio=[];

		
	for(let i=0 ; i<size1 ; i++){

		date = new Date(final_date);
		date.setDate(final_date.getDate()-i);
		dates1.push(date);
		// dates3.push(date);
	}
	dates1.reverse();

	for(let i=0 ; i<size2 ; i++){

		date = new Date(final_date);
		date.setDate(final_date.getDate()-i);
		dates2.push(date);
		// dates3.push(date);
	}
	dates2.reverse();

	for(let i=0 ; i<size3; i++){

		date = new Date(final_date);
		date.setDate(final_date.getDate()+i);
		dates3.push(date);
	}

	for(let i=0 ; i<size1 ; i+=5){
		actual_inf.push({x:dates1[i],y:actual.Infected[i]});
		actual_des.push({x:dates1[i],y:actual.Deceased[i]});
		actual_rec.push({x:dates1[i],y:actual.Recovered[i]});
		actual_I_c.push({x:dates1[i],y:actual.I_c[i]});
	}

	for(let i=0 ; i<size2;i++){
		fit_inf.push({x:dates2[i],y:fit.Infected[i]});
		fit_des.push({x:dates2[i],y:fit.Deceased[i]});
		fit_rec.push({x:dates2[i],y:fit.Recovered[i]});
		fit_I_c.push({x:dates2[i],y:fit.I_c[i]});

		var y_temp = (1-(fit.Susceptible[i]/population))*population;
		fit_AI_cumul.push({x:dates2[i],y:y_temp});

		var z_temp = fit.Asymptomatic[i]/(fit.Infected[i]+fit.Asymptomatic[i]);
		fit_ratio.push({x:dates2[i],y:z_temp});

	}
	for(let i=0 ; i<projection_length ; i++){

		proj_inf.push({x:dates3[i],y:projections.Infected[i]});
		proj_des.push({x:dates3[i],y:projections.Deceased[i]});
		proj_rec.push({x:dates3[i],y:projections.Recovered[i]});
		proj_I_c.push({x:dates3[i],y:projections.I_c[i]});

		var y_temp = (1-(projections.Susceptible[i]/population))*population;
		proj_AI_cumul.push({x:dates3[i],y:y_temp});

		var z_temp = projections.Asymptomatic[i]/(projections.Infected[i]+projections.Asymptomatic[i]);
		proj_ratio.push({x:dates3[i],y:z_temp});

	}
	
	draw1(actual_inf,fit_inf,proj_inf);	
	draw2(actual_des,fit_des,proj_des);
	draw3(actual_rec,fit_rec,proj_rec);
	draw4(actual_I_c,fit_I_c,proj_I_c);
	draw5(fit_AI_cumul,proj_AI_cumul);
	draw6(fit_ratio,proj_ratio);
	draw7(repr_ratio);
}


function on_actual(){


	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += 'Date'+','+'Recovered'+','+'Deceased'+','+'Infected'+','+'Cumulative Infections'+'\n';
	for(let i=0 ; i<size1; i++){
		var date = dates1[i].getFullYear()+'-'+dates1[i].getMonth()+'-'+dates1[i].getDate();
		// var date = delhi[0].Ic[i].x.getFullYear()+'-'+delhi[0].Ic[i].x.getMonth()+'-'+delhi[0].Ic[i].x.getDate();
		var row = date+','+database[0].actual.Recovered[i]+','+database[0].actual.Deceased[i]+','+database[0].actual.Infected[i]+','+database[0].actual.I_c[i]+'\n';
		csvContent += row;
	}
	var name = database[0].state+'_'+database[0].district+'_actual.csv';
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", name);
	document.body.appendChild(link);

	link.click();
}

function on_fit(){

	// console.log();

	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += 'Date'+','+'Susceptible'+','+'Asymptomatic'+','+'Infected'+','+'Recovered'+','+'Deceased'+','+'Cumulative Infections'+'\n';
	for(let i=0 ; i<size2; i++){
		var date = dates2[i].getFullYear()+'-'+dates2[i].getMonth()+'-'+dates2[i].getDate();
		// var date = delhi[0].Ic[i].x.getFullYear()+'-'+delhi[0].Ic[i].x.getMonth()+'-'+delhi[0].Ic[i].x.getDate();
		var row = date+','+database[0].fit.Susceptible[i]+','+database[0].fit.Asymptomatic[i]+','+database[0].fit.Infected[i]+','+database[0].fit.Recovered[i]+','+database[0].fit.Deceased[i]+','+database[0].fit.I_c[i]+'\n';
		csvContent += row;
	}
	var name = database[0].state+'_'+database[0].district+'_fit.csv';
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", name);
	document.body.appendChild(link);

	link.click();
}

function on_projections(){

	// console.log(dates2);

	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += 'Date'+','+'Susceptible'+','+'Asymptomatic'+','+'Infected'+','+'Recovered'+','+'Deceased'+','+'Cumulative Infections'+'\n';
	for(let i=0 ; i<projection_length; i++){
		var date = dates3[i].getFullYear()+'-'+dates3[i].getMonth()+'-'+dates3[i].getDate();
		var row = date+','+database[0].projections.Susceptible[i]+','+database[0].projections.Asymptomatic[i]+','+database[0].projections.Infected[i]+','+database[0].projections.Recovered[i]+','+database[0].projections.Deceased[i]+','+database[0].projections.I_c[i]+'\n';
		csvContent += row;
	}
	var name = database[0].state+'_'+database[0].district+'_projections.csv';
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", name);
	document.body.appendChild(link);

	link.click();
}

document.getElementById("save1").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart1").toDataURL("image/jpg");
	 var a =  document.getElementById("save1");
	 a.href = url_base64jp;
});

document.getElementById("save2").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart2").toDataURL("image/jpg");
	 var a =  document.getElementById("save2");
	 a.href = url_base64jp;
});

document.getElementById("save3").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart3").toDataURL("image/jpg");
	 var a =  document.getElementById("save3");
	 a.href = url_base64jp;
});

document.getElementById("save4").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart4").toDataURL("image/jpg");
	 var a =  document.getElementById("save4");
	 a.href = url_base64jp;
});

document.getElementById("save5").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart5").toDataURL("image/jpg");
	 var a =  document.getElementById("save5");
	 a.href = url_base64jp;
});

document.getElementById("save6").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart6").toDataURL("image/jpg");
	 var a =  document.getElementById("save6");
	 a.href = url_base64jp;
});
document.getElementById("save7").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart6").toDataURL("image/jpg");
	 var a =  document.getElementById("save7");
	 a.href = url_base64jp;
});

function get_csv(){

	var csv = document.getElementById("csv");
	if(csv.selectedIndex == 1)
		on_actual();
	else if(csv.selectedIndex == 2)
		on_fit();
	else if (csv.selectedIndex == 3)
		on_projections();}

