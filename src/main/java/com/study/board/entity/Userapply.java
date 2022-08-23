package com.study.board.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(schema="userapply")
public class Userapply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String postid;
    public String userid;
}