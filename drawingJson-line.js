import {getMaxInObject, getMinInObject} from '../../util';

const _default_chart = {
    type: 'line',
    width: 400,
    height: 400,
    bgColor: '#fff',
    family: 'serial',
    padding: [20, 20, 20, 20],
    borderColor: '#eee',
    borderRadius:0,
    inverted:false,
    colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00", "#24CBE5", "#64E572", "#FF9655", "#FFF263", "#6AF9C4"]
};

const _default_title = {
    text: '',
    hAlign: 'center',
    vAlign: 'top',
    floating: false,
    useHtml: false,
    font_props: {
        size: 16,
        family: 'serif',
        color: 'black',
    },
};

const _default_subtitle = {
    text: '',
    hAlign: 'center',
    vAlign: 'top',
    floating: false,
    useHtml: false,
    font_props: {
        size: 12,
        family: 'serif',
        color: 'black',
    },
};

const _default_legend = {
    enabled:false,
    hAlign:'left',
    vAlign:'bottom',
    floating:false,
    borderColor:'#000',
    borderWidth:1,
    bgColor:'red',
    layout:'horizontal',
    itemDistance:12,
    font_props:{
        size: 12,
        family: 'serif',
        color: 'black',
    },
    title:{
        text:'',
        useHtml:false,
        font_props:{
            size: 12,
            family: 'serif',
            color: 'black',
        }
    },
    useHtml:false
};

const _default_xAxis = {
    alignTicks:true,
    allowDecimals:false,
    endOnTick:false, 
    axisLine:{
        color:"#000",
        width:1,
        offset:1
    },
    axisLabel:{
        enabled:true,
        allowOverlap:false,
        align:"left",
        format:"",                    
        x:0,
        y:0,
        prefix:'',
        suffix:''
    },
    plotLines:[],
    plotBands:[],
};

const _default_yAxis = _default_xAxis;

const _default_xAxis_title = {
    text:'',
    hAlign:'center',
    useHtml:false,
    font_props:{
        family:'Arial',
        color:'#000',
        size:12
    }
};

const _default_yAxis_title = {
    text:'',
    vAlign:'center',
    useHtml:false,
    font_props:{
        family:'Arial',
        color:'#000',
        size:12
    }
};


const _default_tooltip = {
    enabled: false,
    style: {
        bgColor: "#fff",
        borderColor: "#0c9ffa",
        borderWidth: 1,
        borderRadius: 3
    },
    font_props: {
        family: 'Arial',
        color: '#000',
        size: 10
    },
    useHtml: false,
    animation: true,
    hideDelay: 500,
    padding: [20,20,20,20],
    shadow: true,
    valueDecimals: 0,
    valuePrefix: "",
    valueSuffix: "",
    isFixed: false,
    positioner: {
        x: 10,
        y: 10
    }
};

const _default_caption = {
    align: "left",
    floating: false,
    padding: [20,20,20,20],
    style: {
        color: "#666666"
    },
    text: "",
    useHTML: false,
    verticalAlign: "bottom",
    x: 0,
    y: 0
};

const _default_plotLineProps = {

};

const _default_plotBandProps = {

};
// TODO: Get scale Type from scale constants.
const _getScaleData = (seriesList, axis, axisId, axisType, isMutlipleAxis) => {
    const type = axis.type ? axis.type : (axis.categories && axis.categories.length) ? 'band' : 'linear';

    if(axis.categories && axis.categorconvertToLineDrawingJsonies.length){
        return {
            type,
            domain:axis.categories
        }
    }

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    let objectKey = axisType === 'xAxis' ? 'x' : 'y';

    if(isMutlipleAxis){
       let respectiveSeries = seriesList.filter((series)=> series.id===axisId) ; 
       respectiveSeries =  respectiveSeries.length ? respectiveSeries : seriesList.filter((_,index)=> index===axisId);
       const {data} =respectiveSeries;
       min = Math.min(min, getMinInObject(objectKey, data));
       max = Math.max(max, getMaxInObject(objectKey, data));
    }else{
        seriesList.forEach((series)=>{
            const {data} = series;
            min = Math.min(min, getMinInObject(objectKey, data));
            max = Math.max(max, getMaxInObject(objectKey, data));            
        });         
    }
    return {
        type,
        domain:[min,max]
    };
}

const _extractMinorLinePropsFromAxis = (axis, type) => {
    let {gridLines:{minorGLEnabled=false,minorGLType='dash',minorGLColor='#000'}={}} = axis;
    return {
        enabled:minorGLEnabled,
        dashStyle:minorGLType,
        color:minorGLColor
    };
};

const _extractMajorLinePropsFromAxis = (axis, type) => {
    let {gridLines:{majorGLEnabled=false,majorGLType='dash',majorGLColor='#000',majorGLCount=4}={}} = axis;
    return {
        enabled:majorGLEnabled,
        dashStyle:majorGLType,
        color:majorGLColor,
        count:majorGLCount
    };
};

