SELECT * FROM `PhotoPortalDB`.PHOTO_POSTS 
	WHERE USER_ID = 11 AND LOCATE('hello', DESCRIPTION, 1) <> 0