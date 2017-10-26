angular.module('binaryblitz')
  .controller('GameController',
  [
    '$transition$',
    '$state',
    '$scope',

    function ($transition$, $state, $scope) {
      var vm = this
      vm.started = false
      vm.finished = false
      vm.level = $transition$.params().level

      if (!vm.level) $state.go('home')
      vm.compareVerticalRows = (index) => {
        let userArray = vm.userRows.map(e => { return e[index] })
        let solutionArray = vm.solutionRows.map(e => { return e[index] })
        console.log(userArray)
        console.log(solutionArray)
        return angular.toJson(userArray) === angular.toJson(solutionArray)
      }
      vm.compareHorizontalRows = (r1, r2) => {
        return angular.toJson(r1) === angular.toJson(r2)
      }
      vm.start = () => {
        vm.finished = false
        vm.started = true
        vm.timer = 0
        vm.timeElapsed = 0.0
        vm.timer = setInterval(() => {
          vm.timeElapsed += 0.1
          vm.timeElapsed = Math.round(vm.timeElapsed * 10) / 10
          $scope.$apply()
        }, 100)
        vm.generate()
      }

      vm.generate = () => {
        var amount = 0
        var rowLength = 0
        var solutionBits = []
        var userBits = []
        var solutionRows = []
        var userRows = []
        var hsums = []
        var vsums = []

        if (vm.level === 'easy') { amount = 16; rowLength = 4 }
        if (vm.level === 'medium') { amount = 36; rowLength = 6 }
        if (vm.level === 'hard') { amount = 64; rowLength = 8 }

        // Generates 1's and 0's
        for (let i = 0; i < amount; i++) {
          solutionBits.push(Math.round(Math.random() * 1))
          userBits.push(0)
        }
        console.log('/' + userBits)
        // Split bits up in rows
        for (var i = 0; i < rowLength; i++) {
          solutionRows.push(solutionBits.splice(0, rowLength))
          userRows.push(userBits.splice(0, rowLength))
        }
        vm.userRows = userRows
        vm.solutionRows = solutionRows
        // Get horizontal sums
        for (let row of solutionRows) {
          let sum = 0
          for (let i = 0; i < rowLength; i++) {
            let index = rowLength - 1 - i
            if (row[i] === 1) sum += 2 ** index
          }
          hsums.push(sum)
        }
        vm.hsums = hsums

        for (let i = 0; i < rowLength; i++) {
          let sum = 0
          for (let row of solutionRows) {
            if (row[i] === 1) sum += 2 ** (rowLength - 1 - solutionRows.indexOf(row))
          }
          vsums.push(sum)
        }
        vm.vsums = vsums
      }
      vm.finish = () => {
        vm.finished = true
        clearInterval(vm.timer)
      }
      vm.reset = () => {
        vm.started = false
      }
      $scope.$watch('vm.userRows', function (newVal, oldVal) {
        if (!vm.started) return
        if (angular.toJson(vm.userRows) === angular.toJson(vm.solutionRows)) {
          vm.finish()
        }
      }, true)
      return vm
    }
  ]
)
