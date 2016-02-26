SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `technetium` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `technetium`;

DROP TABLE IF EXISTS `climatetech`;
CREATE TABLE IF NOT EXISTS `climatetech` (
  `timeStamp` timestamp NOT NULL,
  `zigbeeId` varchar(16) NOT NULL,
  `deviceType` int(4) NOT NULL,
  `temperature` float NOT NULL,
  `humidity` int(1) NOT NULL,
  `pressure` int(4) NOT NULL,
  PRIMARY KEY (`timeStamp`,`zigbeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


GRANT SELECT, INSERT ON *.* TO 'technetium'@'%' IDENTIFIED BY PASSWORD '*FFA15EFB7F73EE41FE77671F56AF65D01E6CC0A1';
GRANT ALL PRIVILEGES ON `technetium`.* TO 'technetium'@'%';
