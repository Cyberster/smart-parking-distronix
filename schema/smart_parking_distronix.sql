-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 21, 2020 at 02:43 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_parking_distronix`
--

-- --------------------------------------------------------

--
-- Table structure for table `bay`
--

CREATE TABLE `bay` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `x_coordinate` decimal(10,7) NOT NULL,
  `y_coordinate` decimal(10,7) NOT NULL,
  `sensor_id` int(10) NOT NULL,
  `lot_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bay`
--

INSERT INTO `bay` (`id`, `name`, `x_coordinate`, `y_coordinate`, `sensor_id`, `lot_id`) VALUES
(2, 'B1', '12.0000000', '10.0000000', 1, 1),
(4, 'B2', '13.0000000', '11.0000000', 2, 1),
(5, 'B3', '13.0000000', '11.0000000', 3, 1),
(6, 'B4', '15.0000000', '13.0000000', 4, 1),
(7, 'B5', '16.0000000', '14.0000000', 5, 1),
(9, 'B6', '17.0000000', '15.0000000', 6, 1),
(10, 'B7', '18.0000000', '16.0000000', 7, 1),
(11, 'B8', '19.0000000', '17.0000000', 8, 1),
(15, 'B1', '3.0000000', '4.0000000', 9, 2),
(16, 'B2', '4.0000000', '5.0000000', 10, 2),
(17, 'B3', '5.0000000', '6.0000000', 11, 2),
(18, 'B4', '6.0000000', '7.0000000', 12, 2),
(19, 'B5', '7.0000000', '8.0000000', 13, 2),
(20, 'B6', '8.0000000', '9.0000000', 14, 2),
(21, 'B7', '9.0000000', '10.0000000', 15, 2),
(22, 'B8', '10.0000000', '11.0000000', 16, 2);

-- --------------------------------------------------------

--
-- Table structure for table `gateway`
--

CREATE TABLE `gateway` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gateway`
--

INSERT INTO `gateway` (`id`, `uuid`) VALUES
(3, '55a22e20-e124-42d7-ab32-064b0f24fafa'),
(2, '58d89c9e-b275-4062-8975-c053b2e45d5d'),
(1, 'ac884226-487b-4246-be2e-641278347fa1');

-- --------------------------------------------------------

--
-- Table structure for table `lot`
--

CREATE TABLE `lot` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `gateway_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lot`
--

INSERT INTO `lot` (`id`, `name`, `latitude`, `longitude`, `gateway_id`) VALUES
(1, 'L1', '15.1212120', '12.4542420', 1),
(2, 'L2', '15.3213210', '12.4565650', 2),
(3, 'L3', '15.3213210', '12.4565650', 3);

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `is_occupied` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `uuid`, `is_occupied`) VALUES
(1, '45e0c726-4d19-4029-902b-ece36bceb3c1', 0),
(2, ' be4771a6-f402-4da1-9d36-a1b5fb028235', 1),
(3, '12ae31c5-92d1-4e3c-b659-37f78452ea89', 1),
(4, 'af11ddad-a8da-4feb-bb73-9c4d46074512', 0),
(5, '3cdc13ce-e08f-4a85-823b-4a6e6ed5e382', 1),
(6, '57834963-27c6-4c89-ba9c-de9efcd4b6dd', 0),
(7, '684a4bcb-1831-417e-8444-accb918e8937', 1),
(8, '81df42fa-65c7-407c-83dd-6a9bfdfd978c', 1),
(9, 'ebda2a36-6ca7-41e9-a32f-248b6bd5dfa8', 0),
(10, '8ebd60dd-f5df-4347-b074-4d8e341e0cf0', 1),
(11, 'ad7a410c-ba7c-4b05-a8f1-d92f00f1482b', 0),
(12, '77da7b74-0f89-4f22-a5a7-e5b3d1d128d9', 1),
(13, 'd1db1556-eccc-4e6a-9020-44fbc2610337', 0),
(14, '1cbfcac3-38b0-4d1c-9097-a831765e6a35', 1),
(15, 'ef9ba72d-5e50-4f23-abed-8fdeca7caea7', 0),
(16, '1c0e8216-2d26-4ba2-9a6b-3071495051a2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `sensor_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_occupied` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `sensor_id`, `timestamp`, `is_occupied`) VALUES
(1, 1, '0000-00-00 00:00:00', 0),
(2, 1, '2020-07-18 18:30:00', 0),
(3, 1, '2020-07-19 08:12:34', 0),
(4, 1, '2020-07-19 08:12:35', 1),
(6, 1, '2020-07-19 08:12:35', 1),
(7, 2, '2020-07-19 08:12:35', 1),
(9, 5, '2020-07-19 08:12:35', 1),
(12, 1, '2020-07-19 08:12:35', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bay`
--
ALTER TABLE `bay`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_lot` (`name`,`lot_id`) USING BTREE,
  ADD KEY `bay_fk0` (`sensor_id`),
  ADD KEY `bay_fk1` (`lot_id`);

--
-- Indexes for table `gateway`
--
ALTER TABLE `gateway`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `lot`
--
ALTER TABLE `lot`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `gateway_id` (`gateway_id`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_fk0` (`sensor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bay`
--
ALTER TABLE `bay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `gateway`
--
ALTER TABLE `gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lot`
--
ALTER TABLE `lot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bay`
--
ALTER TABLE `bay`
  ADD CONSTRAINT `bay_fk0` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`),
  ADD CONSTRAINT `bay_fk1` FOREIGN KEY (`lot_id`) REFERENCES `lot` (`id`);

--
-- Constraints for table `lot`
--
ALTER TABLE `lot`
  ADD CONSTRAINT `lot_fk0` FOREIGN KEY (`gateway_id`) REFERENCES `gateway` (`id`);

--
-- Constraints for table `status`
--
ALTER TABLE `status`
  ADD CONSTRAINT `status_fk0` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
