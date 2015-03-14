(function(){angular.module('app')
    .factory('serverApi',  ['$q','$timeout',function ($q,$timeout) {

        var serverApi = {};

        serverApi.validateShippingAddress = function () {
            var myname='kent';
            var deferred = $q.defer();
            $timeout(function () {
                myname='john';
                console.log('whats myname (inside of timeout)?',myname)
                var t = new Date().getMilliseconds();
                console.log('in timeout', t)
               // deferred.resolve({abc: 123})
                deferred.reject({'myerrorfromvalidatio':false})
            }, 1234);
            var t1 = new Date().getMilliseconds();
            console.log('whats myname (outside of timeout)?',myname)
            console.log('out of timeout', t1);

            return deferred.promise;
        };

        return serverApi;
    }])}());
