// window.jsPDF = require('jspdf');	

	const ctx1 = document.getElementById('myChart1').getContext('2d');
	const ctx2 = document.getElementById('myChart2').getContext('2d');
	const ctx3 = document.getElementById('myChart3').getContext('2d');
	const ctx4 = document.getElementById('myChart4').getContext('2d');
	const ctx5 = document.getElementById('myChart5').getContext('2d');
	const ctx6 = document.getElementById('myChart6').getContext('2d');


const del_tab = document.getElementById("Delhi");
const mum_tab = document.getElementById("Mumbai");
const ben_tab = document.getElementById("Bengaluru");

console.log(window.location.hostname);
const URL = window.location.hostname === ('127.0.0.1' || 'localhost') ? 'http://localhost:3000' : 'https://dstsupermodel.herokuapp.com';
const delhi=[];
const mumbai=[];
const bengaluru=[];
const delData=[];
const mumData=[];
const benData=[];
const date_db=[];


initialise();
			
	
// async function get_json(){

// 	url="https://api.covid19india.org/raw_data1.json";
// 	const data = await fetch(url);
// 	const json = await data.json();
// 	// let date = Date.parse(json.raw_data[0].dateannounced);
// 	const date = await Date.parse(json.raw_data[0].dateannounced);
// 	// const date = await new Date();
// 	// Date.setMonth(3);
// 	// Date.setYear(2020);

// 	// date_db.push(date);
// 	// console.log(json.raw_data[0].dateannounced);
// 	console.log(date.getMonth);
// }

async function initialise(){
const data = await fetch(URL+'/')
const json = await data.json();

// console.log("inside initialise");
console.log(json);

delhi.push(json.delhi);
mumbai.push(json.mumbai);
bengaluru.push(json.bengaluru);
delData.push(json.delData);
mumData.push(json.mumData);
benData.push(json.benData);

await on_delhi();

// console.log(delhi[0]);
// console.log(delhi[0].Ic);
// draw_delhi(delhi,delData);
}

async function On_Plot(){

	console.log("Inside OnPLot");
	const form = document.getElementById("form");
	const formData = new FormData(form);
	const parameters = {'Beta0' : formData.get('Beta0'),
						'Beta1':formData.get('Beta1'),
						'Beta2':formData.get('Beta2'),
						'Gamma1':formData.get('Gamma1'),
						'Gamma2':formData.get('Gamma2'),
						'Delta':formData.get('Delta'),
						'Gamma_D':formData.get('Gamma_D'),
						'phi':formData.get('Phi'),
						'A0' : formData.get('A0'),
						'I0' : formData.get('I0'),
						'S0' : formData.get('S0'),
						'R0' : formData.get('R0'),
						'N' : formData.get('N'),
					};
	console.log("parameters done");
	console.log(parameters);	

	if(del_tab.checked == true){
	const response = await fetch(URL+'/delhi',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	console.log(json);
	db_update(json);
	draw_delhi();
	}
	if(mum_tab.checked == true){
	const response = await fetch(URL+'/mumbai',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	db_update(json);
	draw_mumbai();
	}
	if(ben_tab.checked == true){
	const response = await fetch(URL+'/bengaluru',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	db_update(json);
	draw_bengaluru(); 
	}			
}

async function parse_date(data){

	const deldata=[];	
	for(let i=0 ; i<date_string.length ; i++){
		let p = date_string[i].split("-");
		// console.log(p[2], p[1], p[0]);
		date.push(new Date(p[0],p[1]-1,p[2]));
	}
	return date;
} 

async function on_delhi(){


	var N = 1.8e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);
 	
	document.getElementById("Beta0").defaultValue = "0.26";
    document.getElementById("Beta1").defaultValue = "0.14";
    document.getElementById("Beta2").defaultValue = "0.09";
    document.getElementById("Gamma1").defaultValue = "0.039";
    document.getElementById("Gamma2").defaultValue = "0.1";
    document.getElementById("Delta").defaultValue = "0.01";
    document.getElementById("Gamma_D").defaultValue = "0.004";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";
    document.getElementById("Phi").defaultValue = "1.0";
    
    await draw_delhi();
}

async function on_bengaluru(){
    
    var N = 1.23e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);

    document.getElementById("Beta0").defaultValue = "0.05";
    document.getElementById("Beta1").defaultValue = "0.18";
    document.getElementById("Beta2").defaultValue = "0.05";
    document.getElementById("Gamma1").defaultValue = "0.034";
    document.getElementById("Gamma2").defaultValue = "0.034";
    document.getElementById("Delta").defaultValue = "0.0006";
    document.getElementById("Gamma_D").defaultValue = "0.002";
    document.getElementById("Phi").defaultValue = "1.0";
    document.getElementById("A0").defaultValue = "0.26";
    document.getElementById("I0").defaultValue = "0.14";
    document.getElementById("S0").defaultValue = "0.09";
    document.getElementById("R0").defaultValue = "0.039";
    document.getElementById("N").defaultValue = "0.1";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";
      

    draw_bengaluru();
}

async function on_mumbai(){

	var N = 1.23e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);

    document.getElementById("Beta0").defaultValue = "0.3";
    document.getElementById("Beta1").defaultValue = "0.12";
    document.getElementById("Beta2").defaultValue = "0.09";
    document.getElementById("Gamma1").defaultValue = "0.029";
    document.getElementById("Gamma2").defaultValue = "0.07";
    document.getElementById("Delta").defaultValue = "0.0035";
    document.getElementById("Gamma_D").defaultValue = "0.003";
    document.getElementById("Phi").defaultValue = "1.0";
    document.getElementById("A0").defaultValue = "0.26";
    document.getElementById("I0").defaultValue = "0.14";
    document.getElementById("S0").defaultValue = "0.09";
    document.getElementById("R0").defaultValue = "0.039";
    document.getElementById("N").defaultValue = "0.1";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";

    await draw_mumbai();
}


