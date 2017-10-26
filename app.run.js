'use strict'

angular.module('binaryblitz').run(
  [
    '$rootScope',
    '$transitions',

    function ($rootScope, $transitions) {
      $transitions.onEnter(
        {
          to: (state) => {
            return state.self.secure && !$rootScope.isAuthenticated
          }
        },
        (trans) => {
          return trans.router.stateService.target('login')
        }
      )
    }
  ]
)
