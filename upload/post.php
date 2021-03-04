<?php 
	if(isset($_FILES['file']))
	{
		$file = $_FILES['file'];
		$time = time();
		$arr = explode(".",$file['name'][0]);
		$extension = $arr[count($arr) - 1];
		$fileAddress = $file['tmp_name'][0];
		x:$fileName = uniqid($time."_",true);
		$filePath = './upload/'.$fileName.".$extension";
		if(file_exists($filePath))
			goto x;
		move_uploaded_file($fileAddress,$filePath);
		echo $filePath;
	}