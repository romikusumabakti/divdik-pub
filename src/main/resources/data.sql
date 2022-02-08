INSERT
    IGNORE
INTO account(id, nim, username, email, password, name)
VALUES (1, '02031911067', 'romi', 'romikusumab@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Romi Kusuma Bakti'),
       (2, '01021911037', 'tiara', 'tiara@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Tiara Agustin'),
       (3, '02042011003', 'ari', 'ari@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Ari Sandi Shefa Maldini'),
       (4, '02042011018', 'mita', 'mita@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Mita Zuriati'),
       (5, '02042011013', 'edwar', 'edwar@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Edwar Maulana Sitompul'),
       (6, '02042011005', 'aris', 'aris@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Aris Purnama'),
       (7, '02042011011', 'dani', 'dani@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Dani Hidayat'),
       (8, '02042011016', 'jamil', 'jamil@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Jamil Hamdi Harahap'),
       (9, '03051911040', 'yoga', 'yoga@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Yoga Hendrapratama'),
       (10, '02042011024', 'seli', 'seli@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Seli Deslia'),
       (11, '02042011021', 'nurul', 'nurul@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', "Nushrotummillah Nurul 'Aini"),
       (12, '02031911056', 'habib', 'habib@gmail.com',
        '$2a$10$2YopWZM1gv25/2KHAvng4OZtUIEMqNR2wwEdweoNgjklbbt5Evj6q', 'Habib Jannata');

INSERT
    IGNORE
INTO room(id, name)
VALUES (1, '2D'),
       (2, 'B31'),
       (3, 'B26'),
       (4, 'B24'),
       (5, 'B33');

INSERT
    IGNORE
INTO course(id, name, duration)
VALUES (1, 'Struktur Data', 2),
       (2, 'Basis Data', 2);

INSERT
    IGNORE
INTO course_group(id, number)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10);

INSERT
    IGNORE
INTO course_schedule(id, course_id, course_group_id, instructor_id, room_id, day, time)
VALUES (1, 1, 1, 1, 2, 3, '20:00'),
       (2, 2, 1, 2, 1, 6, '16:00'),
       (3, 1, 2, 3, 1, 3, '20:00'),
       (4, 2, 2, 4, 3, 6, '16:00'),
       (5, 1, 3, 4, 3, 3, '20:00'),
       (6, 2, 3, 5, 4, 6, '16:00'),
       (7, 1, 4, 6, 4, 3, '20:00'),
       (8, 2, 4, 7, 2, 6, '16:00'),
       (9, 1, 5, 2, 5, 3, '20:00'),
       (10, 2, 5, 8, 5, 6, '16:00'),
       (11, 1, 6, 9, 1, 5, '20:00'),
       (12, 2, 6, 10, 1, 0, '16:00'),
       (13, 1, 7, 7, 2, 5, '20:00'),
       (14, 2, 7, 1, 2, 0, '16:00'),
       (15, 1, 8, 11, 3, 5, '20:00'),
       (16, 2, 8, 9, 3, 0, '16:00'),
       (17, 1, 9, 10, 4, 5, '20:00'),
       (18, 2, 9, 11, 4, 0, '16:00'),
       (19, 1, 10, 8, 5, 5, '20:00'),
       (20, 2, 10, 12, 5, 0, '16:00');