-- MySQL dump 10.13  Distrib 5.7.32, for osx10.12 (x86_64)
--
-- Host: localhost    Database: learnFrench
-- ------------------------------------------------------
-- Server version	5.7.32

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
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Message` (
  `IdMessage` int(11) NOT NULL AUTO_INCREMENT,
  `TextContenu` varchar(255) NOT NULL,
  `DateEnvoi` datetime NOT NULL,
  PRIMARY KEY (`IdMessage`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (2,'Ect-que vous m\'entendez?','2026-02-16 12:00:00'),(3,'Ect-que vous m\'entendez?','2026-02-16 12:00:00'),(4,'Mande','2026-02-16 12:00:00'),(5,'Bonjour à tous','2026-02-16 12:00:00'),(6,'Bonjour à tous','2026-02-16 12:00:00'),(7,'Mande','2026-02-16 12:00:00'),(8,'Mety','2026-02-16 12:00:00'),(9,'Made izy','2026-02-16 12:00:00'),(10,'Rah zao indray','2026-02-16 12:00:00'),(11,'mande aby','2026-02-16 12:00:00'),(12,'mlay be','2026-02-16 12:00:00'),(13,'Merci pour votre message.','2026-02-23 14:45:00'),(14,'Merci pour votre message.','2026-02-23 14:45:00'),(15,'Mande tsara.','2026-02-23 14:45:00'),(16,'top le izy e.','2026-02-23 14:45:00');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserMessage`
--

DROP TABLE IF EXISTS `UserMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserMessage` (
  `idUser` int(11) NOT NULL,
  `IdMessage` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`IdMessage`),
  UNIQUE KEY `UserMessage_IdMessage_idUser_unique` (`idUser`,`IdMessage`),
  KEY `IdMessage` (`IdMessage`),
  CONSTRAINT `usermessage_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usermessage_ibfk_2` FOREIGN KEY (`IdMessage`) REFERENCES `Message` (`IdMessage`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMessage`
--

LOCK TABLES `UserMessage` WRITE;
/*!40000 ALTER TABLE `UserMessage` DISABLE KEYS */;
INSERT INTO `UserMessage` VALUES (1,11),(2,11),(1,12),(2,12),(2,16);
/*!40000 ALTER TABLE `UserMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interaction`
--

DROP TABLE IF EXISTS `interaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interaction` (
  `IdInteraction` int(11) NOT NULL AUTO_INCREMENT,
  `Type` enum('AIMER','COMMENTER','PARTAGER') NOT NULL,
  `DateInteraction` datetime NOT NULL,
  `Contenu` text,
  `idUser` int(11) NOT NULL,
  `idPublication` int(11) NOT NULL,
  PRIMARY KEY (`IdInteraction`),
  KEY `idUser` (`idUser`),
  KEY `idPublication` (`idPublication`),
  CONSTRAINT `interaction_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interaction_ibfk_2` FOREIGN KEY (`idPublication`) REFERENCES `publications` (`IdPublication`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interaction`
--

LOCK TABLES `interaction` WRITE;
/*!40000 ALTER TABLE `interaction` DISABLE KEYS */;
INSERT INTO `interaction` VALUES (1,'COMMENTER','2026-02-25 08:10:00',NULL,2,1);
/*!40000 ALTER TABLE `interaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publications` (
  `IdPublication` int(11) NOT NULL AUTO_INCREMENT,
  `Titre` varchar(255) NOT NULL,
  `Contenu` varchar(255) NOT NULL,
  `DateCreation` datetime NOT NULL,
  `DateModification` datetime NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`IdPublication`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publications`
--

LOCK TABLES `publications` WRITE;
/*!40000 ALTER TABLE `publications` DISABLE KEYS */;
INSERT INTO `publications` VALUES (1,'Mande','Mande tsara le izy oa e.','2026-02-23 17:10:00','2026-02-24 17:10:00',1);
/*!40000 ALTER TABLE `publications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suggestion`
--

DROP TABLE IF EXISTS `suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suggestion` (
  `IdSuggestion` int(11) NOT NULL AUTO_INCREMENT,
  `Sujet` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DateCreation` datetime NOT NULL,
  `Status` enum('EN_ATTENTE','TRAITEE') NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`IdSuggestion`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `suggestion_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestion`
--

LOCK TABLES `suggestion` WRITE;
/*!40000 ALTER TABLE `suggestion` DISABLE KEYS */;
INSERT INTO `suggestion` VALUES (1,'Amélioration de l\'UI','Ajouter un mode sombre pour la page principale.','2026-02-23 17:10:00','TRAITEE',2),(2,'Amélioration','Ajouter un mode claire pour la page.','2026-02-23 17:10:00','TRAITEE',2),(3,'Mande','Mande tsara le izy oa e.','2026-02-23 17:10:00','TRAITEE',2);
/*!40000 ALTER TABLE `suggestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('ADMIN','CUSTOMER') NOT NULL,
  `DateCreator` datetime NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jean Dupont','admin@learnfrench.com','$2b$10$xs8TIcx32zH2nVCdlTmdXeiaPdsm5WPTGCOkgk9oKY.kNGlUyHT6C','ADMIN','2026-02-17 11:47:06'),(2,'Moi','moi@gmail.com','$2b$10$aEvz6ZYzppOdRBC5dp37be.b.fysas8Ykk2Gt2JOQ3znphQbV9lHy','CUSTOMER','2026-02-17 13:28:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-16 22:58:49
