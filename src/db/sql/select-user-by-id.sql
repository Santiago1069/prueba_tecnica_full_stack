SELECT u.id_user, u.name, u.username, u.email, u.phone, u.website, u.gravatar,
    address.street, address.suite, address.city, address.zipcode, address.lat, address.lng,
    company.company_name, company.catch_phrase, company.bs
FROM user AS u
    INNER JOIN address ON u.id_address = address.id_address
    INNER JOIN company ON u.id_company = company.id_company
WHERE u.id_user = ?