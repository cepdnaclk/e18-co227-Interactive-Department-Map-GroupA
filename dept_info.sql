-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 16, 2022 at 05:25 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dept_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
CREATE TABLE IF NOT EXISTS `buildings` (
  `buildingName` varchar(50) NOT NULL,
  `mainInfo` varchar(200) NOT NULL,
  `additionalInfo` varchar(300) NOT NULL,
  PRIMARY KEY (`buildingName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`buildingName`, `mainInfo`, `additionalInfo`) VALUES
('Department Building', '<li>Welcome to Computer Engineering Department</li><li>Head of the department is Mr.Rohitha</li><li>This is a 4 story building</li>', '<li>Welcome to Computer Engineering Department</li><li>University of Peradeniya</li><li>Head of the department is Mr.Rohitha (BsC .jhbasdvll)</li><li>This is a 4 story building which has 4 labs and bla bla bla</li>'),
('Department Office', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>'),
('HOD\'s Office', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>'),
('Conference Room', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>'),
('Central Lobby', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>\r\n'),
('Filling Room', '<li>abcd</li><li>klmn</li><li>pqrs</li>\r\n', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>'),
('Staff Common Room 1', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li><li>wge wgweg ehrg asd</li>'),
('Staff Common Room 2', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Open Lab 1', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Open Lab 2', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Gents Washrooms', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Ladies Washroom', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('ACES Room', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Mens Washroom 1', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Mens Washroom 2', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Ladies Washroom 1', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Ladies Washroom 2', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Garden', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Corridor 1', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Corridor 2', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Lift', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Servant Room', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>'),
('Entrance Lobby', '<li>abcd</li><li>klmn</li><li>pqrs</li>', '<li>aksfbkf rgeag</li><li>wef wegega wgg</li><li>wgGWG GAREGEAG WQEFWQ</li>');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
