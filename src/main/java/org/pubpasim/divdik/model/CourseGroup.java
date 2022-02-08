package org.pubpasim.divdik.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@Entity
public class CourseGroup extends Base {

    private Integer number;

    private String name;

    @ManyToMany
    private List<Account> participants;

    @OneToMany
    private  List<CourseSchedule> courseSchedules;

}
