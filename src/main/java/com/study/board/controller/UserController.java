package com.study.board.controller;

import com.study.board.entity.Board;
import com.study.board.entity.User;
import com.study.board.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.util.Util.println;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/board/signin")
    public String userSignin(){

        return "usersignin";
    }

    @GetMapping("/board/signup")
    public String userSignup(){

        return "usersignup";
    }

    @PostMapping("/board/signuppro")
    public String userSignupPro(User user, Model model){
        userService.write(user);

        model.addAttribute("message","회원가입이 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }

    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