async function draw_delhi(){

await draw1(ctx1,[delhi[0].Ac,delData[0].I]);
await draw2(ctx2,[delhi[0].Idot,delData[0].deltaA]);
await draw3(ctx3,[delhi[0].Ic,delData[0].Ic]);
await draw4(ctx4,[delhi[0].Ddot,delData[0].gammaDI]);
await draw5(ctx5,[delhi[0].Dc,delData[0].D]);
await draw6(ctx6,[delData[0].D,delData[0].AplusI,delData[0].AplusI_c,delData[0].Ic]);
}

async function draw_mumbai(){

await draw1(ctx1,[mumbai[0].Ac,mumData[0].I]);
await draw2(ctx2,[mumbai[0].Idot,mumData[0].deltaA]);
await draw3(ctx3,[mumbai[0].Ic,mumData[0].Ic]);
await draw4(ctx4,[mumbai[0].Ddot,mumData[0].gammaDI]);
await draw5(ctx5,[mumbai[0].Dc,mumData[0].D]);
await draw6(ctx6,[mumData[0].D,mumData[0].AplusI,mumData[0].AplusI_c,mumData[0].Ic]);
}

async function draw_bengaluru(){

await draw1(ctx1,[bengaluru[0].Ac,benData[0].I]);
await draw2(ctx2,[bengaluru[0].Idot,benData[0].deltaA]);
await draw3(ctx3,[bengaluru[0].Ic,benData[0].Ic]);
await draw4(ctx4,[bengaluru[0].Ddot,benData[0].gammaDI]);
await draw5(ctx5,[bengaluru[0].Dc,benData[0].D]);
await draw6(ctx6,[benData[0].D,benData[0].AplusI,benData[0].AplusI_c,benData[0].Ic]);
}

async function db_update(json){

delData.pop();
mumData.pop();
benData.pop();

delData.push(json.delData);
mumData.push(json.mumData);
benData.push(json.benData);
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

function On_Save(){
	// var	pdf = new jsPDF('l', 'pt',[400,400gt0]);
 //  	pdf.addImage($(myChart1), 'PNG', 0, 0);
  
 //  	// download the pdf
 //  	pdf.save('filename.pdf');
}
