package org.pubpasim.divdik.repository;

import org.pubpasim.divdik.model.Account;
import org.pubpasim.divdik.model.CourseSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseScheduleRepository extends JpaRepository<CourseSchedule, Long> {

    List<CourseSchedule> findAllByInstructor(Account instructor);
}
