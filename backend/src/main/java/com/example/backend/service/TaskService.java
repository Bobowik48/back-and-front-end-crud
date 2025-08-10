package com.example.backend.service;
import com.example.backend.domain.Task;
import java.util.List;
public interface TaskService {
    List<Task> findAll();
    Task create(Task task);
    Task update(Long id, Task incoming);
    void delete(Long id);
}
