SELECT USERS.NAME, PHOTO_POSTS.CREATION_DATE FROM `PhotoPortalDB`.PHOTO_POSTS
	JOIN `PhotoPortalDB`.USERS ON USERS.USER_ID = PHOTO_POSTS.USER_ID
    WHERE LENGTH(PHOTO_POSTS.DESCRIPTION) > 5