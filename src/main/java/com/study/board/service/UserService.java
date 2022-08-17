package com.study.board.service;

import com.study.board.entity.Board;
import com.study.board.entity.User;
import com.study.board.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void write(User user){

        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAllByOrderById();
    }
}
