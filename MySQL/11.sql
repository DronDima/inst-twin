SELECT DATEDIFF(DATE(NOW()) , DATE(PHOTO_POSTS.CREATION_DATE)) FROM `PhotoPortalDB`.PHOTO_POSTS
	ORDER BY PHOTO_POSTS.CREATION_DATE
    LIMIT 1