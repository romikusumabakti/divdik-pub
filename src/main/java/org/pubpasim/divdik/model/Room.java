package org.pubpasim.divdik.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
public class Room extends Base {

    private String name;

}
