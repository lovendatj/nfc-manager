CREATE
OR REPLACE VIEW userinfo_view AS
SELECT
    id,
    name,
    email,
    phone,
    created_at,
    updated_at
FROM userinfo;