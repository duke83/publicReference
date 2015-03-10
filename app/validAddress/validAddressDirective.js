var app = angular.module('app', []);


(function () {
    'use strict';
    angular.module('app')
        .directive('validAddress', function () {
            return {
                restrict: 'E',

                templateUrl: "../../StaticUiDev/mocks/Nerium.AdoManager/Views/Renderings/Modules/ValidAddressDirective.html",
                controller: function ($scope) {
                    $scope.editMode = false;


                    $scope.SuggestedAddress = null;

                    $scope.GetSuggestedAddress = function () {
                        $scope.ParentAddressFailsValidation = true;
                        $scope.SuggestedAddress = {
                            "address1": "571 Garner Rd",
                            "address2": "",
                            "city": "CJ",
                            "state": "OR",
                            "zip": "92232"
                        };
                    }
                },

                link: function (scp, el, attrs) {
                    //if the methods need access to attrs object, it's a good time
                    // to put them in the link function.

                    scp.CopyOfParentAddress = {
                        "address1": attrs.address1,
                        "address2": attrs.address2,
                        "city": attrs.city,
                        "state": attrs.state,
                        "zip": attrs.zip
                    };

                    scp.selectSuggested = function () {
                        scp.address1 = scp.SuggestedAddress.address1;
                        scp.address2 = scp.SuggestedAddress.address2;
                        scp.city = scp.SuggestedAddress.city;
                        scp.state = scp.SuggestedAddress.state;
                        scp.zip = scp.SuggestedAddress.zip;
                        //todo: update attrs
                    }

                    scp.selectOriginal = function () {
                        scp.address1 = scp.CopyOfParentAddress.address1;
                        scp.address2 = scp.CopyOfParentAddress.address2;
                        scp.city = scp.CopyOfParentAddress.city;
                        scp.state = scp.CopyOfParentAddress.state;
                        scp.zip = scp.CopyOfParentAddress.zip;
                        //tod: update attrs
                    }

                    scp.showMessage = function (message) {
                        alert(scp.OriginalAddress.address1);
                    }

                }

            }
        })
}());

angular.module('app')
    .controller('addresscontroller', ['$scope', function ($scope) {
        $scope.address1 = "570 Garner Rd";
        $scope.address2 = "xxx";
        $scope.city = "CJ";
        $scope.state = "OR";
        $scope.zip = "92232";
    }]);
;