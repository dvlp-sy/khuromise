package com.study.board.repository;

import com.study.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    Page<Board> findByCategoryContaining(String searchKeyword, Pageable pageable);
    Page<Board> findByTitleContaining(String searchTitle, Pageable pageable);

    List<Board> findAllByOrderById();

    List<Board> findByCategoryContaining(String category);
}
