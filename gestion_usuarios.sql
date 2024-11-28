-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2024 a las 04:54:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` date NOT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `titulo`, `contenido`, `fecha`, `autor`, `imagen`, `creado_en`, `actualizado_en`) VALUES
(8, 'Mujeres en la Ciencia: Rompiendo Barreras Históricas', 'A pesar de los avances en igualdad de género, las mujeres siguen enfrentando desafíos en campos dominados históricamente por hombres, como la ciencia y la tecnología. Iniciativas como \"Girls Who Code\" y becas para mujeres en STEM buscan cerrar esta brecha. Destacadas científicas como Emmanuelle Charpentier y Jennifer Doudna, ganadoras del Nobel de Química por CRISPR, están inspirando a una nueva generación de mujeres a seguir carreras científicas.', '2024-11-13', 'Ana García', '1732510005647.jpg', '2024-11-25 04:46:45', '2024-11-25 04:46:45'),
(11, 'Avances en los Derechos de las Mujeres: Un Balance Actual', 'En las últimas décadas, los derechos de las mujeres han avanzado significativamente. Movimientos como #MeToo han visibilizado problemas sistémicos como el acoso y la violencia de género, impulsando reformas legales en varios países. Sin embargo, todavía existen desafíos en temas como la brecha salarial y el acceso a servicios de salud reproductiva. La lucha continúa con un enfoque en la educación y la equidad.', '2024-09-09', 'Laura Torres', '1732510425782.jpg', '2024-11-25 04:53:45', '2024-11-25 04:53:45'),
(12, 'Las Mujeres y el Cambio Climático', 'Las mujeres están liderando la lucha contra el cambio climático, con figuras como Greta Thunberg y Wangari Maathai en la vanguardia. Estudios muestran que las comunidades lideradas por mujeres tienden a implementar políticas más sostenibles. Además, organizaciones internacionales están promoviendo la participación femenina en soluciones climáticas, reconociendo su papel crucial en la protección del medio ambiente.', '2024-04-18', 'Daniela Cruz', '1732510489059.avif', '2024-11-25 04:54:49', '2024-11-25 04:54:49'),
(13, 'Mujeres Emprendedoras: Cambiando el Mundo de los Negocios', 'El emprendimiento femenino está en auge, con mujeres liderando empresas innovadoras en tecnología, moda y sostenibilidad. A pesar de enfrentar mayores obstáculos para obtener financiamiento, las emprendedoras han demostrado ser resilientes. Programas como \"SheMeansBusiness\" buscan empoderar a más mujeres para que transformen sus ideas en negocios exitosos y contribuyan al crecimiento económico global.', '2024-11-01', 'Carolina Ramírez', '1732510540190.jpg', '2024-11-25 04:55:40', '2024-11-25 04:55:40'),
(18, 'Mujeres en el Deporte: Superando Prejuicios y Limitaciones', 'Las mujeres están alcanzando nuevos hitos en el deporte, rompiendo récords y desafiando estereotipos. Atletas como Serena Williams y Simone Biles han demostrado que las mujeres pueden dominar en cualquier disciplina. Sin embargo, aún enfrentan desigualdad en términos de salarios, cobertura mediática y acceso a recursos. La lucha por la equidad en el deporte continúa inspirando a las generaciones futuras.\r\n', '2024-04-11', 'Elena Sánchez', '1732540999146.jpg', '2024-11-25 13:23:19', '2024-11-25 13:23:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
