<?php
	include "../services/connection.php";

	// Get JSON string from FormData field named "data"
	$data = json_decode($_POST['data']);
	$id = $data->id;

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
			$safeId = mysqli_real_escape_string($connection, $id);

			// Run the update query
			mysqli_query($connection, "UPDATE profile SET image='$safeFilename' WHERE id='$safeId'");

			if (mysqli_affected_rows($connection) > 0) {
				echo json_encode(["success" => true, "filename" => $filename]);
				die();
			} else {
				echo json_encode(["error" => "No rows updated or invalid ID"]);
				die();
			}
		} else {
			echo json_encode(["error" => "Failed to move uploaded file"]);
			die();
		}
	} else {
		echo json_encode(["error" => "No file received"]);
		die();
	}
?>
