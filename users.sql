-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2024 at 04:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `role`) VALUES
(1, 'janermyle11@gmail.com', '$2y$10$Xzw/pKhyjO4FqZjk3vke2uzDS2iNg19SFqz6zrW5pQNb83SqQ..zy', '2024-11-11 14:44:14', 'user'),
(2, 'mylesgwapoo@gmail.com', '$2y$10$aWXvmyxJIe7e5q8fyHNNGuKjWaJqIB1fsmw/xRL/PjDfbSEM78v3S', '2024-11-11 14:44:51', 'user'),
(3, 'shinznz@gmail.com', '$2y$10$ry/zIdcpYzXJEjJp4SvFheyg81wfzpbAdklc10xyrjY1xz3zaE5cK', '2024-11-11 14:48:12', 'user'),
(4, 'gail@gmail.com', '$2y$10$HVlwIgSwFdoodBNHTJcn.OGDFe4EOl.RhlRaOGqOrGvloumxjW0N2', '2024-11-11 14:50:03', 'admin'),
(5, 'Janmy30', '$2y$10$tl7mh.rquCd/04DS4./A0eVqzsK2bZp/58uBb0UG926db42ICvNk6', '2024-11-11 15:01:40', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
