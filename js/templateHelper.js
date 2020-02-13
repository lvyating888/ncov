
template.helper('getType', function (date) {
    return getType(date)
})
template.helper('moment',function(data){
    if(moment){
        return moment(data).format('YYYY-MM-DD HH:mm:ss');
    }
})