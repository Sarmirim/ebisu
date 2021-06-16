-- CREATE DATABASE mydb;
-- use mydb;

CREATE TABLE tokens (
    id INT NOT NULL PRIMARY KEY,
    symbol TEXT NOT NULL,
    price DOUBLE PRECISION,
    trade TEXT,
    time TIMESTAMP WITH TIME ZONE
    -- PRIMARY KEY (id),
    -- UNIQUE (symbol)
);

INSERT INTO tokens
    (id, symbol, price, trade, time)
VALUES
    (0, 'mytest', NULL,  NULL, NULL),
    (1, 'bitcoin', 40000, '{"btcbusd": 38800.0001}', '2021-06-16 18:39:54+02'),
    (2, 'ethereum', 2500.66, '{"ethbtc": 0.062375, "ethbusd": 2420}', '2021-06-16 18:39:54+02'),
    (3, 'dogecoin', 0.31030, '{"dogerub": 22.327, "dogebtc": 0.000008}', '2021-06-16 18:39:54+02');