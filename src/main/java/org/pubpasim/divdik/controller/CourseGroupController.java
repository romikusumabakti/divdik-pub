package org.pubpasim.divdik.controller;

import org.pubpasim.divdik.model.CourseGroup;
import org.pubpasim.divdik.repository.CourseGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/course_groups")
public class CourseGroupController {

    CourseGroupRepository courseGroupRepository;

    @Autowired
    public CourseGroupController(CourseGroupRepository courseGroupRepository) {
        this.courseGroupRepository = courseGroupRepository;
    }

    @GetMapping
    public List<CourseGroup> index() {
        return courseGroupRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CourseGroup> find(@PathVariable Long id) {
        return courseGroupRepository.findById(id);
    }

    @PostMapping
    public CourseGroup save(@RequestBody CourseGroup courseGroup) {
        return courseGroupRepository.save(courseGroup);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseGroupRepository.deleteById(id);
    }

}
