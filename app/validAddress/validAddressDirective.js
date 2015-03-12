var app = angular.module('app', []);


(function () {
    'use strict';
    angular.module('app')
        .directive('validAddress', function ($rootScope, validAddressService) {
            return {
                restrict: 'E',
                scope:{
                    address:"=", // this is the address object from parent
                    addressidentifier:"@"  // id comprised of parent scopeId and whether this is primary or secondary address.  Used to listen for broadcast events on address.
                },
                templateUrl: "../../StaticUiDev/mocks/Nerium.AdoManager/Views/Renderings/Modules/ValidAddressDirective.html",
                controller: function ($scope) {

                    $scope.SuggestedAddress = null;

                    var addressid ="";
                    if($scope.addressidentifier){
                        addressid=$scope.addressidentifier;
                    }
                    //listen for broadcast associated with the given addressid
                    $rootScope.$on("checkAddress" + addressid ,function(event,addressValidityData){
                        $scope.GetSuggestedAddress(addressValidityData);
                    })


                    $scope.GetSuggestedAddress = function (addressValidityData) {
                        if(addressValidityData) {
                            if(addressValidityData.isValid){
                                $scope.address.userApproved=true;
                                return;
                            }
                            $scope.ParentAddressFailsValidation = true; //binding to show directive UI

                            $scope.SuggestedAddress = {
                                "address1": addressValidityData.AutoOrderReturnAddressDto.Address1,
                                "address2": addressValidityData.AutoOrderReturnAddressDto.Address2,
                                "city": addressValidityData.AutoOrderReturnAddressDto.City,
                                "state": addressValidityData.AutoOrderReturnAddressDto.State,
                                "zip": addressValidityData.AutoOrderReturnAddressDto.Zip
                            };
                        }
                    }

                    //Triggered by user checking radio button
                    $scope.selectAddress = function (source) { // source is 'suggested' | 'override'
                        $scope.address.userApproved=true;
                        if (source === 'suggested') {
                            $scope.address.address1 = angular.copy($scope.SuggestedAddress.address1);
                            $scope.address.address2 = angular.copy($scope.SuggestedAddress.address2);
                            $scope.address.city = angular.copy($scope.SuggestedAddress.city);
                            $scope.address.state = angular.copy($scope.SuggestedAddress.state);
                            $scope.address.zip = angular.copy($scope.SuggestedAddress.zip);
                        }
                        if (source === 'override') {
                            //just leave the values on $scope.address
                        }
                    }
                }
            }
        })
}());

angular.module('app')
    .controller('obj_2_Valid_ctrl', ['$scope','validAddressService', function ($scope, validAddressService) {

        $scope.validAddressService=validAddressService;

        $scope.primaryAddressId="primary" + $scope.$id;
        $scope.secondaryAddressId="secondary" + $scope.$id;

        $scope.myPrimaryAddress = {
            address1: "580 Garner Rd",
            address2: "yyy",
            city: "CJ",
            state: "OR",
            zip: "92232"
        };

        $scope.mySecondaryAddress = {
            address1: "1800 Gilroy Rd",
            address2: "",
            city: "New Haven",
            state: "CT",
            zip: "12333"
        };

        $scope.mockServicePrimaryReturn = {
            "isValid": true,
            "AutoOrderReturnAddressDto": {
                "Address1": "590 Garnet Rd",
                "Address2": "",
                "City": "Cave Junction",
                "State": "OR",
                "Zip": "97523-4342"
            }
        }

        $scope.mockServiceSecondaryReturn = {
            "isValid": true,
            "AutoOrderReturnAddressDto": {
                "Address1": "1800 Gilroy Rd",
                "Address2": "",
                "City": "New Haven",
                "State": "CT",
                "Zip": "11112-4342"
            }
        }

    }]);

angular.module('app')
    .controller('obj_2_notValid_ctrl', ['$scope','validAddressService', function ($scope, validAddressService) {

        $scope.validAddressService=validAddressService;

        $scope.primaryAddressId="primary" + $scope.$id;
        $scope.secondaryAddressId="secondary" + $scope.$id;

        $scope.myPrimaryAddress = {
            address1: "580 Garner Rd",
            address2: "yyy",
            city: "CJ",
            state: "OR",
            zip: "92232"
        };

        $scope.mySecondaryAddress = {
            address1: "1800 Gilroy Rd",
            address2: "",
            city: "New Haven",
            state: "CT",
            zip: "12333"
        };

        $scope.mockServicePrimaryReturn = {
            "isValid": false,
            "AutoOrderReturnAddressDto": {
                "Address1": "590 Garnet Rd",
                "Address2": "",
                "City": "Cave Junction",
                "State": "OR",
                "Zip": "97523-4342"
            }
        }

        $scope.mockServiceSecondaryReturn = {
            "isValid": false,
            "AutoOrderReturnAddressDto": {
                "Address1": "1800 Gilroy Rd",
                "Address2": "",
                "City": "New Haven",
                "State": "CT",
                "Zip": "11112-4342"
            }
        }

    }]);

