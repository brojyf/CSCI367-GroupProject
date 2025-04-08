DROP TABLE IF EXISTS rose_shop;

CREATE TABLE rose_shop (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATE UNIQUE NOT NULL,
  price DECIMAL(10, 2)
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/rose.csv'
INTO TABLE rose_shop
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(date, price);
