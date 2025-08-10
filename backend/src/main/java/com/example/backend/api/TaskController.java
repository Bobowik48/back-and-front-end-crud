package com.example.backend.api;

import com.example.backend.domain.Task;
import com.example.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;Invoke-WebRequest -Uri "http://localhost:8080/api/tasks/1" `
@RestController
@RequestMapping("/api/tasks")

public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAll() {
        return taskService.findAll();
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task toCreate) {
        Task saved = taskService.create(toCreate);
        return ResponseEntity
                .created(URI.create("/api/tasks/" + saved.getId()))
                .body(saved);
    }
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task incoming) {
        return taskService.update(id, incoming);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
