////INTERCEPTS HTTP (GET/POST/PUT...) TRAFFIC FOR SELECTED URL PATTERNS
//(function () {
//    "use strict";
//    angular.module('staticUiDev')
//        .factory('httpIntercepts',function(){
//            return{
//                getAjaxValue:function(mockDataFile){
//                    var rtrn = '';
//var staticPreRoute='/Web/StaticUiDev/';
//                    var request = new XMLHttpRequest();
//                    request.open('GET', staticPreRoute + mockDataFile, false);  // `false` makes the request synchronous
//                    request.send(null);
//
//                    if (request.status === 200) {
//                        //console.log(request.responseText);
//                        rtrn=request.responseText
//                    }
//                    return rtrn;
//
//                }
//            }
//        })
//
//
//}());