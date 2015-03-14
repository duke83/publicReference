(function () {
    angular.module("app")
        .factory("validAddressService", ['$rootScope', function ($rootScope) {

            // Container object
            var validAddressService = {};

            validAddressService.GetSuggestedAddress = function (addressid) {
                $rootScope.$broadcast("checkAddress" + addressid);
            };

            return validAddressService;
        }]
    )
}());
