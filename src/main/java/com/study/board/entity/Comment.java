package com.study.board.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(schema="comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public Integer postid;

    public String writerid;

    public String writername;

    public String comment;
}