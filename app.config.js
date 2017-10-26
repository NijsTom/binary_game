'use strict'

angular.module('binaryblitz').config(
  [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',

    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      var states = [
        { name: 'game', secure: false, params: { level: null } },
        { name: 'home', secure: false }
      ]

      for (var state of states) {
        let s = {
          url: '/' + state.name,
          secure: state.secure,
          templateUrl: 'components/' + state.name + '/' + state.name + '.html',
          controller: state.name.charAt(0).toUpperCase() + state.name.slice(1) + 'Controller',
          controllerAs: 'vm'
        }
        if (state.params) s.params = state.params
        $stateProvider.state(state.name, s)
      }

      $urlRouterProvider.otherwise('/home')
      $locationProvider.hashPrefix('')
    }
  ]
)
