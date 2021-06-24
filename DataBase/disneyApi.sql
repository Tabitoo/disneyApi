-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: disneymovies
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `character_movies`
--

DROP TABLE IF EXISTS `character_movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `characterid` int NOT NULL,
  `movieid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MOVIE_ID_idx` (`movieid`),
  KEY `FK_CHARACTER_ID_idx` (`characterid`),
  CONSTRAINT `FK_CHARACTER_ID` FOREIGN KEY (`characterid`) REFERENCES `characters` (`id`),
  CONSTRAINT `FK_MOVIE_ID` FOREIGN KEY (`movieid`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_movies`
--

LOCK TABLES `character_movies` WRITE;
/*!40000 ALTER TABLE `character_movies` DISABLE KEYS */;
INSERT INTO `character_movies` VALUES (1,1,1),(2,2,3),(3,2,2),(4,4,4),(5,5,4);
/*!40000 ALTER TABLE `character_movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `age` int NOT NULL,
  `weight` int DEFAULT NULL,
  `history` varchar(1000) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Mufasa',44,80,'El Rey Mufasa es un personaje principal de la película The Lion King. Es el padre de Simba, el esposo de Sarabi, el hermano mayor de Scar y el Rey de las Tierras del Reino al comienzo de la película.','https://i.imgur.com/QFC6AW4.png'),(2,'Mulan',16,60,'Es una joven muchacha china que se alista en el ejército en lugar de su padre disfrazada de chico para la lucha contra los Hunos, ya que se preocupa de su padre. Mushu, un dragón que dice ser enviado por sus antepasados, le ayuda a adaptarse y a que le vaya todo bien. También lleva con ella a un pequeño Grillo de la Suerte regalado por su abuela. En el ejército se hace llamar \"Ping\", y consigue ser el guerrero más querido del Capitán Shang, y se hace buena amiga de los guerreros Yao, Ling y Chien Po. Al final, ella resulta ser el mayor rival al que se enfrenta Shan Yu, el líder de los Hunos','https://i.imgur.com/80bLmgM.png'),(4,'Hercules',20,80,'Es el hijo de Zeus y Hera. Pudo descubrir el significado de ser un Héroe verdadero: el poder de un héroe no está en su fuerza, si no en la fuerza de su corazón. Se hizo amigo de Fil y de Pegaso, y se enamoró de Megara. Éste chico cumplió el sueño de su entrenador Phil, convirtiéndose en el mayor héroe de la historia. También tuvo muchos enemigos: Hades, dios del inframundo que junto con sus ayudantes Pena y Pánico planea derrotar a Hércules; Nesso, el centauro guardián del río; la Hidra, el monstruo de múltiples cabezas; los Titanes, etc. Él rechaza ser un dios sólo para estar con Meg.','https://i.imgur.com/r7HjyBQ.jpeg'),(5,'Megara',20,60,'Megara (mejor conocida como Meg) es la co-protagonista del largometraje animado de Disney de 1997, Hercules.','https://i.imgur.com/ERGwQtm.png');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Adventure','https://i.imgur.com/vBfpplz.png'),(2,'Drama','https://i.imgur.com/PkSPUlC.jpg'),(3,'Musical','https://i.imgur.com/YqlKvlo.jpg');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `ranking` float DEFAULT NULL,
  `image` varchar(100) NOT NULL,
  `genreid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_GENRE_ID_idx` (`genreid`),
  CONSTRAINT `FK_GENRE_ID` FOREIGN KEY (`genreid`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'The Lion King','1994-07-07',10,'https://i.imgur.com/cLQMqbc.jpeg',2),(2,'Mulan','1998-05-07',5,'https://i.imgur.com/HviPYwS.jpeg',1),(3,'Mulan 2','2004-01-02',2,'https://i.imgur.com/aGgBsFy.png',1),(4,'Hercules','1997-06-27',5,'https://i.imgur.com/AZZAjNk.jpeg',1);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'lautaro12@gmail.com','$2b$12$s0vB2MVnvTTXni11VT0Vler/vc1MC0ZTrJtYZl6kpJICEqNt.wVJi'),(7,'lautarovaldez9@gmail.com','$2b$12$3GXUhmWigIE.louOIY8wpO5MjvB23s40gSxMGbUxFK2u3GA.EFsQK'),(10,'lautarovaldez98@gmail.com','$2b$12$5I9w0CECyeZSkriEGytRHeCksObDJmpb8CdNrc12yH1xNAlUGwTji'),(13,'lautarovaldez445@gmail.com','$2b$12$xVzD6Gr3j2.xGnQzF4.7mOtQCkhvxnktZkkYM2A0DfWFQtGWkQ8iq'),(14,'lautarovaldez4@gmail.com','$2b$12$aVYMHcm9BpV8C3CiNvTbrOYJDXf2FX/UAYP9cDbdkAbVIOAPzgu4K'),(15,'pepe12314152@gmail.com','$2b$12$JyUhRZCdaJWA0U/u1LPov.IY7z4nG4CB5VYZHGq2./f7pOHO8RMLS'),(16,'email@gmail.com','$2b$12$XR6oszHutYmLe9lO6tFQPumDqjl2PS4lw8mi.BvlBedbTOPxhYHMW');
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

-- Dump completed on 2021-06-22 12:45:30
