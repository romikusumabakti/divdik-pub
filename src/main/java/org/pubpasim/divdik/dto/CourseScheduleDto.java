package org.pubpasim.divdik.dto;

import lombok.Getter;
import lombok.Setter;
import org.pubpasim.divdik.model.Base;

import java.time.LocalTime;

@Getter
@Setter
public class CourseScheduleDto extends Base {

    private Long courseId;
    private Long courseGroupId;
    private Long instructorId;
    private Integer day;
    private LocalTime time;
    private Integer courseDuration;
    private Long roomId;

}
