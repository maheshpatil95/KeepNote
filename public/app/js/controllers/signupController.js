noteKeep.controller('signupCtrl',['$scope','$state','$http','CONFIG',function($scope,$state,$http,CONFIG){
   $scope.createUserObj={
       username:"",
       password:""
   }
    
$scope.signup=()=>{
var reqData=$scope.createUserObj;
console.log(reqData);

if($scope.createUserObj.username=="" && $scope.createUserObj.password==""){
alert("Username and Password empty");
}else{
    $http({
        url:CONFIG.rootUrl+"auth/signup",
        method:'POST',
        headers:{
            "Content-type":"application/json"
            
        },
        data:reqData
    }).then((response)=>{
    if(response.data.success){
        alert(response.data.message);
        $state.go('login');
        
    }else{
        alert(response.data.message);
    }
    
    },(error)=>{
    console.log(error);
    alert(error);
    })
    
}





}

    
    
    }])