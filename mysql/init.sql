-- Preparation
DROP TABLE IF EXISTS `Characters`;
DROP TABLE IF EXISTS Animes;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS MBTI;

-- Genres Table
CREATE TABLE Genres(
    GenreID INT UNIQUE PRIMARY KEY,
    Genre VARCHAR(20)
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/Genres.csv'
INTO TABLE Genres
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

-- Animes Table
CREATE TABLE Animes(
    AnimeID INT PRIMARY KEY,
    AnimeName VARCHAR(60) UNIQUE NOT NULL,
    GenreID INT,
    Rating DECIMAL(3, 1),
    Hulu VARCHAR(200),
    Crunchyroll VARCHAR(200),
    Other VARCHAR(200),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/Animes.csv'
INTO TABLE Animes
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

-- Characters Table
CREATE TABLE `Characters`(
    CharacterID INT PRIMARY KEY,
    CharacterName VARCHAR(40),
    MBTI CHAR(4),
    AnimeID INT,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/Characters.csv'
INTO TABLE `Characters`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

CREATE TABLE MBTI (
    MBTI CHAR(4) PRIMARY KEY,
    Start INT,
    End INT
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/MBTI.csv'
INTO TABLE MBTI
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(MBTI, Start, End);