const _extractTitlePropsFromAxis = (axis, type) => {
    const {title={}} = axis;
    if (type === 'xAxis') {
        return Object.assign({}, title, _default_xAxis_title);
    } else {
        return Object.assign({}, title, _default_yAxis_title);
    }
};

const _extractAxisPropsFromAxis = (axis, type) => {
    const {alignTicks=false, allowDecimals=false, ceiling=0, floor=0, alternateGridColor='#000', startOnTick=false, endOnTick=false,prefix='',suffix=''} = axis;
    return {
        alignTicks,
        allowDecimals,
        ceiling,
        floor,
        alternateGridColor,
        startOnTick,
        endOnTick,
        prefix,
        suffix
    };
};

const _extractAxisLineFromAxis = (axis, type) => {
    const {axisLine:{color='#000',width=1,offset=0}} = axis;
    return {
        color,width,offset
    };
};

const _extractAxisLabelsFromAxis = (axis, type) => {
    const {axisLabel:{enabled=true,allowOverlap=false,align='left',format="",x=0,y=0}} = axis;
    return {
        enabled,
        allowOverlap,
        align,
        format,
        x,
        y
    };
};

const _extractTickPropsFromAxis = (axis, type) => {
    const {tick:{count=10,width=2,color='#000',length='12',interval=1,position='outside'}={}} = axis;
    return {
        count,
        width,
        color,
        length,
        interval,
        position
    };
};

const _extractPlotLinePropsFromAxis = (axis, type) => {
    const {plotLines=[]} = axis;
    return plotLines.map((plotLine)=>{
        return Object.assign({},plotLine,_default_plotLineProps);
    });
};

const _extractPlotBandPropsFromAxis = (axis,type) => {
    const {plotBands=[]} = axis;
    return plotBands.map((plotBand)=>{
        return Object.assign({},plotBand,_default_plotBandProps);
    });
};

export const convertToLineDrawingJson = ({meta}) => {
    const drawingJson = {};
    drawingJson.chart = Object.assign({}, _default_chart, meta.chart);
    drawingJson.title = Object.assign({}, _default_title, meta.title);
    drawingJson.subtitle = Object.assign({}, _default_subtitle, meta.subtitle);
    drawingJson.legend = Object.assign({}, _default_legend, meta.legend); 
    drawingJson.caption = Object.assign({}, _default_caption, meta.caption);
    drawingJson.tooltip = Object.assign({}, _default_tooltip, meta.tooltip)

    let {series=[], xAxis, yAxis} = meta;

        if(xAxis && xAxis.length){
            xAxis.forEach((elem,index) => {
                xAxis[index] = Object.assign({}, _default_xAxis, elem)
            })
        }
        else{
            xAxis = [_default_xAxis]
        }

        if(yAxis && yAxis.length){
            yAxis.forEach((elem,index) => {
                yAxis[index] = Object.assign({}, _default_yAxis, elem)
            })
        }
        else{
            yAxis = [_default_yAxis]
        }

        drawingJson.series = series;
        
    const isMultipleYAxis = yAxis.length > 1;
    const isMultipleXAxis = xAxis.length > 1;

    // xAxis
    drawingJson.xAxis = xAxis.map((axis,index) =>{
        return {
            id: index,
            scale: _getScaleData(series,axis,index,'xAxis',isMultipleXAxis),
            minorLine: _extractMinorLinePropsFromAxis(axis, 'xAxis'),
            majorLine: _extractMajorLinePropsFromAxis(axis, 'xAxis'),
            title: _extractTitlePropsFromAxis(axis, 'xAxis'),
            axis_props: _extractAxisPropsFromAxis(axis, 'xAxis'),
            tick: _extractTickPropsFromAxis(axis, 'xAxis'),
            plotLines: _extractPlotLinePropsFromAxis(axis, 'xAxis'),
            plotBands: _extractPlotBandPropsFromAxis(axis, 'xAxis'),
            axisLine: _extractAxisLineFromAxis(axis,'xAxis'),
            axisLabel: _extractAxisLabelsFromAxis(axis,'xAxis')
        }
    });
        
    //yAxis
    drawingJson.yAxis = yAxis.map((axis,index) =>{
        return {
            id: index,
            scale: _getScaleData(series,axis,index,'yAxis',isMultipleYAxis),
            minorLine: _extractMinorLinePropsFromAxis(axis, 'yAxis'),
            majorLine: _extractMajorLinePropsFromAxis(axis, 'yAxis'),
            title: _extractTitlePropsFromAxis(axis, 'yAxis'),
            axis_props: _extractAxisPropsFromAxis(axis, 'yAxis'),
            tick: _extractTickPropsFromAxis(axis, 'yAxis'),
            plotLines: _extractPlotLinePropsFromAxis(axis, 'yAxis'),
            plotBands: _extractPlotBandPropsFromAxis(axis, 'yAxis'),
            axisLine: _extractAxisLineFromAxis(axis,'yAxis'),
            axisLabel: _extractAxisLabelsFromAxis(axis,'yAxis')
        }
    });

    return drawingJson;

};
