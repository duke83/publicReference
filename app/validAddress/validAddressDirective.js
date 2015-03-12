var app = angular.module('app', []);


(function () {
    'use strict';
    angular.module('app')
        .directive('validAddress', function ($rootScope, validAddressService) {
            return {
                restrict: 'E',
                scope:{
                    address:"=",
                    addressidentifier:"@"
                },
                templateUrl: "../../StaticUiDev/mocks/Nerium.AdoManager/Views/Renderings/Modules/ValidAddressDirective.html",
                controller: function ($scope) {

                    $scope.SuggestedAddress = null;

                    var addressid ="";
                    if($scope.addressidentifier){
                        addressid=$scope.addressidentifier;
                    }

                    $rootScope.$on("checkAddress" + addressid ,function(event,mockdata){
                        console.log(event);
                        $scope.GetSuggestedAddress(mockdata);
                    })

                    $scope.GetSuggestedAddress = function (mockdata) {

                        console.log(mockdata);
                        if(mockdata) {
                            $scope.ParentAddressFailsValidation = true;// !$scope.mockServiceReturn.isValid;


                            $scope.SuggestedAddress = {
                                "address1": mockdata.AutoOrderReturnAddressDto.Address1,
                                "address2": mockdata.AutoOrderReturnAddressDto.Address2,
                                "city": mockdata.AutoOrderReturnAddressDto.City,
                                "state": mockdata.AutoOrderReturnAddressDto.State,
                                "zip": mockdata.AutoOrderReturnAddressDto.Zip
                            };
                        }
                    }
                    $scope.selectAddress = function (source) { // source is 'suggested' | 'override'
                        //scp.userApproved=true;

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
                    $scope.clickthis=function(){
                        console.log($scope);
                    }
                },

                link: function (scp, el, attrs, mdl) {
                    //if the methods need access to attrs object, it's a good time
                    // to put them in the link function.

                    scp.CopyOfParentAddress = {
                        "address1": attrs.address1,
                        "address2": attrs.address2,
                        "city": attrs.city,
                        "state": attrs.state,
                        "zip": attrs.zip
                    };

                }
            }
        })
}());

angular.module('app')
    .controller('obj_2_notValid_ctrl', ['$scope','validAddressService', function ($scope, validAddressService) {

        $scope.validAddressService=validAddressService;

        $scope.myPrimaryAddress = {
            address1: "580 Garner Rd",
            address2: "yyy",
            city: "CJ",
            state: "OR",
            zip: "92232"
        };

        $scope.primaryAddressId="primary" + $scope.$id;
        $scope.secondaryAddressId="secondary" + $scope.$id;

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

    }]);




angular.module('app')
    .controller('props_1_notValid_ctrl', ['$scope', function ($scope) {
        $scope.myPrimaryAddress = {
            address1: "580 Garner Rd",
            address2: "yyy",
            city: "CJ",
            state: "OR",
            zip: "92232"
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

        $scope.address1 = "570 Garner Rd";
        $scope.address2 = "xxx";
        $scope.city = "CJ";
        $scope.state = "OR";
        $scope.zip = "92232";
    }]);
