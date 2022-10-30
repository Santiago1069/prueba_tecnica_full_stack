UPDATE company c
    INNER JOIN user u ON u.id_company = c.id_company
    SET ? 
    WHERE u.id_user = ?