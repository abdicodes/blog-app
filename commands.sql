CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, 
                    url text NOT NULL, title text NOT NULL, 
                    likes INTEGER DEFAULT 0);


 INSERT INTO blogs (author, url, title) values 
                    ('Abdi', 'www.example.com', '2nd book');

 INSERT INTO blogs (author, url, title) values 
                    ('Abdi', 'www.example.com', 'To be or not to be');