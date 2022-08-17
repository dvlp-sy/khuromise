package com.study.board.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(schema="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String userid;

    private String userpw;

    private String username;

    private String usergender;

    private String userbirthday;

    private String useremail;
}