CREATE DATABASE  IF NOT EXISTS `PhotoPortalDB` /*!40100 DEFAULT CHARACTER SET big5 */;
USE `PhotoPortalDB`;
-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: PhotoPortalDB
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `PHOTO_POSTS`
--

DROP TABLE IF EXISTS `PHOTO_POSTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PHOTO_POSTS` (
  `POST_ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `CREATION_DATE` datetime DEFAULT NULL,
  `PHOTO_LINK` varchar(45) DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `USERS` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHOTO_POSTS`
--

LOCK TABLES `PHOTO_POSTS` WRITE;
/*!40000 ALTER TABLE `PHOTO_POSTS` DISABLE KEYS */;
INSERT INTO `PHOTO_POSTS` VALUES (1,'desc1','2019-05-04 07:52:13','link1',1),(2,'desc2','2019-05-04 14:52:02','link2',2),(3,'desc3','2016-02-01 18:22:53','link3',3),(4,'desc4','2019-06-10 14:59:11','link4',4),(5,'desc5','2018-04-25 21:52:13','link5',5),(6,'desc6','2019-10-04 01:13:14','link6',6),(7,'desc7','2019-12-23 19:31:43','link7',7),(8,'desc8','2018-02-05 14:53:02','link8',8),(9,'desc9','2019-01-13 23:57:31','link9',9),(10,'desc10','2017-07-25 22:25:31','link10',10),(11,'desc11','2018-03-14 23:13:34','link11',11),(12,'desc12','2018-10-26 17:18:43','link12',4),(13,'desc13','2019-09-28 04:25:24','link13',11),(14,'desc14','2019-10-02 06:56:32','link14',6),(15,'desc15','2019-11-15 13:42:23','link15',4),(16,'desc16','2019-05-27 13:46:01','link16',11),(17,'des hello c17','2019-05-27 14:42:13','link17',11);
/*!40000 ALTER TABLE `PHOTO_POSTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `USER_ID` int(11) NOT NULL,
  `NAME` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'dronchenko'),(2,'ivanov'),(3,'petrov'),(4,'sidorov'),(5,'belous'),(6,'pupkin'),(7,'vaskin'),(8,'saidov'),(9,'vasnecov'),(10,'volkov'),(11,'strikalo'),(12,'ivanov'),(13,'ivanov');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-05 16:33:57
