<?php

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$request_type = $data->request_type;

// Fetch Cats
if($request_type == 1){
	$sel = mysqli_query($con,"select * from Cats");
	$data = array();

while ($row = mysqli_fetch_array($sel)) {
    $data[] = array("id"=>$row['id'],"CatName"=>$row['CatName'],"ImagePath"=>$row['ImagePath']);

	}
	echo json_encode($data);

}

// Insert record
if($request_type == 3){
    $CatName = $data->CatName;
    $ImagePath = $data->ImagePath;



    mysqli_query($con,"insert into Cats(CatName,ImagePath) values('".$CatName."','".$ImagePath."')");
    $lastinsert_id = mysqli_insert_id($con);

    $return_arr[] = array("id"=>$lastinsert_id,"CatName"=>$CatName,"ImagePath"=>$ImagePath);
    echo json_encode($return_arr);
}



// Update record
if($request_type == 2){
	$field = $data->field;
	$value = $data->value;
	$userid = $data->userid;

	$sql = "UPDATE Cats set ".$field."='".$value."' WHERE id=".$userid;
	mysqli_query($con,$sql);

	echo "Update successfully";
}






// Delete record
if($request_type == 4){
    $userid = $data->userid;

    mysqli_query($con,"delete from Cats where id=".$userid);
    echo 1;
}











exit;