CREATE TABLE blogs ( 
    id SERIAL PRIMARY KEY,
    author TEXT,
    "url" TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Tatu Kaikkonen', 'https://example.com', 'Me and relational databases', 1000);

INSERT INTO blogs (author, url, title) VALUES ('Matti Meikäläinen', 'https://google.com', 'I love databases');