SELECT USERS.NAME FROM `PhotoPortalDB`.PHOTO_POSTS
	JOIN `PhotoPortalDB`.USERS ON USERS.USER_ID = PHOTO_POSTS.USER_ID
    GROUP BY PHOTO_POSTS.USER_ID
    HAVING COUNT(PHOTO_POSTS.USER_ID) > 3