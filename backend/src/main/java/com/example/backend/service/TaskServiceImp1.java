package com.example.backend.service;

import com.example.backend.domain.Task;
import com.example.backend.repo.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class TaskServiceImp1  implements TaskService {
    private final TaskRepository repo;

    public TaskServiceImp1(TaskRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Task> findAll() {
        return repo.findAll();
    }

    @Override
    public Task create(Task task) {
        if (task.getTitle() == null || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("title cannot be blank");
        }
        task.setId(null);
        return repo.save(task);
    }
    @Override
    public Task update(Long id, Task incoming) {
        var existing = repo.findById(id).orElseThrow(NoSuchElementException::new);
        if(incoming.getTitle() == null || incoming.getTitle().isBlank()) {
            throw new IllegalArgumentException("tittle cannot be blank");
        }
        existing.setTitle(incoming.getTitle());
        existing.setDone(incoming.isDone());
        return repo.save(existing);
    }
    @Override
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new NoSuchElementException();
        }
        repo.deleteById(id);
    }
}
