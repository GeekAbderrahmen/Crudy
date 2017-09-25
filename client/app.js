(function () {

  'use strict';

  angular
    .module('managerApp', ['ui.router', 'ui.bootstrap'])
    .config(ManagerConfig);

  function ManagerConfig ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('contacts', {
            url: '/',
            templateUrl: 'client/views/manager/contacts.html',
            controller: 'ManagerCtrl',
            controllerAs: 'vm'
        });
  }

})();
