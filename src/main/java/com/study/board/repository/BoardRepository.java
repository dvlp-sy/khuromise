package com.study.board.repository;

import com.study.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    Page<Board> findByCategoryContaining(String searchKeyword, Pageable pageable);
    Page<Board> findByTitleContaining(String searchTitle, Pageable pageable);
}
