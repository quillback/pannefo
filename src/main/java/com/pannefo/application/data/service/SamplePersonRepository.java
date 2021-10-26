package com.pannefo.application.data.service;

import com.pannefo.application.data.entity.SamplePerson;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vaadin.fusion.Nonnull;
import javax.validation.constraints.Email;
import java.time.LocalDate;

public interface SamplePersonRepository extends JpaRepository<SamplePerson, Integer> {

}