noteKeep.controller('loginCtrl',['$scope','$state','$http','$localStorage','CONFIG',function($scope,$state,$http,$localStorage,CONFIG){
    $scope.loginObj={
        username:"",
        password:""
    }

    
$scope.login=function(){
    
    let reqData=$scope.loginObj;
    console.log($scope.loginObj);
    if($scope.loginObj.username=="" && $scope.loginObj.password==""){

        alert("username and password empty")
    }else{
        $http({
            method:"POST",
            url:CONFIG.rootUrl+"auth/login",
            headers:{
                "Content-type":"application/json"
            },
            data:reqData
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
        $localStorage._id=response.data._id;
        $state.go('dashbord');
            }else{
                alert("Wrong credentials");
            }
        },(error)=>{
            console.log(error);
        })
        
    }



}


}])







