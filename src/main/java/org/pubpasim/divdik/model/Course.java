package org.pubpasim.divdik.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
public class Course extends Base {

    private String name;

    private Integer duration;

}
