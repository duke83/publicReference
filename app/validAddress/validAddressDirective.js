(function () {
    'use strict';
    angular.module('app')
        .directive('validAddress', function ($rootScope, serverApi, $q) {
            return {
                restrict: 'E',
                scope: {
                    address: "=" // this is the address object from parent
                },

                templateUrl: "http://localhost:63342/Web/StaticUiDev/app/validAddress/ValidAddressDirective.html",// "ValidateAddressDirective.html",
                controller: function ($scope, $q) {

                    $scope.address.validityIdentifier = "validityIdentifier" + $scope.$id;


                    //Attach the function directly to the address so that the address can check for a suggested address
                    // at any point in it's processing path.
                    // Also, no need for a separate validAddressService.

                    // WE REALLY DON'T NEED TO USE BROADCAST HERE. BUT WE REALLY SHOULD RETURN A PROMISE
                    // Consumers of this address can bind to the promise
                    // The promise is resolved if the server returns isValid
                    // OR if the user has expressed approval to override server validation.
                    $scope.address.hasApproval = function () {
                        var deferred = $q.defer();

                        serverApi.validateShippingAddress($scope.address)
                            .then(function (data) {
                                console.log('serverApi returns to .then ', data)
                                //alert ('then',data)
                            })
                            .catch(
                            function (errrodata) {
                                console.log('oh damn, ', errrodata)
                                alert('oh, damn')
                            })

                        return deferred.promise;
                    };

                    $scope.setUserSelection = function () {
                        $scope.address.userApproved = true;     //this setting indicates for future processing that this has user's approval

                    }


                    $scope.GetSuggestedAddress = function () {
                        $scope.SuggestedAddress = null;

                        //ok, so we are assuming the spelling on $scope.address properties is a certain way.  This is a point to document.
                        var remappedDto = {
                            AddressLine1: $scope.address.address1,
                            AddressLine2: $scope.address.address2,
                            City: $scope.address.city,
                            CountryCode: $scope.address.country,
                            Territory: $scope.address.state,
                            PostalCode: $scope.address.zip
                        };

                        serverApi.validateShippingAddress(remappedDto)
                            .success(function (addressValidityData) {
                                if (addressValidityData) {
                                    if (addressValidityData.isValid) {
                                        $scope.address.userApproved = true;
                                        return;
                                    }
                                    $scope.ParentAddressFailsValidation = true; //binding to show directive UI

                                    //serverApi may not always return a suggested address
                                    if (addressValidityData.autoOrderReturnAddressDto) {
                                        $scope.SuggestedAddress = {
                                            "address1": addressValidityData.autoOrderReturnAddressDto.address1,
                                            "address2": addressValidityData.autoOrderReturnAddressDto.address2,
                                            "city": addressValidityData.autoOrderReturnAddressDto.city,
                                            "state": addressValidityData.autoOrderReturnAddressDto.state,
                                            "zip": addressValidityData.autoOrderReturnAddressDto.zip
                                        }
                                    }
                                    ;
                                    return;
                                }
                            })
                            .error(function (addressValidityData) {
                                console.log(addressValidityData.message);
                            });
                    };

                    //Triggered by user checking radio button
                    $scope.selectAddress = function () {
                        // $scope.addressSource is 'suggested' | 'override'
                        if ($scope.addressSource === 'suggested') {
                            $scope.address.address1 = angular.copy($scope.SuggestedAddress.address1);
                            $scope.address.address2 = angular.copy($scope.SuggestedAddress.address2);
                            $scope.address.city = angular.copy($scope.SuggestedAddress.city);
                            $scope.address.state = angular.copy($scope.SuggestedAddress.state);
                            $scope.address.zip = angular.copy($scope.SuggestedAddress.zip);
                        }
                        if ($scope.addressSource === 'override') {
                            //just leave the values on $scope.address
                        }
                    }
                }
            }
        })
}());