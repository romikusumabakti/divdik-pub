package org.pubpasim.divdik.repository;

import org.pubpasim.divdik.model.CourseGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
}
