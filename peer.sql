CREATE DATABASE  IF NOT EXISTS `peerpeel` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `peerpeel`;
-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: peerpeel
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.16-MariaDB-10.2.16+maria~xenial-log

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeCategoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeCategoryId` (`typeCategoryId`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`typeCategoryId`) REFERENCES `type_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_types`
--

DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `directionExist` tinyint(1) NOT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `locationExist` tinyint(1) NOT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `workerId` int(11) DEFAULT NULL,
  `paymentTypeId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paymentTypeId` (`paymentTypeId`),
  KEY `categoryId` (`categoryId`),
  KEY `workerId` (`workerId`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`paymentTypeId`) REFERENCES `payment_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `workerId` FOREIGN KEY (`workerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL),(2,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL),(3,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL),(4,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL),(5,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL),(6,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `workerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `quotations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_categories`
--

DROP TABLE IF EXISTS `type_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_categories`
--

LOCK TABLES `type_categories` WRITE;
/*!40000 ALTER TABLE `type_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_sevices`
--

DROP TABLE IF EXISTS `type_sevices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_sevices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_sevices`
--

LOCK TABLES `type_sevices` WRITE;
/*!40000 ALTER TABLE `type_sevices` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_sevices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urgents`
--

DROP TABLE IF EXISTS `urgents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urgents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `directionExist` tinyint(1) NOT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `locationExist` tinyint(1) NOT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `workerId` int(11) DEFAULT NULL,
  `paymentTypeId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `workerId` (`workerId`),
  KEY `paymentTypeId` (`paymentTypeId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `urgents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `urgents_ibfk_2` FOREIGN KEY (`workerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `urgents_ibfk_3` FOREIGN KEY (`paymentTypeId`) REFERENCES `payment_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `urgents_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urgents`
--

LOCK TABLES `urgents` WRITE;
/*!40000 ALTER TABLE `urgents` DISABLE KEYS */;
INSERT INTO `urgents` VALUES (1,'hola',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:09:53','2018-07-23 17:35:13',1,NULL,NULL,NULL),(2,'hola2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:14:34','2018-07-23 17:35:13',1,NULL,NULL,NULL),(3,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:15:02','2018-07-23 17:15:02',1,NULL,NULL,NULL),(4,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:36:33','2018-07-23 17:36:33',1,NULL,NULL,NULL),(5,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:41:04','2018-07-23 17:42:03',1,2,NULL,NULL),(6,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:41:15','2018-07-23 17:41:15',1,NULL,NULL,NULL),(7,'hol222222a2',1,NULL,1,NULL,NULL,1,NULL,'2018-07-23 17:43:11','2018-07-23 17:43:30',1,2,NULL,NULL);
/*!40000 ALTER TABLE `urgents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `direction` varchar(255) DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `workerFilesStatus` tinyint(4) DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `connected` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'daniel','eslava','23132132','dasdasda','123132','dasdadas','123123',0,0,0,NULL,NULL),(2,'alejandro','herrera','1231564','sdadsada','156489','dasd4a65sd4as','4564654',0,0,0,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker_files`
--

DROP TABLE IF EXISTS `worker_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worker_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `worker_files_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker_files`
--

LOCK TABLES `worker_files` WRITE;
/*!40000 ALTER TABLE `worker_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `worker_files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-23 15:05:31
