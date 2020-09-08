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


function draw1(dataset1,dataset2,dataset3){

    config = {

	    type: 'line',
        // plugins: [ChartAnnotation],
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
                              
                            callback:function(value,index,values){

                                if(index == values.length-1 || (index%50 == 0) && (index!==0)){
                                // console.log(value);
                                return value;
                            }

                            },                      

                        },
                        gridLines: {
                            display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
                            
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
                                else if(index == values.length -1 && value>1000)
                                {
                                    return (new Number(value/1000)).toLocaleString() + 'K';
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
                            display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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

function draw2(dataset1,dataset2,dataset3){

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

                                if(index == values.length-1 || (index%60 == 0 && index!=0)){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                             display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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
                             display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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

                                if(index == values.length-1 || (index%50==0 && index!=0)){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                             display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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
                                this.min = 1;
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
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
                             display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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

                                if(index == values.length-1 || (index%50==0 && index!=0)){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                              display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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
                                this.min = 1;
                                if(value == 1 || value == 10 || value == 100){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K'  ;
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
                              display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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

                                if(index == values.length-1 || (index%50==0 && index!=0)){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                              display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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
                                this.min = 1;
                                if(value == 1 || value == 10 || value == 100 ){
                                        return (new Number(value)).toLocaleString();
                                }
                                else if(value == 1000 || value == 10000 || value == 100000){
                                        return (new Number(value/1000)).toLocaleString() + 'K';
                                }
                                else if(value == 1000000){
                                        return (new Number(value/1000000).toLocaleString()) + 'M' ;
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
                               display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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
                pointBackgroundColor:'rgb(225,0,0,0.1)',
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

                                if(index == values.length-1 || (index%50==0 && index!=0)){
                                // console.log(value);
                                return value;
                            }
                            },                         
                        },
                        gridLines: {
                             display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        min:0,

                        fontSize:10,                  
                    },
                    gridLines: {
                              display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
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

function draw7(dataset){

    // var ticks1 = [0,1000, 10000,100000];
    config = {

        type: 'bar',
        data: {
            datasets: [{
                data: dataset,
                borderColor: [
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,
                    chartColors.red,                    
                ],
                 backgroundColor:[
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',
                    'rgb(255, 99, 132,0.2)',                    
                 ],
                 borderWidth:2,
                 barThickness: 30,
            }],
        },
        options: {
            responsive:true,
            bezierCurve: false,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{
                        type:"time",
                        time: {
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
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,
                            source:'lables',
                            autoSkip:false,
                            min : new Date(2020,4,5),
                            max : new Date(2020,8,15),
                            callback:function(value,index,values){                               
                                if(value=="Aug 15" || value=="Aug 31" || value=="May 15" || value=="May 30" || value=="Jun 15" || value=="Jun 30" || value=="Jul 15" || value=="Jul 31")
                                    // console.log(value);
                                return value;                            
                            },                         
                        },
                        gridLines: {
                            display: true,
                            zeroLineWidth:0,
                            zeroLineColor: 'rgb(225,225,225)',
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
                        },
                    }],
                    yAxes: [{
                    type:'linear',
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        autoSkip:false,                
                        fontSize:10, 
                        max:4,
                        min:0,                 
                        },
                        gridLines: {
                            display: true,
                            drawOnChartArea:true,
                            lineWidth:1,
                            borderDash:[10,5],
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Reproduction ratio',
                fontSize: 18
            },
                legend:{
                    // reverse:true,
                    // position:'top',
                    // fullWidth:false,
                    display:false,

                    // labels:{
                    //     position:'top',
                    //     align:'center',
                    //     // boxHeight: 1,
                    //     // boxWidth:20,   

                    //   usePointStyle:true, 
                    //   // pointStyle: "string",
                    //     padding:20,
                    // }
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

       if(window.chart7 != undefined){
            window.chart7.destroy();
        }
        window.chart7 = new Chart(ctx7,config);    
}

