(
    function () {
        "use strict";
        angular.module('staticUiDev', ['ngMockE2E', 'app']) //"app" is the general nerium angular application (now in nerium.backoffice)
            .run(function ($httpBackend) {


                $httpBackend.whenGET('[\s\S]*Web/api/AutoOrderManager/GetAllActiveAutoOrders?customerId[\s\S]*')
                    .respond(httpIntercepts.getAjaxValue('mocks/api/AutoOrderManager/GetAllActiveAutoOrders.json'));

                $httpBackend.whenGET('[\s\S]*partials/ado-manager/new-auto-order-details')
                    .respond(httpIntercepts.getAjaxValue('mocks/Nerium.AdoManager/Views/Renderings/Modules/NewAdoDetails.html'));


                //ALL ELSE
                //http://localhost:63342/Web/StaticUiDev/tests/Web/api/Customer/GetCustomerAccountListInfo?id=10098
                $httpBackend.whenGET().passThrough();

                $httpBackend.whenGET().passThrough();
            })
            .controller("test", function ($scope, serverApi) {
                $scope.clickme = function () {
                    console.log('running clickme', $scope);

                    serverApi.getAllActiveAutoOrders(345)
                        .success(function (data) {
                            console.log('direct serverApi call sucess - ', data);
                        }
                    )
                        .error(function () {
                            console.log('error', arguments);
                        }
                    );

                }
            })
    }());