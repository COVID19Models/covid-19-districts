var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)',
  white:'rgb(225,225,225)',
  black:'rgb(0,0,0,0.5)',

};


function draw1(ctx,Input){

	if(window.chart1 != undefined){
			window.chart1.destroy();
	}
	window.chart1 = new Chart(ctx,{

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
        	responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Active Infection',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        	},
        	// events:['hover','tooltips'],
        	tooltips: {enabled: true},
    		hover: {mode: null}
        }
	});
}

function draw2(ctx,Input){

	if(window.chart2 != undefined){
			window.chart2.destroy();
	}
	window.chart2 = new Chart(ctx,{

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
        	responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Daily Infection',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        	},
        	// events:['hover','tooltips'],
        	tooltips: {enabled: true},
    		hover: {mode: null}
        }
	});
}

function draw3(ctx,Input){

	if(window.chart3 != undefined){
			window.chart3.destroy();
	}
	window.chart3 = new Chart(ctx,{

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
        	responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Total Infection',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        	},
        	// events:['hover','tooltips'],
        	tooltips: {enabled: true},
    		hover: {mode: null}
        }
	});
}
function draw4(ctx,Input){

	if(window.chart4 != undefined){
			window.chart4.destroy();
	}
	window.chart4 = new Chart(ctx,{

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
        	responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Daily Deaths',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        	},
        	// events:['hover','tooltips'],
        	tooltips: {enabled: true},
    		hover: {mode: null}
        }
	});
}

function draw5(ctx,Input){

	if(window.chart5 != undefined){
			window.chart5.destroy();
	}
	window.chart5 = new Chart(ctx,{

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        exportEnabled: true,

        options: {
        	responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Total Deaths',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        	},
        	// events:['hover','tooltips'],
        	tooltips: {enabled: true},
    		hover: {mode: null}
        }
	});
}


function draw6(ctx,Input){

	    if(window.chart6 != undefined){
	    	window.chart6.destroy();
	    }
	    window.chart6 = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'I',
                data: Input[0],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: 'A+I',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,225,0,0.8)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: '(A+I)c',
                data: Input[2],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,0,225,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: 'Ic',
                data: Input[3],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,0,0,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
            responsive:true,
            scales: {
            	   	xAxes: [{

            	   		type:"time",
						// distribution: "series",
            	   		time: {
            	   		// parser: 'YYYY-MM-DD',
            	   		// unit : 'day',
            	   		// unitStepSize: 20,
            	   		displayFormats: {
            	   			'day': 'MMM D'
            	   			},
            	   		},
            	   		ticks: {
                        	beginAtZero: false,
                        	maxTicksLimit:4,
                        	fontSize:10,
                        	fontStyle:'normal',
                        	maxRotation:0,                       		
	                    },
            	   		gridLines: {
               				// display: false,
               				drawOnChartArea:false,
               				lineWidth:2,
              			},
            	   }],
                	yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                    	},
                        fontSize:10,                  
	                },
                    gridLines: {
               				 // display: false
               				drawOnChartArea:false,
               				drawBorder:true,
               				zeroLineWidth:2,
               				},

                	}]
            	},
            	fill : false,
            	title: {
                display: true,
                position:'top',
                text: 'Asymptomatic Infection',
                fontSize: 22
            },
            	legend:{
            		position:'top',
            		// usePointStyle:true,
            		boxWidth:10,
            	},
            	 layout: {
            	padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            }
        }
    });
}