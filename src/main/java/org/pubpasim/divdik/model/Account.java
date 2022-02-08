package org.pubpasim.divdik.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Account extends Base {

    @Column(unique = true)
    private String nim;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<CourseGroup> courseGroups;

    @OneToMany
    @JsonIgnore
    private List<CourseSchedule> courseSchedules;

}
