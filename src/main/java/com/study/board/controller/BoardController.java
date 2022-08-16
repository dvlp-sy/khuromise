package com.study.board.controller;

import com.study.board.entity.Board;
import com.study.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board/write")//localhost:8080/board/write
    public String boardWriteForm(){

        return "boardwrite";
    }

    @PostMapping("/board/writepro")
    public String boardWritePro(Board board, Model model) {

        boardService.write(board);

        model.addAttribute("message","글 작성이 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }

    @GetMapping("/board/list")
    public String boardList(Model model, @PageableDefault(page = 0, size = 10, sort = "id",
                            direction = Sort.Direction.DESC) Pageable pageable,
                            String searchKeyword, String searchTitle){

        Page<Board> list = null;

        if(searchKeyword == null){
            if(searchTitle == null){
                list = boardService.boardList(pageable);
            }
            else{
                list = boardService.boardSearchTitle(searchTitle, pageable);
            }
        }
        else{
            list = boardService.boardSearchCategory(searchKeyword, pageable);
        }

        int nowPage = list.getPageable().getPageNumber() + 1;
        int startPage = Math.max(nowPage - 4, 1);
        int endPage = Math.min(nowPage + 5, list.getTotalPages());


        model.addAttribute("list", list);
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "boardlist";
    }

    @GetMapping("/board/view")
    public String boardView(Model model, Integer id){

        model.addAttribute("board", boardService.boardView(id));
        return "boardview";
    }

    @GetMapping("/board/delete")
    public String boardDelete(Integer id){

        boardService.boardDelete(id);

        return "redirect:/board/list";
    }

    @GetMapping("/board/modify/{id}")
    public String boardModify(@PathVariable("id") Integer id, Model model){

        model.addAttribute("board", boardService.boardView(id));

        return "boardmodify";
    }

    @PostMapping("/board/sign/{id}")
    public String boardSign(@PathVariable("id") Integer id, Model model, Board board){

        Board boardTemp = boardService.boardView(id);
        if(boardTemp.currentpeople < boardTemp.maxpeople) {
            boardTemp.currentpeople += 1;
            boardService.write(boardTemp);
            model.addAttribute("message", "신청되었습니다.");
        }
        else{
            model.addAttribute("message", "정원 초과입니다");
        }
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }

    @PostMapping("board/update/{id}")
    public String boardUpdate(@PathVariable("id") Integer id, Board board, Model model){

        Board boardTemp = boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());
        boardTemp.setCategory(board.getCategory());
        boardTemp.setDate(board.getDate());
        boardTemp.setNoon(board.getNoon());
        boardTemp.setHour(board.getHour());
        boardTemp.setMinute(board.getMinute());
        boardTemp.setMaxpeople(board.getMaxpeople());
        boardTemp.setGenderdisplay(board.getGenderdisplay());
        boardTemp.setPlacename(board.getPlacename());
        boardTemp.setPosition(board.getPosition());

        boardService.write(boardTemp);

        model.addAttribute("message","글 수정이 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }
}