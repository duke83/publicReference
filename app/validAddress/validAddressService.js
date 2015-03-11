(function () {
    angular.module("app")
        .factory("validAddressService", ['$rootScope',  function ($rootScope) {

            // Container object
            var validAddressService = {};

            validAddressService.GetSuggestedAddress = function(addressid, mockaddress){
                console.log(addressid);
                $rootScope.$broadcast("checkAddress" + addressid, mockaddress)
            };

            //validAddressService.GetSuggestedAddress = function(addressid, mockaddress){
            //    $rootScope.$broadcast("checkAddress" + addressid, mockaddress)
            //}

            return validAddressService;
        }]
    )
}());
 