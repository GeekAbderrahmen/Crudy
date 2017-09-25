(function () {

    'use strict';

    angular
      .module('managerApp')
      .service("ManagerService", ManagerService);

    function ManagerService ($q, $http, $log) {

      return {
        getAllContacts: getAllContacts,
        createContact: createContact,
        getElementById: getElementById,
        editContact: editContact,
        deleteContact: deleteContact
      }

      function getAllContacts () {
        var deferred = $q.defer();

        $http.get('contacts.json')
          .then(function (res) {
              $log.info('[DATA] --- ' + res.data);
              deferred.resolve(res.data);
              return res.data;
          }, function (err) {
              $log.error(err);
              deferred.reject(err);
          });

        return deferred.promise;

      }

      function getElementById (id) {
        // not implemented
      }

      function createContact (contact) {
        // not implemented
      }

      function editContact (contact) {
        // not implemented
      }

      function deleteContact (id) {
        // not implemented
      }

    }

})();
