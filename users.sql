CREATE TABLE `Cats` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `CatName` varchar(50) NOT NULL,
  `ImagePath` varchar(50) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Cats` (`id`,  `CatName`, `ImagePath`) VALUES
(1, 'Fluffy','images/Fluffy.jpeg'),
(2, 'Beggar','images/begging.jpeg'),
(3,	'Cleo','images/Cleo.jpeg'),
(4,	'Tabby','images/tabby.jpeg'),
(5,	'Blacky','images/blacky.jpeg')
