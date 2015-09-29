angular.module('aboutMe', ['pascalprecht.translate'])
.config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
  prefix: '/languages/',
  suffix: '.json'
  });
   //Our translations will go in here
  $translateProvider.preferredLanguage('tw');
}).controller('TransCtrl', function($translate, $scope) {
  $scope.lang="enUS";
  $scope.changeLanguage = function () {
    $translate.use($scope.lang);
      if ($scope.lang=="enUS")
        $scope.lang="tw";
      else
        $scope.lang="enUS"
    };
});
