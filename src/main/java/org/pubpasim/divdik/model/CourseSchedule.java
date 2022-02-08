package org.pubpasim.divdik.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.time.LocalTime;

@Getter
@Setter
@Entity
public class CourseSchedule extends Base {

    @ManyToOne
    private Course course;

    @ManyToOne
    private CourseGroup courseGroup;

    @ManyToOne
    private Account instructor;

    private Integer day;

    private LocalTime time;

    @OneToOne
    private Room room;

}
