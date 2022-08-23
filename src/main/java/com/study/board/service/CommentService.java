package com.study.board.service;

import com.study.board.entity.Comment;
import com.study.board.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public void write(Comment comment){

        commentRepository.save(comment);
    }

    public void delete(Integer id){

        commentRepository.deleteById(id);
    }

    @Transactional
    public List<Comment> getPostidData(String postid){
        return commentRepository.findByPostidContaining(postid);
    }

    public Comment view(Integer id){

        return commentRepository.findById(id).get();
    }

}