const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(0,190,0)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)',
  white:'rgb(225,225,225)',
  black:'rgb(0,0,0,0.5)',

};

function updateScale(chart) {
            chart.options.scales.yAxes[0] = {
                type: 'logarithmic',
            }

            // chart.options.scales.yAxes[0].ticks.min = 1000;
            chart.update();

}

const round10 = (value, exp) => decimalAdjust('round', value, exp);
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}


function draw1(dataset1,dataset2,dataset3,dates3){

    config = {

	    type: 'line',
        // plugins: [ChartAnnotation],
        data: {
            labels: dates3,
            datasets: [{
                label: 'Actual',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:6,
                pointBackgroundColor:chartColors.red,
                order:2
            },
            {
                label: 'Model fit',
                data: dataset2,
                backgroundColor: [
                   chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                order:1

            },
            {
                label: 'Model projection',
                data: dataset3,
                backgroundColor: [
                    chartColors.green,
                ],
                borderColor: [
                    'rgb(0,190,0)',
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash: [10,5]

            }]
        },
        options: {
            responsive:true,
            bezierCurve: false,
            maintainAspectRatio: false,
            aspectRatio:2,
            plugins:{
            annotation: {
                   drawTime: 'afterDatasetsDraw',
                   annotations: [{
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: 100,
                        borderColor: 'green',
                        borderWidth: 1,
                }],
            },
            },
            label: {
                enabled: true,
                position: "center",
                content: '20'
            },
            scales: {                       
                    xAxes: [{

                        type:"time",
                        offset:true,
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0, 
                            autoSkip:false,
                            source:'lables',  
                            // stepSize:100,
                            // UnitStepSize:100,   
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }

                            },                      

                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    type:'linear',
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        autoSkip:false,

                        callback: function(value, index, values) {

                            if(this.type === 'logarithmic'){
                                const remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
                                }
                                 else {
                                 return '';
                                }
                            }
                            else{
                               return value/1000 + 'K';
                           }
                        },
                        fontSize:10,                  
                    },
                    // afterBuildTicks: function(scale) {
                    //     if(this.type === 'logarithmic'){
                    //     scale.ticks = ticks1;
                    //     return;
                    //     }
                    // },
                    //  beforeUpdate: function(scale) {
                    // return;
                    // },
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
                text: 'Projections for active infections',
                fontSize: 18
            },
                legend:{
                    reverse:true,
                    position:'top',
                    fullWidth:false,
                    display:true,

                    labels:{
                        position:'top',
                        align:'center',
                        // boxHeight: 1,
                        // boxWidth:20,   

                      usePointStyle:true, 
                      // pointStyle: "string",
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};
        config.options.legend.labels.boxHeight == 1;

       if(window.chart1 != undefined){
            window.chart1.destroy();
        }
        window.chart1 = new Chart(ctx1,config);         
        
}

function draw2(dataset1,dataset2,dataset3,dates3){

    config = {

        type: 'line',
        // labels:["Oct 19"],
        data: {
            datasets: [{
                label: 'Actual',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:6,
                pointBackgroundColor:chartColors.red,
                order:2
            },
            {
                label: 'Model fit',
                data: dataset2,
                backgroundColor: [
                   chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                order:1

            },
            {
                label: 'Model projection',
                data: dataset3,
                backgroundColor: [
                    chartColors.green,
                ],
                borderColor: [
                    chartColors.green,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash: [10,5]

            }]
        },
        options: {
            responsive:true,
            bezierCurve: false,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                   xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    type:'linear',
                    position:'left',
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        autoSkip:false,

                        callback: function(value, index, values) {

                            if(this.type === 'logarithmic'){
                                this.min = 1;
                                const remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
                                }
                                 else {
                                 return '';
                                }
                            }
                            else{
                               return value/1000 + 'K';
                           }
                        },
                        fontSize:10,                  
                    },
                    // afterBuildTicks: function(scale) {
                    //     if(this.type === 'logarithmic'){
                    //     scale.ticks = ticks1;
                    //     return;
                    //     }
                    // },
                    //  beforeUpdate: function(scale) {
                    // return;
                    // },
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
                text: 'Projections for total deceased',
                fontSize: 18
            },
                legend:{
                    reverse:true,
                    position:'top',
                    fullWidth:false,
                    display:true,

                    labels:{
                        position:'top',
                        align:'center',
                        // boxHeight: 1,
                        // boxWidth:20,   

                      usePointStyle:true, 
                      // pointStyle: "string",
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
    };

       if(window.chart2 != undefined){
            window.chart2.destroy();
        }
        window.chart2 = new Chart(ctx2,config);    
}

function draw3(dataset1,dataset2,dataset3){

     config = {

        type: 'line',
        data: {
            datasets: [{
                label: 'Actual',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:6,
                pointBackgroundColor:chartColors.red,
                order:2
            },
            {
                label: 'Model fit',
                data: dataset2,
                backgroundColor: [
                   chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                order:1

            },
            {
                label: 'Model projection',
                data: dataset3,
                backgroundColor: [
                    chartColors.green,
                ],
                borderColor: [
                    chartColors.green,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash: [10,5]

            }]
        },
        options: {
            responsive:true,
            bezierCurve: false,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    type:'linear',
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        autoSkip:false,

                        callback: function(value, index, values) {

                            if(this.type === 'logarithmic'){
                                const remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
                                }
                                 else {
                                 return '';
                                }
                            }
                            else{
                               return value/1000 + 'K';
                           }
                        },
                        fontSize:10,                  
                    },
                    // afterBuildTicks: function(scale) {
                    //     if(this.type === 'logarithmic'){
                    //     scale.ticks = ticks1;
                    //     return;
                    //     }
                    // },
                    //  beforeUpdate: function(scale) {
                    // return;
                    // },
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
                text: 'Projections for total recovered',
                fontSize: 18
            },
                legend:{
                    reverse:true,
                    position:'top',
                    fullWidth:false,
                    display:true,

                    labels:{
                        position:'top',
                        align:'center',
                        // boxHeight: 1,
                        // boxWidth:20,   

                      usePointStyle:true, 
                      // pointStyle: "string",
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
    };

       if(window.chart3 != undefined){
            window.chart3.destroy();
        }
        window.chart3 = new Chart(ctx3,config);    
}

function draw4(dataset1,dataset2,dataset3){

    var ticks1 = [0,1000, 10000,100000];
    config = {

        type: 'line',
        data: {
            datasets: [{
                label: 'Actual',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:6,
                pointBackgroundColor:chartColors.red,
                order:2
            },
            {
                label: 'Model fit',
                data: dataset2,
                backgroundColor: [
                   chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                order:1

            },
            {
                label: 'Model projection',
                data: dataset3,
                backgroundColor: [
                    chartColors.green,
                ],
                borderColor: [
                    chartColors.green,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash: [10,5]

            }]
        },
        options: {
            responsive:true,
            bezierCurve: false,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    type:'linear',
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        autoSkip:false,

                        callback: function(value, index, values) {

                            if(this.type === 'logarithmic'){
                                const remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
                                }
                                 else {
                                 return '';
                                }
                            }
                            else{
                               return value/1000 + 'K';
                           }
                        },
                        fontSize:10,                  
                    },
                    // afterBuildTicks: function(scale) {
                    //     if(this.type === 'logarithmic'){
                    //     scale.ticks = ticks1;
                    //     return;
                    //     }
                    // },
                    //  beforeUpdate: function(scale) {
                    // return;
                    // },
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
                text: 'Projections for cumulative infections',
                fontSize: 18
            },
                legend:{
                    reverse:true,
                    position:'top',
                    fullWidth:false,
                    display:true,

                    labels:{
                        position:'top',
                        align:'center',
                        // boxHeight: 1,
                        // boxWidth:20,   

                      usePointStyle:true, 
                      // pointStyle: "string",
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
    };

       if(window.chart4 != undefined){
            window.chart4.destroy();
        }
        window.chart4 = new Chart(ctx4,config);    
}

function draw5(dataset1,dataset2){

    config = {

        type: 'line',
        data: {
            datasets: [{
                label: 'Past',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                pointBackgroundColor:chartColors.red,

            },
            {
                label: 'Projections',
                data: dataset2,
                backgroundColor: [
                    chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash:[10,5],

            }]
        },
        options: {
            responsive:true,
            bezierCurve: false,            
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }
                            },                         
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
                        // autoSkip:false,
                        fontSize:10,     
                         autoSkip:false,

                        callback: function(value, index, values) {

                            if(this.type === 'logarithmic'){
                                const remain = value / (Math.pow(10, Math.floor(Chart.helpers.log10(value))));
                                if(value == 1 || value == 10 || value == 100 ){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K';
                                }
                                else if(value == 1000000){
                                        return (new Number(value/1000000).toLocaleString()) + 'M' ;
                                }
                            
                                 else {
                                 return '';
                                }
                            }
                            else{
                               if(value<1000000) 
                                return value/1000 + 'K';
                            else
                                return value/1000000 + 'M'; 
                           }
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
                text: 'Total infections (Including asymptomatics)',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'center',
                        usePointStyle:true,
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
    };

       if(window.chart5 != undefined){
            window.chart5.destroy();
        }
        window.chart5 = new Chart(ctx5,config);    
}

function draw6(dataset1,dataset2){

    // console.log(dataset1.length)

    config = {

        type: 'line',
        data: {
            datasets: [{
                label: 'Past',
                data: dataset1,
                borderColor: [
                    chartColors.red,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                pointBackgroundColor:chartColors.red,
                lineTension: 0,
            },
            {
                label: 'Projections',
                data: dataset2,
                backgroundColor: [
                    chartColors.blue,
                ],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:true,
                borderWidth: 3,
                fill:false,
                pointRadius:0,
                borderDash:[10,5],

            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    annotation: {
        annotations: [
          {
            drawTime: "afterDatasetsDraw",
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: date,
            borderWidth: 5,
            borderColor: "red",
            label: {
              content: "TODAY",
              enabled: true,
              position: "top"
            }
          }
        ]
      },
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:5,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            callback:function(value,index,values){

                                if(index == values.length-1 || index%55 == 0){
                                // console.log(value);
                                return value;
                            }
                            },                         
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
                text: 'Fraction of asymptomatics',
                fontSize: 18,

            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'center',
                        usePointStyle:true,
                        padding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
    };

       if(window.chart6 != undefined){
            window.chart6.destroy();
        }
        window.chart6 = new Chart(ctx6,config);    
}