/** 
 * �����ڽ��и�ʽ���� 
 * @param date Ҫ��ʽ�������� 
 * @param format ���и�ʽ����ģʽ�ַ���
 *     ֧�ֵ�ģʽ��ĸ�У� 
 *     y:��, 
 *     M:���е��·�(1-12), 
 *     d:�·��е���(1-31), 
 *     h:Сʱ(0-23), 
 *     m:��(0-59), 
 *     s:��(0-59), 
 *     S:����(0-999),
 *     q:����(1-4)
 * @return String
 * @author yanis.wang
 * @see	http://aui.github.io/artTemplate/demo/helper.html
 */
 template.helper('dateFormat', function (date, format) {

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1, //�·� 
        "d": date.getDate(), //�� 
        "h": date.getHours(), //Сʱ 
        "m": date.getMinutes(), //�� 
        "s": date.getSeconds(), //�� 
        "q": Math.floor((date.getMonth() + 3) / 3), //���� 
        "S": date.getMilliseconds() //���� 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});