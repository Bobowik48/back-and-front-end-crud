package com.example.backend.domain;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor   // pusty konstruktor wymagany przez JPA
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private boolean done = false;

}
