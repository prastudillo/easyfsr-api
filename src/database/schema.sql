-- User
DROP USER IF EXISTS 'easyfsr'@'localhost';
CREATE USER 'easyfsr'@'localhost' IDENTIFIED BY 'admin';

-- Database
DROP DATABASE IF EXISTS easyfsr;
CREATE DATABASE easyfsr;

USE easyfsr;

-- Tables

CREATE TABLE user(
  userID INT NOT NULL AUTO_INCREMENT, 
  employeeID VARCHAR (30) NOT NULL,
  password VARCHAR (60) NOT NULL,
  firstName VARCHAR (50) NOT NULL,
  middleName VARCHAR (50),
  lastName VARCHAR (50) NOT NULL,
  committee VARCHAR (30),
  isHead BOOLEAN,      
  officeNumber VARCHAR (30), 
  contractType VARCHAR (40) NOT NULL, -- FULL-TIME / PART-TIME
  emailAddress VARCHAR (40) NOT NULL,
  rank VARCHAR (30),
  isArchived BOOLEAN DEFAULT 0, 
  acctType VARCHAR(10) DEFAULT 'USER', -- ADMIN / USER
  `profileIcon` TEXT (50),
  CONSTRAINT `user_pk`
    PRIMARY KEY (`userID`),
  CONSTRAINT `user_empid_uk`
    UNIQUE KEY (`employeeID`),
  CONSTRAINT `user_email_uk`
    UNIQUE KEY (`emailAddress`)
);

CREATE TABLE fsr(
  `id` INT NOT NULL AUTO_INCREMENT,
  `userID` INT NOT NULL, 
  `acadYear` VARCHAR (20) NOT NULL,
  `semester` VARCHAR (10) NOT NULL,
  `isChecked` boolean DEFAULT 0,
  `teachingLoadCreds` INT(2) DEFAULT 0,
  `filepath` TEXT (50),
  -- place all entitiesID here
  CONSTRAINT `fsr_pk` 
    PRIMARY KEY (`id`),
  CONSTRAINT `user_fsr_fk`
  FOREIGN KEY (`userID`)
    REFERENCES user(`userID`)
);

-- Entities under FSR 

  -- teaching_load, subject, timeslot

-- CREATE TABLE `teachingLoad`(
--   `id` INT NOT NULL,
--   `teachingLoadCreds` INT(2) NOT NULL,
--   CONSTRAINT `teachingLoad_user_fk`
--     FOREIGN KEY (`id`)
--     REFERENCES fsr(`id`),
--   CONSTRAINT `teachingLoad_pk`  
--     PRIMARY KEY(`id`)
-- );

CREATE TABLE `subject`(
  `id` INT NOT NULL,
  `subjectCode` VARCHAR (30) NOT NULL,
  `subjectID` INT NOT NULL AUTO_INCREMENT,
  `teachingLoadCreds` INT(2) DEFAULT 0,
  `noOfStudents` INT(3) NOT NULL, 
  `hoursPerWeek` INT(2) NOT NULL,
  `sectionCode` VARCHAR(10) NOT NULL,
  `room` VARCHAR(10) NOT NULL,
  CONSTRAINT `subject_pk` 
    PRIMARY KEY (`subjectID`), 
  CONSTRAINT `subject_teachingLoad_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`)
);

CREATE TABLE `timeslot`(
  `timeslotID` INT NOT NULL AUTO_INCREMENT,
  `subjectID` INT NOT NULL,
  `day` VARCHAR(10) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  CONSTRAINT `timeslot_subject_fk`
    FOREIGN KEY (`subjectID`)
    REFERENCES subject(`subjectID`)
  ON DELETE CASCADE,
  CONSTRAINT `timeslot_pk`
    PRIMARY KEY (timeslotID)
);

  -- study load, course, courseSched

