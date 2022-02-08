package org.pubpasim.divdik.controller;

import org.pubpasim.divdik.model.Room;
import org.pubpasim.divdik.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    RoomRepository roomRepository;

    @Autowired
    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> index() {
        return roomRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Room> find(@PathVariable Long id) {
        return roomRepository.findById(id);
    }

    @PostMapping
    public Room save(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roomRepository.deleteById(id);
    }

}
