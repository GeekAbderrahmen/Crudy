(function () {

  'use strict';

  angular
    .module('managerApp')
    .controller('ManagerCtrl', ManagerCtrl);

  function ManagerCtrl ($scope, $window, $http, $uibModal, $log, ManagerService) {

    // init vars
    var vm = this;
    vm.contacts = [];
    vm.count = 0;

    vm.viewContact = viewContact;
    vm.addContact = addContact;
    vm.editContact = editContact;
    vm.deleteContact = deleteContact;

    populateContacts();

    // FETCHING ALL CONTACTS
    function populateContacts () {
        ManagerService.getAllContacts()
          .then(function (res) {
             vm.contacts = res;
             vm.count = res.length;
             $log.info('contacts fetched from json file...');
          });
    }

    // VIEW
    function viewContact (id) {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'client/views/manager/view-contact.html',
          controller: viewContactCtrl,
          controllerAs: 'modal',
          size: 'md',
          resolve: {
            param: function () {
              return {'_id': id};
            }
          }
        });
    }

    function viewContactCtrl ($uibModalInstance, ManagerService, param) {
        var modal = this;

        modal.contact = _.first(_.filter(vm.contacts, function (c) {
          return c._id == param._id;
        }));

        modal.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        }
    }

    // ADD
    function addContact () {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'client/views/manager/add-contact.html',
          controller: addContactCtrl,
          controllerAs: 'add',
          size: 'md'
        });
    }

    function addContactCtrl ($uibModalInstance, ManagerService) {
        var add = this;

        add.contact = {_id: vm.count};

        add.save = save;
        add.cancel = cancel;

        function cancel () {
          $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.contacts.push(add.contact);
            $log.info(vm.contacts);
            add.cancel();
        }
    }

    // EDIT
    function editContact (id) {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'client/views/manager/edit-contact.html',
          controller: editContactCtrl,
          controllerAs: 'edit',
          size: 'md',
          resolve: {
            param: function () {
              return {'_id': id};
            }
          }
        });
    }

    function editContactCtrl ($timeout, $uibModalInstance, ManagerService, param) {
        var edit = this;

        edit.save = save;
        edit.cancel = cancel;

        getElementById();

        function  getElementById () {
          edit.contact = _.first(_.filter(vm.contacts, function (c) {
            return c._id == param._id;
          }));
        }

        function cancel () {
          $uibModalInstance.dismiss('cancel');
        }

        function save () {
            _.extend(_.findWhere(vm.contacts, { _id: param._id }), edit.contact);
            var updated_data = vm.contacts;
            vm.contacts = [];
            $timeout(function () {
              vm.contacts = updated_data;
            }, 10);
            $log.info('contact ' + param._id + ' is successfully edited.');
            edit.cancel();
        }
    }

    // DELETE
    function deleteContact (id) {
      vm.contacts = _.filter(vm.contacts, function (c) {
          return c._id != id;
      });
      vm.count--;
      $log.info('contact ' + id + ' is successfully deleted.');
    }

  }

})();
