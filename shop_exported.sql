CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`idcart`),
  KEY `cart_ibfk_1_idx` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
  `idcartitems` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`idcartitems`),
  KEY `cart_id` (`cart_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`idcart`),
  CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`iditems`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idcategories` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`idcategories`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Процессоры'),(2,'Материнские платы'),(3,'Оперативная память'),(4,'Жесткие диски(HDD)'),(6,'Твердотельные накопители(SSD)'),(7,'Системы охлаждения'),(8,'Периферийные устройства'),(9,'Наушники'),(10,'Маршрутизаторы'),(11,'Видеокарты');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `iditems` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`iditems`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`idcategories`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (2,'Процессор AMD Ryzen Threadripper PRO 5995WX OEM','sWRX8, 64 x 2.7 ГГц, L2 - 32 МБ, L3 - 256 МБ, 8 х DDR4-3200 МГц, TDP 280 Вт',600000.00,0,'/images/проц1.jpg',1),(3,'Материнская плата ASUS Pro WS WRX90E-SAGE SE','sTR5, AMD WRX90, 8xDDR5-4800 МГц, 7xPCI-Ex16, 4xM.2, SSI-EEB',183000.00,4,'/images/мат1.jpg',2),(4,'Видеокарта Palit GeForce RTX 4090 GameRock [NED4090019SB-1020G]','PCIe 4.0 24 ГБ GDDR6X, 384 бит, 3 x DisplayPort, HDMI, GPU 2235 МГц',226000.00,8,'/images/видео1.jpg',11),(5,'Оперативная память Kingston FURY Renegade Silver 96 ГБ','DDR5, 48 ГБx2 шт, 6400 МГц, 32-39-39',56999.00,44,'/images/оперативка1.jpg',3),(6,'Кулер для процессора Thermalright Silver Arrow IB-E Extreme Rev. B','основание - медь, 2500 об/мин, 45 дБ, 4 pin, 320 Вт',14399.00,6,'/images/кулер1.jpg',7),(7,'Жесткий диск WD Red Pro 22 ТБ','SATA III, 6 Гбит/с, 7200 об/мин, кэш память - 512 МБ, RAID Edition',75499.00,2,'/images/hdd1.jpg',4),(8,'2.5\" SATA накопитель Samsung 870 QVO 8000 ГБ','SATA, чтение - 560 Мбайт/сек, запись - 530 Мбайт/сек, 3D NAND 4 бит MLC (QLC), TBW - 2880 ТБ',64299.00,31,'/images/ssd1.jpg',6),(9,'Мышь проводная ARDOR GAMING Fury черный','12400 dpi, USB Type-A, кнопки - 7',1499.00,53,'/images/мышь1.jpg',8),(10,'Беспроводные/проводные наушники Marshall Major IV черный','2.0, накладные, 20 Гц - 20000 Гц, 32Ω, Bluetooth, проводной, 5.0, кабель - 2.15 м, беспроводная зарядка',11999.00,41,'/images/наушники1.jpg',9),(11,'Wi-Fi роутер TP-Link Archer AX1500','4 LAN, 1000 Мбит/с, 4 (802.11n), 5 (802.11ac), 6 (802.11ax), Wi-Fi 1501 Мбит/с, IPv6',5099.00,36,'/images/роутер1.jpg',10);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin'),(2,'user','user','user'),(4,'admin1','admin1','admin'),(5,'admin123','admin123','admin');
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

-- Dump completed on 2024-09-26 11:04:29