CREATE TABLE `studyLoad`(
  `degree` VARCHAR (50) NOT NULL,
  `university` VARCHAR (50) NOT NULL,
  `totalSLcredits` INT (10) DEFAULT 0,
  `id` INT NOT NULL,
  CONSTRAINT `studyLoad_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `studyLoad_pk`
    PRIMARY KEY(`id`)
);

CREATE TABLE `course`(
  `courseID` INT NOT NULL AUTO_INCREMENT,
  `hoursPerWeek` VARCHAR (10) NOT NULL,
  `school` VARCHAR (30) NOT NULL,
  `credit` INT (2) NOT NULL,
  `courseNumber` VARCHAR (20) NOT NULL,
  `id` INT NOT NULL,
  CONSTRAINT `course_studyLoad_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `course_pk`
    PRIMARY KEY (`courseID`)
);

CREATE TABLE `courseSched`(
  `courseSchedID` INT NOT NULL AUTO_INCREMENT,
  `courseID` INT NOT NULL,
  `day` VARCHAR (30) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  CONSTRAINT `courseSched_course_fk`
    FOREIGN KEY (`courseID`)
    REFERENCES course(`courseID`)
    ON DELETE CASCADE,
  CONSTRAINT `courseSched_pk`
    PRIMARY KEY (courseSchedID)
);

-- Consultation hours and CH Timeslot

