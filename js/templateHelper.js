
template.helper('getType', function (date) {
    return getType(date)
})
template.helper('moment',function(data,type){
    if(moment){
        return moment(data).format(type);
    }
})