package com.study.board.repository;

import com.study.board.entity.Userapply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserapplyRepository extends JpaRepository<Userapply, Integer> {

    List<Userapply> findByPostidContaining(String postid);
    List<Userapply> findByUseridContaining(String userid);

}