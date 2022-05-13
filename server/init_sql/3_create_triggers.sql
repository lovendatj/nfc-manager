CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function: hash_user_value
CREATE OR REPLACE FUNCTION hash_pass() 
RETURNS trigger AS $$ 
BEGIN 
    IF NEW._password IS NOT NULL THEN 
        NEW._salt = gen_salt('bf');
        NEW._password = crypt(NEW._password, NEW._salt);
        NEW.created_at = now();
        NEW.updated_at = now();
        RETURN NEW;
    END IF;
    RETURN NEW;
-- if no password is set, do nothing
END;
$$ language 'plpgsql';

-- Trigger: hash_user_value
CREATE TRIGGER hash_values 
BEFORE INSERT OR UPDATE ON userinfo 
FOR EACH ROW EXECUTE PROCEDURE hash_pass();

-- Function: Validate Email Trigger Function
CREATE
OR REPLACE FUNCTION validate_email() 
RETURNS trigger AS $$ 
BEGIN 
    IF NEW.email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$' THEN RETURN NEW;
    ELSE RAISE EXCEPTION 'Invalid email address';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Validate Email Trigger
CREATE TRIGGER validate_email_trigger BEFORE
INSERT
    OR
UPDATE
    ON userinfo FOR EACH ROW EXECUTE PROCEDURE validate_email();

-- Function: Validate Phone
CREATE OR REPLACE FUNCTION validate_phone() 
RETURNS trigger AS $$ 
BEGIN 
    IF NEW.phone ~* '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' THEN RETURN NEW;    
    ELSE RAISE EXCEPTION 'Invalid phone number';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Validate Phone For New User
CREATE TRIGGER validate_phone_trigger 
BEFORE INSERT OR UPDATE
ON userinfo FOR EACH ROW EXECUTE PROCEDURE validate_phone();
