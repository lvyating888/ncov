/*  依赖jq json数据加入页面
	这个写的不好需要完善
	<input type="file" id="file" onchange="importf(this,'nowtable')" />
 */


	// 读取本地excel文件
	function readWorkbookFromLocalFile(file, callback) {
		var reader = new FileReader();
		////console.log(reader)
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {type: 'binary'});
			if(callback) callback(workbook);
		};
		reader.readAsBinaryString(file);
	}


	function readWorkbook(obj,workbook,table) {
		var html=""
		var sheetNames = workbook.SheetNames; // 工作表名称集合
		var worksheet = workbook.Sheets[sheetNames[0]]; // wb.SheetNames[0]这里我们只读取第一张sheet

		var table=table;
        if($('#'+table).attr('type')== 'json'){
            /* json写法 */
            var result = {};
            var length =0;
            workbook.SheetNames.forEach(function(sheetName) {
                length++;
                //console.log(sheetName)
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
                //console.log(roa)
                if(roa.length) result[sheetName] = roa;
            });
            //console.log(length)
            var jsondata=JSON.stringify(result, 2, 2);
            var jsondataone=result.Sheet1;
            // var jsondataonelength=result.Sheet1.length;

            if(jsondata.length > 0){
                var start = Number($('#startnum').val()!='' ? $('#startnum').val() : 0);
                var end = Number($('#endnum').val()!='' ? $('#endnum').val() : jsondata.length-1);
                //console.log(start)
                jsontable(obj,jsondataone,table);
                obj.value = '';
            }
            return;
        }
	}
	// 将json转换成表格
	function jsontable(obj,json,table){
		//obj 选择文件的input
		// start 从第几行开始 默认是0
		// end 从第几行结束 默认是最后一行
        var start = start ? start : 1;
        var end = end ? end : json.length-1;
		if(!json){
			alert('excal行列格式不规范,请重新选择');
			return;
		}
        for(var i=0;i<json.length;i++) {
            for (var j = 0; j < json[i].length; j++) {
                if (!json[i][j]) {
                    json[i][j] = ''
                }
                json[i][j]=json[i][j].replace(/[\r\n]/g,""); //去掉回车换行
            }
        }
        // console.log(json)
        var floathtml='';
        floathtml+='<div class="labelouttwo">'
        floathtml+='<p class="redword">请选择对应的列</p>'
        for (var i = 0; i < $('#'+table+' tr').eq(1).find('td').length;i++) {
            floathtml+='<div class="label labeltwo">'
            floathtml+='<div class="labellis">';
            if(($('#'+table+' tr').eq(1).find('td').eq(i).children().eq(0)).attr('id')){
                $('#'+table+' tr').eq(1).find('td').eq(i).children().eq(0).attr('id','')
            }
            if(($('#'+table+' tr').eq(1).find('td').eq(i).children().eq(0)).attr('listwo')){
                $('#'+table+' tr').eq(1).find('td').eq(i).children().eq(0).attr('listwo','')
            }
            floathtml+=($('#'+table+' tr').eq(1).find('td')[i]).innerHTML;

            floathtml+='<ul class="labelpro">';
            if(($('#'+table+' tr').eq(1).find('td')[i]).innerHTML.indexOf("<input")==-1){
                var html = '';
                for(var n=0;n<=json[start].length-1;n++){
                    // html += '<td>' + json[h][n] + '</td>';
                    html += '<li listwo='+n+'><input type="radio" name="a'+(i-1)+'" class="checkbtn"><span>' + (json[start][n]?json[start][n]:'') + '</span></li>';
                }
                floathtml+= html;
            }else{
                var html = '';
                for(var n=0;n<=json[start].length-1;n++){
                    // html += '<td>' + json[h][n] + '</td>';
                    html += '<li listwo='+n+'><input type="radio" name="a'+(i-1)+'" class="checkbtn"><span>' + (json[start][n]?json[start][n]:'') + '</span></li>';
                }
                floathtml+= html;
            }
            floathtml+='</ul>';
            floathtml+='</div>'
            floathtml+='</div>'
        }
        floathtml+='</div>'
        $('#floatmask .formoutinner').html(floathtml)

        for(var j=0;j<$('.labellis').length;j++){
            var out=$('.labellis').eq(j);

            if(out.find('ul').find('li')){
                for(var h=0;h<out.find('ul li').length;h++){
                    var lis=out.find('ul li').eq(h);
                    if(j-1==h){
                        out.children('select').attr('listwo',lis.attr('listwo'))
                        out.children(':first').attr('listwo',lis.attr('listwo'))
                        out.children(':first').val(lis.children('span').html())
                    }
                    lis.children('input').attr('listwo',lis.attr('listwo'))
                    lis.children('input').val(lis.children('span').html())
                }
            }
        }
        var html='';
        for(var i=start;i<=end;i++){
            html+='<tr lisone='+i+'>'
            for(var j=0;j<$('.labellis').length;j++){
                html+='<td>';
                var htmltwo='';
                htmltwo=$('.formoutinner .labellis').eq(j).children()[0].outerHTML
                html+=htmltwo;
                html+='</td>';
            };
            html+='</tr>'
        }
        $('#'+table+' tbody').append(html);
        for(var i=0;i<$('#'+table+' tbody tr').length;i++){
        	var tabtrlis=$('#'+table+' tbody tr').eq(i);
        	if(tabtrlis.attr('lisone')){
                var lisout=tabtrlis.attr('lisone')
                for(var j=0;j<tabtrlis.find('td').length;j++){
                	var tdinputs=tabtrlis.find('td').eq(j);
					if(tdinputs.children()){
                        if(tdinputs.children(':first').attr('listwo')){
                            // console.log(tdinputs.children(':first'))
                            var lis=tdinputs.children(':first').attr('listwo');
                            // console.log(lisout,lis,json[lisout][lis])
							// console.log(json[1][0])
                            //console.log($.trim(json[lisout][lis]));
                            if($.trim(json[lisout][lis])=='男'){
                                //console.log(tdinputs.children(':first').children('option').eq(1))
                                tdinputs.children(':first').children('option').eq(1).prop('selected', true);
                            } else if($.trim(json[lisout][lis])=='女'){
                                tdinputs.children(':first').children('option').eq(2).prop('selected', true);
                                // tdinputs.children(':first').find('input[name="sex"]').eq(1).attr("checked",'checked');
                            }
                            else{
                                tdinputs.children(':first').val(json[lisout][lis])
                            }
                        }
					}

                }

			}
		}

	}
	function importf(obj,table) {//导入
		// obj 导入文件的input 
		// table 导入到的table id
 		if(!obj.files) {
                return;
        }
        f = obj.files[0];
		
        if(!f){
        	 return;
        }
        if(!/\.xlsx|\.xls$/g.test(f.name)) {
				alert('支持读取xlsx格式,xls格式！');
				return;
		}
		var table=table;

		readWorkbookFromLocalFile(f, function(workbook) {
				readWorkbook(obj,workbook,table);
		});
	}
	