CREATE TABLE `consultationHours`(
  `chID` INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `place` varchar (50) NOT NULL,
  CONSTRAINT `consultationHours_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `consultationHours_pk`
    PRIMARY KEY (`chID`)   
);

CREATE TABLE `chTimeslot`(
  `chTimeslotID`INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `chID` INT NOT NULL,
  `day` varchar(10) NOT NULL,
  `timeStart` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  `timeEnd` TIME NOT NULL, -- TIME FORMAT HH:MM:SS
  CONSTRAINT `chTimeslot_consultationHours_fk`
    FOREIGN KEY (`chID`)
    REFERENCES consultationHours(`chID`)
    ON DELETE CASCADE,
  CONSTRAINT `chTimeslot_consultationHours_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES consultationHours(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `chTimeslot_pk`
    PRIMARY KEY(chTimeslotID)
);

-- Professorial Chair or Faculty Grant or Nominee (Award)

CREATE TABLE `award`(
  `awardID` INT NOT NULL AUTO_INCREMENT, 
  `id` INT NOT NULL,
  `grantF` VARCHAR (50) NOT NULL,
  `chairGrantTitle` VARCHAR (50) NOT NULL,
  `collegeHasNominated` VARCHAR (50) NOT NULL,
  `recipientOrNominee` VARCHAR (50) NOT NULL,
  `professionalChair` VARCHAR (50) NOT NULL,
  `approvedStartDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE NOT NULL, --                             DATE format: YYYY-MM-DD
  `filepath` TEXT (50),
  CONSTRAINT `award_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `award_pk`
    PRIMARY KEY (`awardID`) 
);
-- Limited Practice of Profession

CREATE TABLE `limitedPracticeOfProf`(
  `limitedPracticeOfProfID` INT NOT NULL AUTO_INCREMENT, 
  `id` INT NOT NULL,
  `askedPermission` VARCHAR (10) NOT NULL,  -- YES / NO
  `date` DATE,  --                   DATE format: YYYY-MM-DD
  CONSTRAINT `limitedPracticeOfProf_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `limitedPracticeOfProf_pk`
    PRIMARY KEY (`limitedPracticeOfProfID`) 
);

CREATE TABLE `extensionAndCommunityService`(
  `id` INT NOT NULL, 
  `extAndCommServiceID` INT NOT NULL AUTO_INCREMENT,
  `participant` VARCHAR (50) NOT NULL,
  `role` VARCHAR (50) NOT NULL,
  `hours` INT (3) NOT NULL,
  `title` VARCHAR (50) NOT NULL,
  `creditUnit` INT (2) NOT NULL,
  `type` VARCHAR (50) NOT NULL,
  `startDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE NOT NULL, --                     DATE format: YYYY-MM-DD
  CONSTRAINT `extensionAndCommunityService_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `extAndCommService_pk` 
    PRIMARY KEY (`extAndCommServiceID`) 
);

-- Administrative Work

CREATE TABLE `adminWork`(
  `adminWorkID` INT NOT NULL AUTO_INCREMENT, 
  `position` VARCHAR(50) NOT NULL,
  `officeUnit` VARCHAR(50) NOT NULL,
  `approvedUnits` INT(2) NOT NULL,
  `id` INT NOT NULL,
  CONSTRAINT `adminWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `adminWork_pk` 
    PRIMARY KEY (`adminWorkID`) 
);

-- Creative Work, Creative Work Co-Authors

CREATE TABLE `creativeWork`(
  `id` INT NOT NULL,
  `creativeWorkID` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `credUnit` INT (10) NOT NULL,
  `filepath` TEXT (50),
  CONSTRAINT `creativeWork_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `creativeWork_pk`
    PRIMARY KEY (`creativeWorkID`)
);

CREATE TABLE `cworkCoAuthor`(
  `cworkCoAuthorID` INT NOT NULL AUTO_INCREMENT,
  `creativeWorkID` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  CONSTRAINT `cworkCoAuthor_creativeWork_fk`
    FOREIGN KEY (`creativeWorkID`)
    REFERENCES creativeWork(`creativeWorkID`)
  ON DELETE CASCADE,
  CONSTRAINT `cworkCoAuthor_pk`
    PRIMARY KEY (`cworkCoAuthorID`)
);


-- research

CREATE TABLE `research`(
  `id` INT NOT NULL,
  `researchID` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR (30) NOT NULL, -- PROPOSAL / IMPLEMENTATION
  `role` VARCHAR (30) NOT NULL,
  `title` VARCHAR (50) NOT NULL,
  `startDate` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `endDate` DATE DEFAULT NULL, --                 DATE format: YYYY-MM-DD
  `funding` VARCHAR (30) NOT NULL,
  `approvedUnits` VARCHAR (30) NOT NULL,
  `filepath` TEXT (50),
  CONSTRAINT `research_fsr_fk`
    FOREIGN KEY (`id`)
    REFERENCES fsr(`id`),
  CONSTRAINT `research_pk`
    PRIMARY KEY (`researchID`)
);


CREATE TABLE rCoAuthor(
  `rCoAuthorID` INT NOT NULL AUTO_INCREMENT,
  `researchID` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  CONSTRAINT `rCoAuthor_research_fk`
    FOREIGN KEY (`researchID`)
    REFERENCES research(`researchID`)
  ON DELETE CASCADE,
  CONSTRAINT `rCoAuthor_pk`
    PRIMARY KEY (`rCoAuthorID`)
);

CREATE TABLE `notification`(
  `notificationID` INT NOT NULL AUTO_INCREMENT,
  `senderID` INT NOT NULL,
  `receiverID` INT NOT NULL,
  `message` varchar(1000) NOT NULL,
  `dateSent` DATE NOT NULL, --                   DATE format: YYYY-MM-DD
  `timeSent` TIME NOT NULL,
  `isResolved` BOOLEAN,
  CONSTRAINT `notification_pk`
    PRIMARY KEY(`notificationID`),
  CONSTRAINT `notification_user_fk`
    FOREIGN KEY (`senderID`)
    REFERENCES user(`userID`),
  CONSTRAINT `notificationReceived_user_fk`
    FOREIGN KEY (`receiverID`)
    REFERENCES user(`userID`)
);

CREATE TABLE announcement(
   `announcementID` INT NOT NULL AUTO_INCREMENT,
   `userID` INT NOT NULL, -- userID of who sent the announcement 
   `title` VARCHAR (512) NOT NULL,
   `body` TEXT(10000) NOT NULL,
   `isResolved` BOOLEAN DEFAULT 0,
   CONSTRAINT `announcement_pk`
     PRIMARY KEY(`announcementID`),
   CONSTRAINT `announcement_user_fk`
    FOREIGN KEY (`userID`)
    REFERENCES user(`userID`)
);

-- Trigger for Teaching Load of FSR

CREATE TRIGGER insert_teachingLoadCreds 
AFTER INSERT ON subject
FOR EACH ROW 
  UPDATE fsr 
    SET teachingLoadCreds = teachingLoadCreds + NEW.teachingLoadCreds
    WHERE id = NEW.id AND NEW.subjectID = NEW.subjectID;

CREATE TRIGGER delete_teachingLoadCreds 
BEFORE DELETE ON subject
FOR EACH ROW 
UPDATE fsr 
  SET teachingLoadCreds = teachingLoadCreds - OLD.teachingLoadCreds;


-- Trigger for Study Load of FSR 

CREATE TRIGGER insert_totalSLcredits 
AFTER INSERT ON course
FOR EACH ROW 
  UPDATE studyLoad 
    SET totalSLcredits = totalSLcredits + NEW.credit
    WHERE id = NEW.id AND NEW.courseID = NEW.courseID;

CREATE TRIGGER delete_totalSLcredits 
BEFORE DELETE ON course
FOR EACH ROW 
UPDATE studyLoad 
  SET totalSLcredits = totalSLcredits - OLD.credit;

-- VIEWS

-- show profile of user 
-- used with `WHERE userID = :userID` can also add fsr's isApproved, acadYear and semester
CREATE OR REPLACE VIEW viewProfile AS SELECT u.userID, u.employeeID, u.password, u.firstName, u.middleName, u.lastName, 
u.committee, u.isHead, u.officeNumber, u.contractType, u.emailAddress, u.rank, u.acctType, f.id, f.isChecked, f.acadYear, 
f.semester FROM user u, fsr f WHERE u.userID = f.userID;

-- viewAdminWork
-- shows userID, employeeID, fsrID, adminWork fields
CREATE OR REPLACE VIEW viewAdminWork AS SELECT u.userID, u.employeeID, f.id as fsrID, a.adminWorkID, a.position, 
a.officeUnit, a.approvedUnits FROM adminWork a JOIN fsr f ON a.id = f.id JOIN user u on f.userID = u.userID;

-- viewAward
-- shows userID, employeeID, fsrID, award fields
CREATE OR REPLACE VIEW viewAward AS SELECT u.userID, u.employeeID, f.id as fsrID, a.awardID, a.grantF, 
a.chairGrantTitle, a.collegeHasNominated, a.recipientOrNominee, a.professionalChair, a.approvedStartDate, 
a.endDate FROM award a JOIN fsr f ON a.id = f.id JOIN user u on f.userID = u.userID;

-- viewExtensionAndCommunityService
-- shows userID, employeeID, fsrID, limitedPracticeOfProf fields
CREATE OR REPLACE VIEW viewExtensionAndCommunityService AS SELECT u.userID, u.employeeID, f.id as fsrID, 
e.extAndCommServiceID, e.participant, e.role, e.hours, e.title, e.creditUnit, e.type, e.startDate, e.endDate 
FROM extensionAndCommunityService e JOIN fsr f ON e.id = f.id JOIN user u on f.userID = u.userID;

-- viewLimitedPracticeOfProf
-- shows userID, employeeID, fsrID, limitedPracticeOfProf fields
CREATE OR REPLACE VIEW viewLimitedPracticeOfProf AS SELECT u.userID, u.employeeID, f.id as fsrID, 
l.limitedPracticeOfProfID, l.askedPermission, l.date FROM limitedPracticeOfProf l JOIN fsr f ON l.id = f.id 
JOIN user u on f.userID = u.userID;

-- viewCreativeWork
-- shows userID, employeeID, fsrID, creativeWork fields
CREATE OR REPLACE VIEW viewCreativeWork AS SELECT u.userID, u.employeeID, f.id as fsrID, 
c.creativeWorkID, c.date, c.title, c.type, c.credUnit FROM creativeWork c JOIN fsr f 
ON c.id = f.id JOIN user u on f.userID = u.userID;

-- viewResearch
CREATE OR REPLACE VIEW viewResearch AS SELECT u.userID, u.employeeID, f.id as fsrID, 
r.researchID, r.type, r.role, r.title, r.startDate, r.endDate, r.funding, r.approvedUnits 
FROM research r JOIN fsr f ON r.id = f.id JOIN user u on f.userID = u.userID;

-- Privileges
GRANT SUPER ON *.* TO 'easyfsr'@'localhost';
GRANT ALL PRIVILEGES ON easyfsr.* TO 'easyfsr'@'localhost';