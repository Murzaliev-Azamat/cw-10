create database azamat_cw_10;
use azamat_cw_10;

CREATE TABLE `news`
(
    `id`    int          NOT NULL AUTO_INCREMENT,
    `title` varchar(100) NOT NULL,
    `info`  text         NOT NULL,
    `image` varchar(100) DEFAULT NULL,
    `date` datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`id`)
);

CREATE TABLE `comments`
(
    `id`      int  NOT NULL AUTO_INCREMENT,
    `author`  varchar(50) DEFAULT NULL,
    `message` text NOT NULL,
    `news_id` int  NOT NULL,
    PRIMARY KEY (`id`),
    KEY `comments_news_id_fk` (`news_id`),
    CONSTRAINT `comments_news_id_fk` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO news (title, info, image, date) VALUES ('Смог над Бишкеком', 'В декабре 2017 года в кыргызстанском сегменте соцсетей начали обсуждать проблему смога над Бишкеком. Этот вопрос подняли и на заседании Жогорку Кенеша. Премьер-министр Сапар Исаков поручил подготовить варианты решения проблемы.', null, DEFAULT);
INSERT INTO news (title, info, image, date) VALUES ('В Бишкеке воздух стал чище — мэрия', 'Столичная мэрия теперь каждый день публикует данные о качестве воздуха. Также можно следить за показателями на сайте Кыргызгидромета.', null, DEFAULT);

INSERT INTO comments (author, message, news_id) VALUES ('Азамат', 'Снова смог', 1);