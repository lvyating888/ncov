;
(function ($) {
    $.extend({
        ajaxDom: function (doms, param, cssParam) {
            var dom;
            if (typeof(doms) === 'object') {
                dom = doms.join(',');
            } else {
                dom = doms;
            }
            // console.log(dom,$(dom));
            // console.log('-------------')
            $(dom).css({
                "position":"relative",
                "minHeight": 150
            });
            // var height = $(dom).outerHeight(true);
            // var width =$(dom).outerWidth(true);
            var beforeSendFn = param.beforeSend || function(){};
            var completeFn = param.complete || function(){};

            var cssObj = {
                position: 'absolute',
                height: '100%',
                top: '0',
                left: '0',
                width: '100%',
                background: '#fff',
                opacity: '0.6',
                filter: 'alpha(opacity=60)'
            };
            for (let cssParamKey in cssParam) {
                cssObj[cssParamKey] = cssParam[cssParamKey];
            }
            var cssStr = '';
            for (let cssObjKey in cssObj) {
                cssStr += cssObjKey + ":" + cssObj[cssObjKey] + ";";
            }
            var html=`
                   <div class="loadingout" style="position: absolute;display: block;width: 100%;height: 100%;top: 0;left: 0;z-index: 11;">
                       <div class="loadingbg" style="${cssStr}"></div>
                       <div class="loadingimg">
                       <img style="position: absolute;top: 50%;left: 50%;margin-top: -30px;margin-left: -30px;display: block;width: 60px;height: 60px;" src="data:image/gif;base64,R0lGODlhQgBCAIABAP+TMgAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlEQ0ZFQkYxMDdDMjExRTg4MEQ1QjlCQzZDMkZCOUExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlEQ0ZFQkYyMDdDMjExRTg4MEQ1QjlCQzZDMkZCOUExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OURDRkVCRUYwN0MyMTFFODgwRDVCOUJDNkMyRkI5QTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OURDRkVCRjAwN0MyMTFFODgwRDVCOUJDNkMyRkI5QTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LB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">
                       </div>
                   </div>`;
            param.beforeSend = function (XHR) {
                $(dom).append(html);
                beforeSendFn(XHR);
            };
            param.complete = function (XHR, TS) {
                $(dom).find('.loadingout').remove();
                $(dom).css({minHeight : 0});
                completeFn(XHR, TS);
            };
            return $.ajax(param);
        }
    });
})(jQuery);