<?php
	include "connection.php";

	$targetDir = "../../uploads/";

	// Ensure upload directory exists
	if (!is_dir($targetDir)) {
		mkdir($targetDir, 0777, true);
	}

	if (isset($_FILES["image"])) {
		$filename = time() . "_" . basename($_FILES["image"]["name"]);
		$targetFile = $targetDir . $filename;

		if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
			// Escape values for safety
			$safeFilename = mysqli_real_escape_string($connection, $filename);

      echo json_encode(["success" => true, "filename" => $safeFilename]); die();
		} else {
			echo json_encode(["error" => "Failed to move uploaded file"]);
			die();
		}
	} else {
		echo json_encode(["error" => "No file received"]);
		die();
	}
?>
