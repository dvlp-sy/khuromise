package com.study.board.controller;

import com.study.board.entity.User;
import com.study.board.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/board/signin")
    public String userSignin() {

        return "usersignin";
    }

    @GetMapping("/board/signup")
    public String userSignup() {

        return "usersignup";
    }

    @PostMapping("/board/signuppro")
    public String userSignupPro(User user) {
        userService.write(user);
        return "redirect:/login";
    }

    @PostMapping("/api/users/reg")
    public String userRegister(User user, Model model) {
        user.useremail = user.useremail + "@khu.ac.kr";
        userService.write(user);

        model.addAttribute("message", "회원가입에 성공했습니다!");
        model.addAttribute("searchUrl", "/login");

        return "message";
    }

    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/api/test")
    public String test(@RequestBody String param, User user, Model model){
        JSONObject jobject = new JSONObject(param);

        user.userid = jobject.getString("userid");
        user.userpw = jobject.getString("userpw");
        user.username = jobject.getString("username");
        user.useryear = jobject.getString("useryear");
        user.usermonth = jobject.getString("usermonth");
        user.userdate = jobject.getString("userdate");
        user.usergender = jobject.getString("usergender");
        user.useremail = jobject.getString("useremail");

        userService.write(user);

        model.addAttribute("message","글 작성이 완료되었습니다.");
        model.addAttribute("searchUrl", "/login");

        return "message";
    }

    @DeleteMapping("/api/delete/user/{id}")
    public String deleteUser(@PathVariable("id") Integer id, @RequestBody User user, Model model){

        userService.delete(id);

        model.addAttribute("message","회원 탈퇴되었습니다.");
        model.addAttribute("searchUrl", "/");

        return "message";
    }

//    @PostMapping("/api/signup/{data}")
//    public String DataSave(@PathVariable String data, Model model, User user){
//        JSONObject jobject = new JSONObject(data);
//
//        user.userid = jobject.getString("userid");
//        user.userpw = jobject.getString("userpw");
//        user.username = jobject.getString("username");
//        user.useryear = jobject.getString("useryear");
//        user.usermonth = jobject.getString("usermonth");
//        user.userdate = jobject.getString("userdate");
//        user.usergender = jobject.getString("usergender");
//        user.useremail = jobject.getString("useremail");
//
//        userService.write(user);
//
//        return null;
//    }
}
