package com.assignment.herbal_shop.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.herbal_shop.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
