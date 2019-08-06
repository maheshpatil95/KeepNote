noteKeep.controller('dashbordCtrl',['$scope','$localStorage','$http','CONFIG','$state',function($scope,$localStorage,$http,CONFIG,$state){
$scope.noteText="";
$scope.editedText=""
$scope.notes=[];
$scope.addNote=()=>{
//console.log('NOte',$scope.noteText);   
if($scope.noteText==""){

} else{
var reqData={
    _id:$localStorage._id,
note:$scope.noteText
}
$http({
    url:CONFIG.rootUrl+"note/create",
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    data:reqData
}).then((response)=>{
    alert(response.data.message);
    $scope.noteText="";
    $('#addNote').modal('hide')
    getNotes();

},(error)=>{
    alert(error.message);
})
 

}



}


$scope.deleteNote=(id)=>{
    console.log(id);
var reqData={
    _id:$localStorage._id,
    note:{
        _id:id
    }
}

$http({
    url:CONFIG.rootUrl+"note/delete",
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    data:reqData
}).then((response)=>{
   if(response.data.success){
    alert("Note Deleted");
    getNotes();
   }
    

},error=>{
    alert(error.message)

})




}

$scope.clearModel=()=>{
    $scope.noteText="";
}

const getNotes=()=>{

$http({
    url:CONFIG.rootUrl+"note/getnote/"+$localStorage._id,
    method:"GET",

}).then((response)=>{
console.log(response);
if(response.data.success){
    $scope.notes=response.data.result
}else{
    alert(response.data.message);
}


},(error)=>{
console.log(error);

})
}

$scope.setNote=(note)=>{
//console.log(note);
$scope.editedText=note.data;
$scope.noteEdit=note;
}

$scope.updateNote=(note)=>{
console.log('update note',note);
console.log($scope.editedText);

var reqData={
    _id:$localStorage._id,
    note:{
        _id:note._id,
        data:$scope.editedText
    }
}
$http({
    url:CONFIG.rootUrl+"note/update",
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    data:reqData
}).then((response)=>{
alert(response.data.message)
$('#editNote').modal('hide')
getNotes();
},(error)=>{
alert(error.message);
})
}

$scope.logout=()=>{
    $state.go('login');
}
getNotes();
}])