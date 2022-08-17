package com.study.board.repository;

import com.study.board.entity.Board;
import com.study.board.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAllByOrderById();
}
