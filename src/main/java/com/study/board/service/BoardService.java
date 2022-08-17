package com.study.board.service;

import com.study.board.entity.Board;
import com.study.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public void write(Board board){

        boardRepository.save(board);
    }//저장하기

    public Page<Board> boardList(Pageable pageable){

        return boardRepository.findAll(pageable);
    }//전체 불러오기

    public Page<Board> boardSearchCategory(String searchKeyword, Pageable pageable){

        return boardRepository.findByCategoryContaining(searchKeyword, pageable);
    }//카테고리 검색 불러오기

    public Page<Board> boardSearchTitle(String searchTitle, Pageable pageable){
        return boardRepository.findByTitleContaining(searchTitle, pageable);
    }//제목 검색 불러오기

    public Board boardView(Integer id){

        return boardRepository.findById(id).get();
    }//지정 id만 불러오기

    public void boardDelete(Integer id){

        boardRepository.deleteById(id);
    }//삭제하기

    public List<Board> getAllData() {
        return boardRepository.findAllByOrderById();
    }

    @Transactional
    public List<Board> getCategoryData(String category){
        return boardRepository.findByCategoryContaining(category);
    }
}

