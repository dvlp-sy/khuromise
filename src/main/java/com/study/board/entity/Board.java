package com.study.board.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(schema="board")
@JsonNaming(value= PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String title;

    public String content;

    public String category;

    public String genderdisplay;

    public String date;
    public String noon;
    public Integer hour;
    public Integer minute;

    public String placename;
    public String position;

    public Integer currentpeople;
    public Integer maxpeople;
}

