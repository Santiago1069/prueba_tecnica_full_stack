UPDATE address a
    INNER JOIN user u ON u.id_address = a.id_address
    SET ? 
    WHERE  u.id_user= ?