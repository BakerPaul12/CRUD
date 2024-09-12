package com.app.pro.repo;

import com.app.pro.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdRepo extends JpaRepository<Product, Long> {
    // Możesz tutaj dodawać dodatkowe metody, np. szukanie po nazwie
}
