package com.klu.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Create
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Read all
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Read by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update
    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setDepartment(updatedStudent.getDepartment());
            student.setAge(updatedStudent.getAge());
            return studentRepository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    // Delete
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
