SELECT user.id_user, user.name, user.username, user.email, user.phone, user.website, user.gravatar,
    address.street, address.suite, address.city, address.zipcode, address.lat, address.lng,
    company.company_name, company.catch_phrase, company.bs
FROM user 
    INNER JOIN address ON user.id_address = address.id_address
    INNER JOIN company ON user.id_company = company.id_company