package org.pubpasim.divdik.controller;

import org.modelmapper.ModelMapper;
import org.pubpasim.divdik.dto.CourseScheduleDto;
import org.pubpasim.divdik.model.Account;
import org.pubpasim.divdik.model.AccountDetails;
import org.pubpasim.divdik.model.CourseSchedule;
import org.pubpasim.divdik.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course_schedules")
public class CourseScheduleController {

    private ModelMapper modelMapper = new ModelMapper();
    private CourseScheduleRepository courseScheduleRepository;
    private CourseRepository courseRepository;
    private CourseGroupRepository courseGroupRepository;
    private AccountRepository accountRepository;
    private RoomRepository roomRepository;

    @Autowired
    public CourseScheduleController(CourseScheduleRepository courseScheduleRepository, CourseRepository courseRepository, CourseGroupRepository courseGroupRepository, AccountRepository accountRepository, RoomRepository roomRepository) {
        this.courseScheduleRepository = courseScheduleRepository;
        this.courseRepository = courseRepository;
        this.courseGroupRepository = courseGroupRepository;
        this.accountRepository = accountRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<CourseSchedule> index() {
        return courseScheduleRepository.findAll();
    }

    @GetMapping("/{id}")
    public CourseScheduleDto get(@PathVariable Long id) {
        CourseSchedule courseSchedule = courseScheduleRepository.getById(id);
        CourseScheduleDto courseScheduleDto = modelMapper.map(courseSchedule, CourseScheduleDto.class);
        courseScheduleDto.setCourseId(courseSchedule.getCourse().getId());
        courseScheduleDto.setCourseGroupId(courseSchedule.getCourseGroup().getId());
        courseScheduleDto.setInstructorId(courseSchedule.getInstructor().getId());
        courseScheduleDto.setRoomId(courseSchedule.getRoom().getId());
        return courseScheduleDto;
    }

    @PostMapping
    public CourseSchedule save(@RequestBody CourseScheduleDto courseScheduleDto) {
        CourseSchedule courseSchedule = modelMapper.map(courseScheduleDto, CourseSchedule.class);
        courseSchedule.setCourse(courseRepository.findById(courseScheduleDto.getCourseId()).get());
        courseSchedule.setCourseGroup(courseGroupRepository.findById(courseScheduleDto.getCourseGroupId()).get());
        courseSchedule.setInstructor(accountRepository.findById(courseScheduleDto.getInstructorId()).get());
        courseSchedule.setRoom(roomRepository.findById(courseScheduleDto.getRoomId()).get());
        return courseScheduleRepository.save(courseSchedule);
    }

    @GetMapping("/i_teach")
    public List<CourseSchedule> iTeach() {
        Account account = ((AccountDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getAccount();
        return courseScheduleRepository.findAllByInstructor(account);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseScheduleRepository.deleteById(id);
    }

}
