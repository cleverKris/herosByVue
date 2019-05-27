/*
Navicat MySQL Data Transfer

Source Server         : kris
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : heros

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2019-05-28 00:08:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for herosup
-- ----------------------------
DROP TABLE IF EXISTS `herosup`;
CREATE TABLE `herosup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of herosup
-- ----------------------------
INSERT INTO `herosup` VALUES ('11', '小姐姐', '女', 'views/img/3.jpg');
INSERT INTO `herosup` VALUES ('12', '小姐姐', '女', 'views/img/2.jpg');
