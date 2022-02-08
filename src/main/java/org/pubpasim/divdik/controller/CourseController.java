package org.pubpasim.divdik.controller;

import org.pubpasim.divdik.model.Course;
import org.pubpasim.divdik.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    CourseRepository courseRepository;

    @Autowired
    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> index() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Course> find(@PathVariable Long id) {
        return courseRepository.findById(id);
    }

    @PostMapping
    public Course save(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }

}
