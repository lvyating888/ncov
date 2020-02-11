/*-- 全选 保存属性 数组 initTablearr("类名",[数组名称],['属性名称']); --*/
function initTablearr(demo,arr,attrval){
    // console.log(demo,arr,attrval)
    $(demo).find("tbody input[name='checkData']").click(function(e){
        e.stopPropagation();
        /*console.log(demo,arr,attrval)*/
        for(var i=0;i<arr.length;i++){
            var checkvalue=$(this).attr(attrval[i]);
            if($(this).prop("checked")){
                $(this).parent().parent().addClass('active');
                if(arr[i].toString().indexOf(checkvalue)==-1){
                    arr[i].push(checkvalue)
                };
            }else{
                $(this).parent().parent().removeClass('active');
                if(arr[i].toString().indexOf(checkvalue)!=-1){
                    var deletearray=$.inArray(checkvalue,arr[i]);
                    arr[i].splice(deletearray,1);
                };
            }
        }
        // console.log(demo,arr,attrval)
    });
}

function checkall(obj,demo,arr,attrval) {
    console.log($(obj))

    $(obj).click(function(e){
        e.stopPropagation();
        console.log($(obj))
        console.log('diyici')
        /*console.log($(obj).prop('checked'))*/
        if($(obj).prop('checked')){
            $(obj).prop('checked','checked')
            var inputslis=$(demo).find("tbody input[name='checkData']");
            inputslis.prop("checked", true);
            for(var i=0;i<arr.length;i++) {
                for (var j = 0; j < inputslis.length; j++) {
                    var checkvalue = inputslis.eq(j).attr(attrval[i]);
                    inputslis.parent().parent().addClass('active');
                    if (arr[i].toString().indexOf(checkvalue) == -1) {
                        arr[i].push(checkvalue)
                    };
                }
            }
        }else{
            $(obj).prop('checked',false);
            var inputslis=$(demo).find("tbody input[name='checkData']");
            inputslis.prop("checked", false);
            for(var i=0;i<arr.length;i++) {
                for (var j = 0; j < inputslis.length; j++) {

                    var checkvalue = inputslis.eq(j).attr(attrval[i]);
                    inputslis.parent().parent().removeClass('active');
                    if (arr[i].toString().indexOf(checkvalue)  != -1) {
                        var deletearray = $.inArray(checkvalue, arr[i]);
                        arr[i].splice(deletearray, 1);
                    }
                    ;
                }
            }
        }
        /*console.log(demo,arr,attrval)*/
    })
}
function clearfrom(demo,fun) {
    /*$(":input");//选择的是所有元素，包括input,textarea,select,button*/
    $(demo).find('input[type="text"]').val('');
    $(demo).find('input[type="number"]').val('');
    $(demo).find('select').val("");
    $(demo).find('textarea').val('');
    $(demo).find('input[type="radio"]').removeAttr('checked');
    $(demo).find('input[type="checkbox"]').removeAttr('checked');
    if(fun){
        fun();
    }
   /* $('',demo).not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');*/
}
//将form中的值转换为键值对。
function getFormJson(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
}

/**
 * [通过参数名获取url中的参数值]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param  {[string]} queryName [参数名]
 * @return {[string]}           [参数值]
 */
function GetQueryValue(queryName) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) { return pair[1]; }
    }
    return null;
}

var Healthyobj = {
    '1' : '健康',
    '2' : '咳嗽打喷嚏',
    '3' : '发热（未就诊或医生诊断为普通发热）',
    '4' : '已就诊，被要求回家自行隔离观察',
    '5' : '已就医，被判定为【疑似】新型肺炎，留在医院隔离观察',
    '6' : '已就医，确诊为新型肺炎'
}

function getType(number) {
    return Healthyobj[number];
}

function dividata(demo,type,fun) {
    type=type?type:'';
    if(type==''){
        url='/publish/statis/memberDivi.json'
    }else{
        url='/statis/memberDivi.json'
    }
    $.ajax({
        type:'get',
        url:url,
        success:function (res) {
            console.log(res);
            console.log('+++++++++++++')
            for (var i = 0; i <res.data.length; i++) {
                var datainfo = res.data[i];
                $(demo).append(`
                        <option data-subtext="${datainfo.divi}" value="${datainfo.divi}">${datainfo.divi}</option>

                    `);
            }
            if(fun){
                fun();
            }
        }
    })
}