package com.study.board.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(schema="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String userid;

    public String userpw;

    public String username;

    public String usergender;

    public String useryear;

    public String usermonth;

    public String userdate;

    public String useremail;
}